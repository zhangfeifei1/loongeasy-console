import axios from 'axios'
import qs from 'qs'
import $config from '@/settings/defaultSetting'
import { getToken, setToken } from '@/utils//util'
import { Message } from 'element-ui'
// import { sign } from '@/utils/sign'
import store from '@/store'
// import { getEncryptionPublicKey } from '@/api/encrptApi'
import { guid } from '@/utils/common' // base64和生成uuid方法
import { aesEncrypt, aesDecrypt } from '@/utils/encryption/aes' // aes加解密方法
import { rsaEncrypt } from '@/utils/encryption/rsa' // rsa加解密方法
import { sm2Encrypt } from '@/utils/encryption/sm2'// sm2加密方法
import { sm4Encrypt, sm4Decrypt } from '@/utils/encryption/sm4'// sm4加解密方法

import router from '@/router/router.config.js'

let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    // 这里是本地的请求url
    baseUrl = $config.apiUrl.dev
    break
  case 'production':
    // 生产环境url
    baseUrl = $config.apiUrl.pro
    break
}

/**
 * 创建axios实例
 * @type {AxiosInstance}
 */
const service = axios.create({
  // defaultSetting.js中的配置
  baseURL: baseUrl, // 请求根路径
  headers: $config.apiUrl.headers, // 配置公共请求头
  timeout: $config.apiUrl.timeout// 超时时间
})

service.apiUrl = baseUrl
let uuidKey = ''
/**
 * 请求参数处理
 */
service.interceptors.request.use((config) => {
  // 参数签名处理
  // config = sign(config, $config.appId, $config.appSecret, 'SHA256')
  config.method === 'get'
    ? config.params = qs.stringify({ ...config.params }) : config.data = JSON.stringify(config.data)

  const token = getToken()
  // config.headers['Bl'] = '1'
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  config.headers['Accept'] = 'application/json,*/*'
  config.headers['appid'] = 1552274783265

  if (config.headers.responseType === 'blob') {
    // 如果请求头中含有responseType=blob，需要改返回头类型为blob.接口返回二进制流，需配置此项
    config.responseType = 'blob'
  }
  if (config.url.slice(0, 1) !== '/') {
    // 处理接口未加/的请求路径添加/
    config.url = '/' + config.url
  }
  if (config.url === '/initial/api/list') {
    // 如果是获取api列表接口，无需加密
    config.params = { request: config.params }
  } else {
    // 获取需要加密的接口列表
    const allApiList = window.sessionStorage.getItem('apiList')
    const allApiList1 = JSON.parse(allApiList)
    if (config.url.indexOf('?') !== -1) {
      config.url = config.url.split('?')[0]
    }
    try {
      if (allApiList1) {
        allApiList1.forEach(v => {
          if (config.url === v.path) {
            // 该接口需要加密
            const key = store.state.user.encrptParams.appAsymmetricEncryptionPublicKey // 获取非对称加密公钥
            const noSymmetryEncrept = store.state.user.encrptParams.appAsymmetricEncryptionType// 获取非对称加密方式
            const symmetryEncrept = store.state.user.encrptParams.appSymmetricEncryptionType// 获取对称加密方式

            uuidKey = guid()// 用uuid生成对称加密公钥

            const rev = isEncryptType(noSymmetryEncrept, uuidKey, key)// 用非对称加密方式对对称加密的公钥进行加密
            config.headers.rev = rev

            if (config.method === 'post') {
              // post接口加密
              const data1 = isEncryptType(symmetryEncrept, config.data, uuidKey)
              config.data = qs.stringify({ request: data1 })
            } else {
              // 非post接口加密
              const params = isEncryptType(symmetryEncrept, config.params, uuidKey)
              config.params = { request: params }
            }
            throw new Error('ending')
          }
        })
      }

      if (config.method === 'post') {
        // post接口不加密
        const data = config.data
        config.data = qs.stringify({ request: data })
      } else {
        // 非post接口不加密
        const params = config.params
        config.params = { request: params }
      }
    } catch (e) {
      // console.log(e)
    }
  }

  return config
}
)
/**
 * 响应结果处理
 */
service.interceptors.response.use(
  (response) => {
    if (response.config.url !== '/pmobile/initial/api/list') {
      // 除了获取api列表接口，其他接口返回值都在response对象里{response:{...}}
      if (response.data.isEncrypt === '1') {
        // 接口加密，需解密
        // const key = store.state.user.encrptParams.appAsymmetricEncryptionPublicKey
        // const noSymmetryEncrept = store.state.user.encrptParams.appAsymmetricEncryptionType
        // 获取对称加密方式
        const symmetryEncrept = store.state.user.encrptParams.appSymmetricEncryptionType// 获取对称加密方式
        response.data = JSON.parse(isDecryptType(symmetryEncrept, response.data.response, uuidKey))
      } else {
        // 接口不加密
        if (response.headers['content-disposition'] != null && response.headers['content-disposition'].indexOf('attachment') !== -1) {
          // 返回头里含有content-disposition并且有attachment字符串代表是返回的二进制流需要将data直接返回给页面
          return Promise.resolve(response.data)
        } else if (response.config.url === '/pmobile/wcb/msg/log/all') {
          // 批量查询专用
          return Promise.resolve(response.data)
        } else {
          // 正常常用返回信息
          response.data = JSON.parse(response.data.response)
        }
      }
    }
    // 响应码逻辑处理
    if (response.data.returnCode === '000000') {
      // 平台设置000000为交易成功成功
      response.data.code = 0
      // 原程序定义服务端定义的响应code码为0时请求成功
      // 使用Promise.resolve 正常响应
      return Promise.resolve(response.data)
    } else {
      // 使用Promise.reject 响应
      Message.error({ message: response.data.message })
      return Promise.reject(response.data)
    }
  }, error => {
    let message = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // 认证失败，重新刷新页面
          setToken('')
          router.replace({
            path: '/login'
          })
          Message.error({
            message: '认证失败，请重新登录！',
            type: 'error',
            duration: 5 * 1000
          })
          return
        case 403:
          message = JSON.parse(error.response.data.response).path + ',' + JSON.parse(error.response.data.response).message
          break
        case 429:
          message = '访问太过频繁，请稍后再试!'
          break
        default:
          message = JSON.parse(error.response.data.response).message ? JSON.parse(error.response.data.response).message : '服务器错误'
          break
      }
      Message.error({ message: message })
      // 请求错误处理
      return Promise.reject(error)
    } else {
      message = '连接服务器失败'
      Message.error({ message: message })
      return Promise.reject(error)
    }
  }
)
/**
 * @description 根据加密类型进行相应加密
 * @param {*} type 加密类型
 * @param {*} data 需要加密的数据
 * @param {*} publickey 公钥
 * @param {*} cipherMode 0：c1c2c3 1:c1c3c2
 */
function isEncryptType(type, data, publickey, cipherMode) {
  if (type === 'AES') {
    return encryptAES(data, publickey)
  } else if (type === 'RSA') {
    return encryptRSA(data, publickey)
  } else if (type === 'SM2') {
    return encryptSM2(data, publickey, cipherMode)
  } else if (type === 'SM4') {
    return encryptSM4(data, publickey)
  }
}
function isDecryptType(type, data, privatekey) {
  if (type === 'AES') {
    return decryptAES(data, privatekey)
  } else if (type === 'SM4') {
    return decryptSM4(data, privatekey)
  }
}

// aes加密
function encryptAES(data, publickey) {
  return aesEncrypt(data, publickey)
}
// aes解密
function decryptAES(data, privatekey) {
  return aesDecrypt(data, privatekey)
}
// rsa加密
function encryptRSA(data, publickey) {
  return rsaEncrypt(data, publickey)
}
// sm2加密
function encryptSM2(data, publickey, cipherMode) {
  return sm2Encrypt(data, publickey, cipherMode)
}

// sm4加密
function encryptSM4(data, publickey) {
  return sm4Encrypt(data, publickey)
}
// sm4解密
function decryptSM4(data, privatekey) {
  return sm4Decrypt(data, privatekey)
}
export default service

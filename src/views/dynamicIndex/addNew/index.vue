<template>
  <div>
    <el-card style="margin:40px 60px 50px 60px">
      <el-form ref="form" :model="form" label-width="270px" :rules="newAppRules">
        <el-form-item label="AppID:" prop="AppID" required>
          <el-input v-model="form.AppID" placeholder="请输入AppID" style="width:350px" />
        </el-form-item>
        <el-form-item label="App名称:" prop="AppName" required>
          <el-input v-model="form.AppName" placeholder="请输入AppName" style="width:350px" />
        </el-form-item>
        <el-form-item label="App图标">
          <template>
            <el-upload
              ref="AppFromUpload"
              class="upload-demo"
              action="/pmobile/diffpackage/mpaas/sys/upload"
              list-type="picture"
              :headers="headersToken"
              :file-list="AppFileList"
              :auto-upload="false"
              :on-change="AppUploadChange"
              :on-remove="AppUploadRemove"
              :on-success="AppSuccessCallback"
              :on-error="AppErrorCallback"
              style="width:350px"
            >
              <el-button slot="trigger" size="small" class="el-icon-upload2">点击上传</el-button>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="选择离线包关联App:" prop="AppOfflinePackage" required>
          <el-select v-model="form.AppOfflinePackage" style="width:350px">
            <el-option label="离线包关联的App" value="1" />
            <el-option label="离线包关联的App" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择埋点关联App:" prop="AppMaidian" required>
          <el-select v-model="form.AppMaidian" style="width:350px">
            <el-option label="选择埋点关联App" value="1" />
            <el-option label="选择埋点关联App" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="App描述:" prop="AppDesc" required>
          <el-input v-model="form.AppDesc" type="textarea" placeholder="请输入AppDesc" style="width:350px" />
        </el-form-item>
      </el-form>
      <div style="display:inline-block;width:150px;margin-left:320px">
        <el-button type="primary" @click="addAPPFinish()">完成</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getToken } from '@/utils/util'
export default {
  filters: {
    typeFilter(data) {
      if (data === '0') {
        return '普通组'
      } else if (data === '1') {
        return '正则组'
      }
    }
  },
  data() {
    const validateAppId = (rule, value, callback) => {
      debugger

      if (!value || !value.trim()) {
        return callback(new Error('AppID不能为空'))
      } else if (/^[0-9]*$ /.test(value) || value.trim().length !== 6) {
        return callback(new Error('请数组6位数字组成的字符'))
      } else {
        callback()
      }
    }
    const validateAppName = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('App名称不能为空'))
      } else {
        callback()
      }
    }
    const validateAppOfflinePackage = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('离线包关联App不能为空'))
      } else {
        callback()
      }
    }
    const validateAppMaidian = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('埋点关联APP不能为空'))
      } else {
        callback()
      }
    }
    const validateAppDesc = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('App描述不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        AppId: '',
        AppName: '',
        AppOfflinePackage: '',
        AppMaidian: '',
        AppDesc: ''
      },
      headersToken: {},
      AppFileList: [],
      AppUploadFlag: false,
      newAppRules: {
        AppID: [{ required: true, validator: validateAppId, trigger: 'blur' }],
        AppName: [{ required: true, validator: validateAppName, trigger: 'blur' }],
        AppOfflinePackage: [{ required: true, validator: validateAppOfflinePackage, trigger: 'blur' }],
        AppMaidian: [{ required: true, validator: validateAppMaidian, trigger: 'blur' }],
        AppDesc: [{ required: true, validator: validateAppDesc, trigger: 'blur' }]
      }
    }
  },
  created() {
    const token1 = getToken()
    this.headersToken = {
      'Authorization': 'Bearer ' + token1
    }
  },
  methods: {
    // 完成后跳转
    addAPPFinish() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$router.push({
            name: 'DynamicIndex01'
          })
        } else {
          this.$message.error('验证不通过！')
        }
      })
    },
    // App上传文件
    AppUploadChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (fileList.length === 0) {
        this.AppFileList = []
      } else {
        this.AppFileList = [fileList[fileList.length - 1]]
      }
    },
    // App移除文件
    AppUploadRemove() {
      this.$refs.AppFromUpload.clearFiles()
      this.AppFileList = []
    },
    // App上传成功后回调
    AppSuccessCallback(response) {
      response = JSON.parse(response.response)
      this.form.AppFile = response.data.id
      this.AppUploadFlag = true
      this.$refs.AppFromUpload.clearFiles()
      this.AppFileList = []
      this.$nextTick(() => {
        if (this.AppUploadFlag === false) {
          return
        }
        // 其他属性处理
        // const params = this.form
        // allConfig(params).then(res => {
        //   if (res.data) {
        //     this.$message({
        //       message: '提交成功！',
        //       type: 'success'
        //     })
        //   }
        // }).finally(() => {

        // })
      })
    },
    // App上传失败后回调
    AppErrorCallback() {
      this.AppUploadFlag = false
      this.$refs.AppFromUpload.clearFiles()
      this.AppFileList = []
      this.$message({
        message: 'App证书文件上传失败！',
        type: 'error'
      })
    }

  }
}
</script>>

<style lang="scss" scoped>
.wrapper {
  .margin-b20 {
    margin-bottom: 20px;
  }
  .add-white-line {
    display: flex;
    margin-bottom: 20px;
    .add-white_label {
      width: 120px;
    }
    .add-white_cont {
      flex: 1;
      font {
        font-size: 12px;
        color: #606266;
        margin-top: 7px;
        display: inline-block;
      }
    }
  }
}
.appCard {
  float:left;
  width:170px;
  height:250px;
  margin-right:50px;
  margin-bottom:35px;
}
.appCard:hover{
  box-shadow: 2px 4px 12px 5px rgba(42, 110, 238, 0.308);;
}
</style>

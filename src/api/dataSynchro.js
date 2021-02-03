import request from '@/utils/request'
/**
 * 数据同步 配置管理分页查询
 */
export const getDataSynchroConfig = (params) => {
  return request({
    url: 'diffpackage/mpaas/mss/pageList',
    method: 'get',
    params
  })
}

/**
 * 配置管理上下线
 */
export const configONOFFline = (params) => {
  return request({
    url: 'diffpackage/mpaas/mss/updateStatus',
    data: params,
    method: 'post'
  })
}

/**
 * 配置管理修改
 */
export const configEdit = (params) => {
  return request({
    url: 'diffpackage/mpaas/mss/edit',
    data: params,
    method: 'post'
  })
}

/**
 * 配置管理新增
 */
export const configAdd = (params) => {
  return request({
    url: 'diffpackage/mpaas/mss/add',
    data: params,
    method: 'post'
  })
}

/**
 * 数据同步 服务管理开关查询
 */
export const serviceSearch = () => {
  return request({
    url: 'diffpackage/mpaas/sysConfig/getSignInfo',
    method: 'get'
  })
}

/**
 * 数据同步  服务管理开关切换
 */
export const serviceSwitch = (params) => {
  return request({
    url: 'diffpackage/mpaas/sysConfig/updateSign',
    data: params,
    method: 'post'
  })
}

/**
 * 配置管理 新建同步
 */
export const configAddSynchro = (params) => {
  return request({
    url: 'diffpackage/mpaas/mss/send',
    data: params,
    method: 'post'
  })
}

/**
 *  数据查询表格
 */
export const dataSearchTable1 = (params) => {
  return request({
    url: 'diffpackage/mpaas/mssSend/device',
    method: 'get',
    params

  })
}
export const dataSearchTable2 = (params) => {
  return request({
    url: 'diffpackage/mpaas/mssSend/user',
    method: 'get',
    params
  })
}

export default [
  {
    url: '/base/user',
    type: 'get',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":{"records":[{"createTime":"2020-07-08 10:32:26","updateTime":"2020-07-08 10:32:26","userId":"1280691178013986818","userName":"test009","userType":"super","companyId":0,"nickName":"test009","avatar":"","email":"","mobile":"","userDesc":"","password":"","status":1},{"createTime":"2019-03-18 04:50:25","updateTime":"2020-07-08 10:05:10","userId":"557063237640650752","userName":"test","userType":"normal","companyId":0,"nickName":"测试用户","avatar":"","email":"222@qq.com","mobile":"15111111111","userDesc":"","password":"","status":1},{"createTime":"2018-12-10 13:20:45","updateTime":"2020-07-08 10:04:38","userId":"521677655146233856","userName":"admin","userType":"super","companyId":0,"nickName":"超级管理员","avatar":"","email":"515608851@qq.com","mobile":"16111111111","userDesc":"","password":"","status":2}],"total":"3","size":"10","current":"1","page":1,"limit":10,"sort":"","order":"","requestMap":{"NONCE":"axkbl3isqyf","SIGN":"ED5E552261B78E7065D8431ADCF3ECBF7D43B1BC0295CABCB2C6EC7EDB70FA0A","SIGN_TYPE":"SHA256","TIMESTAMP":"20200721110815","email":"","mobile":"","total":"0","userName":""},"orderBy":"","searchCount":true,"pages":"1"},"extra":{},"timestamp":"1595300963831"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/user/add',
    type: 'post',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":{},"extra":{},"timestamp":"1595301269771"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/role/all',
    type: 'get',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":[{"createTime":"2018-07-29 21:14:54","updateTime":"2019-05-25 03:06:57","roleId":"1","roleCode":"admin","roleName":"系统管理员","roleDesc":"系统管理员","status":1,"isPersist":1},{"createTime":"2018-07-29 21:14:54","updateTime":"2019-05-25 15:14:56","roleId":"2","roleCode":"operator","roleName":"运营人员","roleDesc":"运营人员","status":1,"isPersist":1},{"createTime":"2018-07-29 21:14:54","updateTime":"2020-07-08 11:07:37","roleId":"3","roleCode":"support","roleName":"客服","roleDesc":"客服","status":1,"isPersist":1}],"extra":{},"timestamp":"1595301278038"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/user/roles',
    type: 'get',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":[],"extra":{},"timestamp":"1595301278039"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/authority/menu',
    type: 'get',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":[{"createTime":"2018-07-29 21:20:10","updateTime":"2020-07-08 17:31:22","menuId":"1","menuCode":"system","menuName":"系统管理","icon":"el-icon-folder-opened","parentId":"0","scheme":"/","path":"","target":"_self","priority":0,"menuDesc":"系统管理","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1","authority":"MENU_system","actionList":[]},{"createTime":"2018-07-29 21:20:13","updateTime":"2020-06-22 10:40:43","menuId":"6","menuCode":"systemApi","menuName":"API列表","icon":"el-icon-s-unfold","parentId":"13","scheme":"/","path":"gateway/api/index","target":"_self","priority":0,"menuDesc":"API接口资源","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"6","authority":"MENU_systemApi","actionList":[{"createTime":"2019-05-24 18:12:14","updateTime":"2019-05-24 18:12:14","actionId":"1131865482314526722","actionCode":"systemApiView","actionName":"查看","menuId":"6","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131865482390024193","authority":"ACTION_systemApiView","auth":true},{"createTime":"2019-05-24 18:12:23","updateTime":"2019-05-24 18:12:23","actionId":"1131865520738545666","actionCode":"systemApiEdit","actionName":"编辑","menuId":"6","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131865520809848834","authority":"ACTION_systemApiEdit","auth":true}]},{"createTime":"2018-12-27 15:41:52","updateTime":"2020-07-08 10:52:02","menuId":"9","menuCode":"systemApp","menuName":"应用管理","icon":"el-icon-setting","parentId":"1","scheme":"/","path":"system/app/index","target":"_self","priority":0,"menuDesc":"应用信息管理","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"9","authority":"MENU_systemApp","actionList":[{"createTime":"2019-05-24 18:05:15","updateTime":"2019-05-24 18:05:15","actionId":"1131863723722551297","actionCode":"systemAppView","actionName":"查看","menuId":"9","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131863723806437377","authority":"ACTION_systemAppView","auth":true},{"createTime":"2019-05-24 18:05:27","updateTime":"2019-05-24 18:05:27","actionId":"1131863775899693057","actionCode":"systemAppEdit","actionName":"编辑","menuId":"9","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131863775966801921","authority":"ACTION_systemAppEdit","auth":true}]},{"createTime":"2018-12-27 15:46:29","updateTime":"2020-06-19 15:33:20","menuId":"10","menuCode":"systemUser","menuName":"用户管理","icon":"el-icon-user","parentId":"1","scheme":"/","path":"system/user/index","target":"_self","priority":0,"menuDesc":"系统用户","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"10","authority":"MENU_systemUser","actionList":[{"createTime":"2019-05-24 18:07:56","updateTime":"2019-05-24 18:07:56","actionId":"1131864400507056130","actionCode":"systemUserView","actionName":"查看","menuId":"10","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131864400590942210","authority":"ACTION_systemUserView","auth":true},{"createTime":"2019-05-24 18:08:07","updateTime":"2019-05-24 18:08:07","actionId":"1131864444878598146","actionCode":"systemUserEdit","actionName":"编辑","menuId":"10","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131864444954095617","authority":"ACTION_systemUserEdit","auth":true}]},{"createTime":"2019-01-10 20:47:19","updateTime":"2020-06-19 15:37:36","menuId":"11","menuCode":"apiDebug","menuName":"接口调试","icon":"el-icon-connection","parentId":"13","scheme":"http://","path":"192.168.228.110:8888","target":"_blank","priority":0,"menuDesc":"swagger接口调试","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"11","authority":"MENU_apiDebug","actionList":[]},{"createTime":"2019-01-28 02:37:42","updateTime":"2020-06-19 15:37:50","menuId":"12","menuCode":"gatewayLogs","menuName":"访问日志","icon":"el-icon-folder-opened","parentId":"13","scheme":"/","path":"gateway/logs/index","target":"_self","priority":0,"menuDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"12","authority":"MENU_gatewayLogs","actionList":[{"createTime":"2019-05-24 18:13:23","updateTime":"2019-05-24 18:13:23","actionId":"1131865772929462274","actionCode":"gatewayLogsView","actionName":"查看","menuId":"12","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131865773000765441","authority":"ACTION_gatewayLogsView","auth":true}]},{"createTime":"2019-02-25 00:15:09","updateTime":"2020-06-19 10:31:10","menuId":"13","menuCode":"gateway","menuName":"API网关","icon":"el-icon-setting","parentId":"0","scheme":"/","path":"","target":"_self","priority":0,"menuDesc":"API网关","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"13","authority":"MENU_gateway","actionList":[]},{"createTime":"2019-04-01 16:30:27","updateTime":"2020-06-19 10:31:18","menuId":"15","menuCode":"task","menuName":"任务调度","icon":"el-icon-setting","parentId":"0","scheme":"/","path":"","target":"_self","priority":0,"menuDesc":"任务调度","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"15","authority":"MENU_task","actionList":[]},{"createTime":"2019-04-01 16:31:15","updateTime":"2020-06-19 15:38:53","menuId":"16","menuCode":"job","menuName":"定时任务","icon":"el-icon-s-goods","parentId":"15","scheme":"/","path":"task/job/index","target":"_self","priority":0,"menuDesc":"定时任务列表","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"16","authority":"MENU_job","actionList":[{"createTime":"2019-05-24 18:15:24","updateTime":"2019-05-25 03:23:15","actionId":"1131866278187905026","actionCode":"jobView","actionName":"查看","menuId":"16","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131866278280179714","authority":"ACTION_jobView","auth":true},{"createTime":"2019-05-24 18:15:32","updateTime":"2019-05-25 03:23:21","actionId":"1131866310622457857","actionCode":"jobEdit","actionName":"编辑","menuId":"16","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131866310676983810","authority":"ACTION_jobEdit","auth":true}]},{"createTime":"2019-04-04 16:37:23","updateTime":"2020-06-19 10:31:25","menuId":"17","menuCode":"message","menuName":"消息管理","icon":"el-icon-setting","parentId":"0","scheme":"/","path":"","target":"_self","priority":0,"menuDesc":"消息管理","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"17","authority":"MENU_message","actionList":[]},{"createTime":"2019-04-04 16:38:21","updateTime":"2020-07-08 17:32:42","menuId":"18","menuCode":"webhook","menuName":"异步通知日志","icon":"el-icon-message-solid","parentId":"17","scheme":"/","path":"msg/webhook/index","target":"_self","priority":0,"menuDesc":"异步通知日志","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"18","authority":"MENU_webhook","actionList":[{"createTime":"2019-05-24 18:18:39","updateTime":"2019-05-24 18:18:39","actionId":"1131867094479155202","actionCode":"notifyHttpLogsView","actionName":"查看","menuId":"18","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131867094550458369","authority":"ACTION_notifyHttpLogsView","auth":true}]},{"createTime":"2019-05-24 18:17:49","updateTime":"2020-06-19 15:39:00","menuId":"19","menuCode":"taskLogs","menuName":"调度日志","icon":"el-icon-s-unfold","parentId":"15","scheme":"/","path":"task/logs/index","target":"_self","priority":0,"menuDesc":"调度日志","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"19","authority":"MENU_taskLogs","actionList":[{"createTime":"2019-05-24 18:18:03","updateTime":"2019-05-24 18:18:03","actionId":"1131866943459045377","actionCode":"schedulerLogsView","actionName":"查看","menuId":"19","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131866943534542850","authority":"ACTION_schedulerLogsView","auth":true}]},{"createTime":"2019-07-11 17:46:56","updateTime":"2020-06-19 15:33:29","menuId":"1149253733673287682","menuCode":"developer","menuName":"开发者管理","icon":"el-icon-user-solid","parentId":"1","scheme":"/","path":"system/developer/index","target":"_self","priority":0,"menuDesc":"开发者管理","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1149253733748785154","authority":"MENU_developer","actionList":[{"createTime":"2019-08-22 14:20:34","updateTime":"2019-08-22 14:24:53","actionId":"1164422088547635202","actionCode":"developerView","actionName":"查看","menuId":"1149253733673287682","priority":0,"actionDesc":"","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1164422088618938370","authority":"ACTION_developerView","auth":true},{"createTime":"2019-08-22 14:21:04","updateTime":"2019-08-22 14:21:04","actionId":"1164422211189084162","actionCode":"developerEdit","actionName":"编辑","menuId":"1149253733673287682","priority":0,"actionDesc":"","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1164422211226832898","authority":"ACTION_developerEdit","auth":true}]},{"createTime":"2019-07-19 17:01:05","updateTime":"2020-06-19 15:33:56","menuId":"1152141296369057794","menuCode":"Generate","menuName":"在线代码生成","icon":"el-icon-s-promotion","parentId":"1","scheme":"/","path":"system/generate/index","target":"_self","priority":0,"menuDesc":"在线代码生成","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1152141296406806529","authority":"MENU_Generate","actionList":[{"createTime":"2019-07-19 23:10:46","updateTime":"2019-07-19 23:10:54","actionId":"1152234326254051329","actionCode":"GenerateCode","actionName":"生成代码","menuId":"1152141296369057794","priority":0,"actionDesc":"","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1152234326304382978","authority":"ACTION_GenerateCode","auth":true}]},{"createTime":"2020-04-29 19:20:34","updateTime":"2020-06-19 10:31:59","menuId":"1255456937395367938","menuCode":"transConfig","menuName":"交易配置","icon":"el-icon-setting","parentId":"0","scheme":"/","path":"","target":"_self","priority":0,"menuDesc":"交易配置","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1255456937454088193","authority":"MENU_transConfig","actionList":[]},{"createTime":"2020-04-29 19:23:08","updateTime":"2020-06-22 10:02:47","menuId":"1255457585234980866","menuCode":"patternStandard","menuName":"数据字典","icon":"el-icon-connection","parentId":"1255456937395367938","scheme":"/","path":"transConfig/patternStandard/index","target":"_self","priority":0,"menuDesc":"数据字典配置","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1255457585260146690","authority":"MENU_patternStandard","actionList":[]},{"createTime":"2020-04-29 19:24:04","updateTime":"2020-06-22 10:03:08","menuId":"1255457818987737089","menuCode":"dictionaryConfig","menuName":"响应信息","icon":"el-icon-connection","parentId":"1255456937395367938","scheme":"/","path":"transConfig/dictionaryConfig/index","target":"_self","priority":0,"menuDesc":"响应信息配置","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1255457819008708609","authority":"MENU_dictionaryConfig","actionList":[]},{"createTime":"2020-04-30 11:34:50","updateTime":"2020-06-19 15:39:49","menuId":"1255702121915981826","menuCode":"workflow","menuName":"流程定制","icon":"el-icon-connection","parentId":"1255456937395367938","scheme":"http://","path":"192.168.228.205:8080/model-list.html","target":"_self","priority":0,"menuDesc":"流程配置","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1255702121949536258","authority":"MENU_workflow","actionList":[]},{"createTime":"2020-06-22 10:06:18","updateTime":"2020-06-22 10:06:18","menuId":"1274886397878075394","menuCode":"dynamic","menuName":"动态配置","icon":"el-icon-connection","parentId":"1255456937395367938","scheme":"/","path":"transConfig/dynamic/index","target":"_self","priority":0,"menuDesc":"动态配置","status":1,"isPersist":0,"serviceId":"loongeasy-cloud-base-server","authorityId":"1274886397890658305","authority":"MENU_dynamic","actionList":[]},{"createTime":"2018-07-29 21:20:13","updateTime":"2020-06-19 15:38:03","menuId":"2","menuCode":"gatewayIpLimit","menuName":"访问控制","icon":"el-icon-connection","parentId":"13","scheme":"/","path":"gateway/ip-limit/index","target":"_self","priority":1,"menuDesc":"来源IP/域名访问控制,白名单、黑名单","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"2","authority":"MENU_gatewayIpLimit","actionList":[{"createTime":"2019-05-24 18:09:38","updateTime":"2019-05-24 18:09:38","actionId":"1131864827252322305","actionCode":"gatewayIpLimitView","actionName":"查看","menuId":"2","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131864827327819778","authority":"ACTION_gatewayIpLimitView","auth":true},{"createTime":"2019-05-24 18:09:47","updateTime":"2019-05-24 18:09:47","actionId":"1131864864267055106","actionCode":"gatewayIpLimitEdit","actionName":"编辑","menuId":"2","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131864864325775361","authority":"ACTION_gatewayIpLimitEdit","auth":true}]},{"createTime":"2019-03-13 21:47:20","updateTime":"2020-06-19 15:38:13","menuId":"14","menuCode":"gatewayRateLimit","menuName":"流量控制","icon":"el-icon-connection","parentId":"13","scheme":"/","path":"gateway/rate-limit/index","target":"_self","priority":2,"menuDesc":"API限流","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"14","authority":"MENU_gatewayRateLimit","actionList":[{"createTime":"2019-05-24 18:14:01","updateTime":"2019-05-24 18:14:01","actionId":"1131865931146997761","actionCode":"gatewayRateLimitView","actionName":"查看","menuId":"14","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131865931214106626","authority":"ACTION_gatewayRateLimitView","auth":true},{"createTime":"2019-05-24 18:14:12","updateTime":"2019-05-24 18:14:12","actionId":"1131865974704844802","actionCode":"gatewayRateLimitEdit","actionName":"编辑","menuId":"14","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131865974771953666","authority":"ACTION_gatewayRateLimitEdit","auth":true}]},{"createTime":"2018-07-29 21:20:13","updateTime":"2020-06-19 15:34:21","menuId":"3","menuCode":"systemMenu","menuName":"功能菜单","icon":"el-icon-connection","parentId":"1","scheme":"/","path":"system/menus/index","target":"_self","priority":3,"menuDesc":"功能菜单资源","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"3","authority":"MENU_systemMenu","actionList":[{"createTime":"2019-05-24 17:07:54","updateTime":"2019-08-22 14:25:48","actionId":"1131849293404176385","actionCode":"systemMenuView","actionName":"查看","menuId":"3","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131849293509033986","authority":"ACTION_systemMenuView","auth":true},{"createTime":"2019-05-24 17:08:46","updateTime":"2019-05-24 17:08:46","actionId":"1131849510572654593","actionCode":"systemMenuEdit","actionName":"编辑","menuId":"3","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131849510677512193","authority":"ACTION_systemMenuEdit","auth":true}]},{"createTime":"2018-07-29 21:20:13","updateTime":"2020-06-19 15:38:31","menuId":"5","menuCode":"gatewayRoute","menuName":"网关路由","icon":"el-icon-s-home","parentId":"13","scheme":"/","path":"gateway/route/index","target":"_self","priority":5,"menuDesc":"网关路由","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"5","authority":"MENU_gatewayRoute","actionList":[{"createTime":"2019-05-24 18:10:29","updateTime":"2019-05-24 18:10:29","actionId":"1131865040289411074","actionCode":"gatewayRouteView","actionName":"查看","menuId":"5","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131865040381685761","authority":"ACTION_gatewayRouteView","auth":true},{"createTime":"2019-05-24 18:10:37","updateTime":"2019-05-24 18:10:37","actionId":"1131865075609645057","actionCode":"gatewayRouteEdit","actionName":"编辑","menuId":"5","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131865075697725442","authority":"ACTION_gatewayRouteEdit","auth":true}]},{"createTime":"2018-12-27 15:26:54","updateTime":"2020-06-19 15:36:48","menuId":"8","menuCode":"systemRole","menuName":"角色管理","icon":"el-icon-more","parentId":"1","scheme":"/","path":"system/role/index","target":"_self","priority":8,"menuDesc":"角色信息管理","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"8","authority":"MENU_systemRole","actionList":[{"createTime":"2019-05-24 17:46:16","updateTime":"2019-05-24 17:46:16","actionId":"1131858946338992129","actionCode":"systemRoleView","actionName":"查看","menuId":"8","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131858946414489602","authority":"ACTION_systemRoleView","auth":true},{"createTime":"2019-05-24 18:03:22","updateTime":"2019-05-24 18:03:22","actionId":"1131863248310775809","actionCode":"systemRoleEdit","actionName":"编辑","menuId":"8","priority":0,"actionDesc":"","status":1,"isPersist":1,"serviceId":"loongeasy-cloud-base-server","authorityId":"1131863248373690369","authority":"ACTION_systemRoleEdit","auth":true}]}],"extra":{},"timestamp":"1595301279632"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/authority/user',
    type: 'get',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":[],"extra":{},"timestamp":"1595301279916"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/user/update',
    type: 'post',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":{},"extra":{},"timestamp":"1595301301877"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/user/update',
    type: 'post',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":{},"extra":{},"timestamp":"1595301301877"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/base/user/roles/add',
    type: 'post',
    response: config => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":{},"extra":{},"timestamp":"1595301323820"}', 'isEncrypt': '0' }
    }
  }

]

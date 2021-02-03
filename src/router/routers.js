// import Main from '@/components/main'
/* 布局模板 */
import Main from '@/layout'
/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  },
  // {
  //   path: '/dynamicIndex',
  //   name: 'DynamicIndex',
  //   component: Main,
  //   meta: {
  //     notCache: true,
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'dynamicIndex01',
  //       name: 'DynamicIndex01',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '动态首页'
  //       },
  //       component: () => import('@/views/dynamicIndex/dynamicIndex01/index.vue')
  //     },
  //     {
  //       path: 'addNew',
  //       name: 'AddNew',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '新建APP'
  //       },
  //       component: () => import('@/views/dynamicIndex/addNew/index.vue')
  //     },
  //     {
  //       path: 'pubComponentMgmt',
  //       name: 'PubComponentMgmt',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '管理公共组件'
  //       },
  //       component: () => import('@/views/dynamicIndex/pubComponentMgmt/index.vue')
  //     }
  //   ]
  // },
  // 带带删除
  // {
  //   path: '/system',
  //   name: 'system',
  //   component: Main,
  //   meta: {
  //     notCache: true,
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/system/app/index',
  //       name: 'systemApp',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '数据字典'
  //       },
  //       component: () => import('@/views/system/app/index.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/patternStandard',
  //   name: 'patternStandard',
  //   component: Main,
  //   meta: {
  //     notCache: true,
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'index',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '响应信息'
  //       },
  //       component: () => import('@/view/module/patternStandard/index.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/gate',
  //   name: 'gate',
  //   component: Main,
  //   meta: {
  //     notCache: true,
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'gatewayIpLimit001',
  //       name: 'gatewayIpLimit001',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '访问控制'
  //       },
  //       component: () => import('@/view/module/gateway/ip-limit/index.vue')
  //     }
  //   ]
  // },

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/404.vue')
  }
]

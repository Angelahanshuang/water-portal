import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/booking',
    component: Layout,
    name: 'booking',
    redirect: '/booking/list',
    meta: { title: '预约管理', icon: 'shop' },
    children: [
      {
        path: 'list',
        name: 'bookinglist',
        component: () => import('@/views/booking/list'),
        meta: { title: '预约列表', module: 'booking', icon: 'nav-list' }
      }
    ]
  },
  {
    path: '/channel',
    component: Layout,
    name: 'channel',
    redirect: '/channel/list',
    meta: { title: '渠道管理', icon: 'order' },
    children: [
      {
        path: 'list',
        name: 'channellist',
        component: () => import('@/views/channel/list'),
        meta: { title: '渠道列表', module: 'channel', icon: 'nav-list' }
      },
      {
        path: 'add',
        name: 'channeladd',
        hidden: true,
        component: () => import('@/views/channel/add'),
        meta: { title: '添加渠道', module: 'channel', icon: 'nav-list' }
      },
      {
        path: 'edit/:id',
        name: 'channeledit',
        hidden: true,
        component: () => import('@/views/channel/edit'),
        meta: { title: '修改渠道', module: 'channel', icon: 'nav-list' }
      },
      {
        path: 'devices/:id',
        name: 'devices',
        hidden: true,
        component: () => import('@/views/channel/devices'),
        meta: { title: '渠道设备', module: 'channel', icon: 'nav-list' }
      }
    ]
  },
  {
    path: '/installuser',
    component: Layout,
    name: 'installuser',
    redirect: '/installuser/list',
    meta: { title: '用户管理', icon: 'order' },
    children: [
      {
        path: 'list',
        name: 'installuserlist',
        component: () => import('@/views/installuser/list'),
        meta: { title: '用户列表', module: 'installuser', icon: 'nav-list' }
      },
      {
        path: 'edit/:id',
        name: 'installuseredit',
        hidden: true,
        component: () => import('@/views/installuser/edit'),
        meta: { title: '修改用户', module: 'installuser', icon: 'nav-list' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name: 'report',
    redirect: '/report/income',
    meta: { title: '报表', icon: 'order' },
    children: [
      {
        path: 'income',
        name: 'reportincome',
        component: () => import('@/views/report/income'),
        meta: { title: '收入查询', module: 'report', icon: 'nav-list' }
      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    name: 'financial',
    redirect: '/financial/channelbill',
    meta: { title: '财务结算', icon: 'trade' },
    children: [
      {
        path: 'channelbill',
        name: 'channelbill',
        component: () => import('@/views/financial/channelbill'),
        meta: { title: '渠道佣金结算', module: 'financial', icon: 'money' }
      },
      {
        path: 'receivable',
        name: 'receivable',
        component: () => import('@/views/financial/receivable'),
        meta: { title: '商业用户应收', module: 'financial', icon: 'money' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


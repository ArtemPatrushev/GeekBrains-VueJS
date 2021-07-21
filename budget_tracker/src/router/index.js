import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'Dashboard' },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "PageDashboard" */ '../pages/PageDashboard.vue'),
    },
    {
      path: '/dashboard/:page',
      component: () => import(/* webpackChunkName: "PageDashboard" */ '../pages/PageDashboard.vue'),
    },
    {
      path: '/about*',
      name: 'About',
      component: () => import(/* webpackChunkName: "PageAbout" */ '../pages/PageAbout.vue'),
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "Page404" */'../pages/Page404.vue'),
    },
    {
      path: '*',
      redirect: { name: 'NotFound' }
    },
  ]
})
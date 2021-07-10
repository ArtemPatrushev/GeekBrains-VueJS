import Vue from 'vue';
import Router from 'vue-router';

import PageDashboard from '../pages/PageDashboard'
import PageAbout from '../pages/PageAbout'
import Page404 from '../pages/Page404'

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
      component: PageDashboard
    },
    {
      path: '/dashboard/:page',
      component: PageDashboard
    },
    {
      path: '/about*',
      name: 'About',
      component: PageAbout
    },
    {
      path: '/add/payment/:category',
      component: PageDashboard,
      props: { showPaymentForm: true },
    },
    {
      path: '/404',
      name: 'NotFound',
      component: Page404
    },
    {
      path: '*',
      redirect: { name: 'NotFound' }
    },
  ]
})
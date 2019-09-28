import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'home',
      component:()=>import('@/views/index')
    },
    {
      path:'/dataScreening',
      name:'dataScreening',
      component:()=>import('@/views/dataScreening')
    },
    {
      path:'/userData',
      name:'userData',
      component:()=>import('@/views/userData')
    },
    {
      path:'/drugAnalyse',
      name:'drugAnalyse',
      component:()=>import('@/views/drugAnalyse')
    },
  ]
})

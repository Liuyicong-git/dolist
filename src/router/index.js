import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Plan from '../views/Plan.vue'
import TodayCurrent from '../views/TodayCurrent.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '/home',
        name: 'home',
        component: TodayCurrent
      },
      {
        path: '/plan',
        name: 'Plan',
        component: Plan
      },

      {
        path: 'addEvent',
        name: 'addEvent',
        component: () => import('../views/addEvent.vue')
      }
    ]

  }

]

const router = new VueRouter({
  mode: 'history',
  base: '/appdolist',
  routes
})

export default router

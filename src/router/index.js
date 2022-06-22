import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('../components/DefaultLayout.vue'),
      meta: {requiredAuth: true},
      children:[
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: '/surveys',
          name: 'Surveys',
          component: () => import('../views/SurveysView.vue')
        },
        {
          path: '/survey/create',
          name: 'SurveyCreate',
          component: () => import('../views/SurveyView.vue')
        },
        {
          path: '/survey/:id',
          name: 'Survey',
          component: () => import('../views/SurveyView.vue')
        },
      ]
    },

    {
      path : '/auth',
      redirect: '/login',
      component: () => import('../components/AuthLayout.vue'),
      meta: {isGuest: true},
      name: 'Atuh',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: '/register',
          name: 'Register',
          component: () => import('../views/RegisterView.vue')
        }
      ]
    },

  ]
})

router.beforeEach((to, from, next) =>{
  if (to.meta.requiredAuth && !store.state.user.token){
    next({name: 'Login'})
  }else if ((to.meta.isGuest ) && store.state.user.token ){
    next({name: 'Dashboard'});
  }else{
    next()
  }
})

export default router

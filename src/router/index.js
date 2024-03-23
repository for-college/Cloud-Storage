import { checkAuth } from '@/router/checkAuth.js'
import { createRouter, createWebHistory } from 'vue-router'

import AccessedView from '@/views/AccessedView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UploadView from '@/views/UploadView.vue'
import EditView from '@/views/EditView.vue'
import ChangeRightsView from '@/views/ChangeRightsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/edit/:id/:name',
      name: 'edit',
      component: EditView,
    },
    {
      path: '/rights/:id/:name',
      name: 'rights',
      component: ChangeRightsView
    },
    {
      path: '/accessed',
      name: 'accessed',
      component: AccessedView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(checkAuth)

export default router

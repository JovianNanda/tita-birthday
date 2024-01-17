import { createRouter, createWebHistory } from 'vue-router'
import CountdownView from '@/views/CountdownView.vue'
import BirthdayView from '@/views/BirthdayView.vue'
import NotFound from '@/views/NotFound.vue'
import data from '@/assets/data.json'
const birthdayDate = new Date(data.birthday)
const currentDate = new Date()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CountdownView
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: BirthdayView,
      beforeEnter: (to, from) => {
        if (currentDate.toISOString() < birthdayDate.toISOString()) {
          return '/'
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      beforeEnter: (to, from) => {
        return '/'
      }
    }
  ]
})

export default router

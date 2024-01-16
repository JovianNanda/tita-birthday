import { createRouter, createWebHistory } from 'vue-router'
import CountdownView from '@/views/CountdownView.vue'
import BirthdayView from '@/views/BirthdayView.vue'
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
      beforeEnter: (to, from, next) => {
        if (currentDate.toISOString() < birthdayDate.toISOString()) {
          next('/')
        }
        return false
      }
    }
  ]
})

export default router

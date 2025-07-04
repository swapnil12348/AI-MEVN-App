import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AIChat from '../views/AIChat.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/chat', name: 'AIChat', component: AIChat },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

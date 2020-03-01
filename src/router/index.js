import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../components/Form.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form
  }
]

const router = new VueRouter({
  routes
})

export default router

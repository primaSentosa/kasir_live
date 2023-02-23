import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/item',
    name: 'item',
    component: () => import('../views/Item.vue')
  },
  {
    path: '/bon',
    name: 'bon',
    component: () => import('../views/Bon.vue')
  } ,        
  {
    path: '/pembelian',
    name: 'Pembelian',
    component: () => import('../views/Pembelian.vue')
  } ,              
  {
    path: '/form/pembelian',
    name: 'Pembelian',
    component: () => import('../views/PembelianForm.vue')
  } ,                
  {
    path: '/penjualan',
    name: 'penjualan',
    component: () => import('../views/Penjualan.vue')
  } ,               
  {
    path: '/shift',
    name: 'shift',
    component: () => import('../views/Shift.vue')
  } ,            
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Vuex from 'vuex'
import item from './module/item'
import kategori from './module/kategori'
import cart from './module/cart'
import shift from './module/shift'
import customer from './module/customer'
import supplier from './module/supplier'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    email: null,
    userId:null,
    userRole:'',
    url: 'https://server-live-d54d413311de.herokuapp.com/'
  },
  mutations: {
    setLogin(state,payload){
      state.isLogin = payload
    },
    setUser(state,payload){
      state.user = payload
    },
    setEmail(state,payload){
      state.email = payload
    },    
    setUserId(state,payload){
      state.userId = payload
    },
    setRole(state,payload){
      state.userRole = payload
    }
  },
  actions: {
  },
  modules: {
    item,
    kategori,
    cart,
    shift,
    customer,
    supplier
  }
})

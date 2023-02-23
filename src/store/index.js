import Vue from 'vue'
import Vuex from 'vuex'
import item from './module/item'
import kategori from './module/kategori'
import cart from './module/cart'
import shift from './module/shift'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    email: null,
    userId:null,
    userRole:'',
    url: 'http://localhost:3000'
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
    shift
  }
})

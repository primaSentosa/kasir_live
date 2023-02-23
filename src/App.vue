<template>
  <div id="app">
    <MyComponent />
    <div v-if="!isLogin">
      <Login />
    </div>    
    <div v-if="isLogin">
      <v-app>
          <SideBar />
          <div style="margin: 10px;">
            <router-view/>  
          </div>
      </v-app>
    </div>
  </div>
</template>
<script>
import Login from './components/Login.vue'
import SideBar from './components/SideBar.vue'
import {mapActions} from 'vuex'

  export default {
    data () {
      return {

      }
    },
    components: {
    Login,
    SideBar
    },      
    computed:{
      isLogin(){
        return this.$store.state.isLogin
      },
      getRole(){
        return this.$store.state.userRole
      }      
    },
    methods:{
      ...mapActions({
            fetchShift: 'shift/getDataShift'
        }),        
    },
    created () {
      if(localStorage.getItem('token')){
        this.$store.commit('setUser',localStorage.getItem('user'))
        this.$store.commit('setRole',localStorage.getItem('role'))
        this.$store.commit('setEmail',localStorage.getItem('email'))
        this.$store.commit('setUserId',localStorage.getItem('userId'))    
        this.$store.commit('setLogin', true)
        this.fetchShift()
        
      }else{
        this.$store.commit('setLogin', false)
      }
    } 
  }
</script>
<style  scoped>
 
</style>

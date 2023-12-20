import axios from 'axios'

const state = {
    kategori : [],
    loadingKat: false,
    merkMobil: [],
    loadingMobil: false,
    merkKaca:[],
    loadingKaca: false
}
const mutations = {
    fillKategori(state,payload){
        state.kategori = payload
        },
    fillLoadingKat(state,payload){
          state.loadingKat = payload
          },        
    fillMerkMobil(state,payload){
          state.merkMobil = payload
          }, 
    fillLoadingMobil(state,payload){
          state.loadingMobil = payload
          },               
    fillMerkKaca(state,payload){
      state.merkKaca = payload
      },           
    fillLoadingKaca(state,payload){
      state.loadingKaca = payload
      },                     
}
const actions = {
  fetchKategori(context,payload,limit) {
      context.commit('fillLoadingKat',true)    
      context.commit('fillKategori',[])
      axios({
        url: `https://server-live-d54d413311de.herokuapp.com/kategori`,
        method: 'get',
        headers:{
            token : localStorage.getItem('token')
        }
      })      
            .then(({data})=>{       
                      context.commit('fillKategori',data.results)
                      context.commit('fillLoadingKat',false)    
            })
            .catch(err=>{
                console.log('eror')
                console.log(err)
            })
  },
  fetchMerkMobil(context,payload,limit) {
    context.commit('fillLoadingMobil',true)    
    context.commit('fillMerkMobil',[])
    axios({
      url: `https://server-live-d54d413311de.herokuapp.com/kategori/mobil`,
      method: 'get',
      headers:{
          token : localStorage.getItem('token')
      }
    })      
          .then(({data})=>{       
                    context.commit('fillMerkMobil',data.results)
                    context.commit('fillLoadingMobil',false)    
          })
          .catch(err=>{
              console.log('eror')
              console.log(err)
          })
  },
  fetchMerkKaca(context,payload,limit) {
    context.commit('fillLoadingKaca',true)    
    context.commit('fillMerkKaca',[])
    axios({
      url: `https://server-live-d54d413311de.herokuapp.com/kategori/kaca`,
      method: 'get',
      headers:{
          token : localStorage.getItem('token')
      }
    })      
          .then(({data})=>{       
                    context.commit('fillMerkKaca',data.results)
                    context.commit('fillLoadingKaca',false)    
          })
          .catch(err=>{
              console.log('eror')
              console.log(err)
          })
  }     

}
const getters = {   
    getKategori : (state) => {
      return  state.kategori
    },   
    getLoadingKat : (state) => {
      return  state.loadingKat
    },       
    getMerkMobil : (state) => {
      return  state.merkMobil
    },  
    getLoadingMobil : (state) => {
      return  state.loadingMobil
    },           
    getMerkKaca : (state) => {
      return  state.merkKaca
    },       
    getLoadingKaca : (state) => {
      return  state.loadingKaca
    },                    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
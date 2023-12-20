import axios from 'axios'

const state = {
    loading : false,
    allItem : [],
    totalItem : 0,
}
const mutations = {
    fillLoading(state,payload){
        state.loading = payload
        },    
    fillData(state,payload){
        state.allItem = payload
        },
    fillTotal(state,payload){
        state.totalItem = payload
        }      
}
const actions = {
  fetchAction(context) {
      context.commit('fillLoading',true)
      context.commit('fillData',[])
      axios({
        url: `https://server-live-d54d413311de.herokuapp.com/customer`,
        method: 'get',
        headers:{
            token : localStorage.getItem('token')
        }
      })      
            .then(({data})=>{       
                console.log(data)
                    if(state.allItem.length <= 0){
                      context.commit('fillData',data.results)
                      context.commit('fillTotal',data.Total)
                      context.commit('fillLoading',false)
                    }
            })
            .catch(err=>{
                console.log('eror')
                console.log(err)
            })
  },
  editItem(context,payload){
    let temp = state.allItem.findIndex(function(data) {
      return data._id === payload._id
    })
    state.allItem.splice(Number(temp), 1,payload)
  }

}
const getters = {
    getLoading : (state) => {
        return  state.loading
      },    
    getAllItem : (state) => {
      return  state.allItem
    },
    getTotalItem : (state) => {
        return  state.totalItem
      }     
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
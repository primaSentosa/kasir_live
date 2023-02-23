<template>
    <div>
      <v-card max-width="auto" tile flat class="my-5">
        <v-toolbar color="" flat height="60px" >
        <v-spacer></v-spacer>
          <h2>Transaksi Pembelian</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
      <v-row>
          <v-col cols="12" md="7">
              <b-card class="ml-1"  footer-tag="footer" header-tag="header" >
                  <Tabelitem />                          
              </b-card>  
          </v-col>
          <v-col cols="12" md="5">  
            <b-card class="mr-1">                
                <Cart />
            </b-card>
          </v-col>
      </v-row>       
  
    </div>
  </template>
  
  <script>
    import { mapActions, mapGetters } from 'vuex'
    import Tabelitem from '../components/TabelAllItem.vue'
    import Cart from '../components/CartPembelian.vue'
  
    export default {
      data() {
        return {
          src: '',
  
          // shift
          dialog: false
        }
      },
      components: {
          Tabelitem,
          Cart
      },
      computed:{
          ...mapGetters({
              print: 'transaksi/getPrint',
              allItem: 'item/getAllItem',
              loading: 'item/getLoading',
              //shift kasir
              shift: 'shift/getShift' ,
              data: 'shift/getData'
          }),      
          getRole(){
            return this.$store.state.userRole
          }             
      },        
      watch: {
          src: function(){
              console.log(this.src)
          },
          data: function(){
              if(this.data === null){
                  this.dialog = true
              }
          },        
      },   
      methods: { 
          ...mapActions({
              fetchItem: 'item/fetchAction',
              fetchShift: 'shift/getDataShift'
          }),               
      },
      created(){

      }      
    }
  </script>
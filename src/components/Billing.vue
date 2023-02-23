<template>
    <div class="overflow-auto"> 
          <div class="ticket">
              <p class="centered">PRIMA SENTOSA GLASS
                  <br>jl.SOLO BARU
                  <br>08123456789</p>
              <small>____________________</small>
              <div>
                  <small>Id.Transaksi : {{transaksi.id}}</small>
                  <br>
                  <small>Tanggal : {{getDateFull}}</small>
                  <br>
                  <small>Kasir : {{userName}}</small>                
              </div>                  
              <small>____________________</small>
  
              <div v-for="item in items" :key="item._id">
                  <small>{{item.nama}}</small>
                  <br>
                  <small>Rp {{ getRupiah(item.harga)  }} x {{item.qty}} = Rp {{getRupiah(item.harga * item.qty)}}</small>
              </div> 
              <small>____________________</small>
              <div>
                  <small>Total: Rp {{getRupiah(transaksi.totalHarga)}}</small>
                  <br>
                  <small>Bayar: Rp {{getRupiah(transaksi.bayar)}}</small>
                  <br>
                  <small>Pembayaran: {{transaksi.pembayaran}}</small>
                  <br>
                  <small>Kembali: Rp {{getRupiah(transaksi.totalHarga - transaksi.bayar)}}</small>   
                  <br>
                  <small>____________________</small>                       
              </div>   
              <br>
              <div class="mt-3">
              <p class="centered">
                  BARANG YANG SUDAH DIBELI TIDAK DAPAT DIKEMBALIKAN,
                  <br>
                  TERIMAKASI TELAH BERBELANJA   
                  <br>
                  ________________________________________________________
                  <br>
                  ________________________________________________________
              </p>
              </div>
          </div>
          <!-- <b-button @click.prevent="printOke()" v-if="show">Print</b-button>  -->
  
    </div>
  
  </template>
  
  <script>
      import { mapGetters,mapActions,mapMutations } from 'vuex'
  
    export default {
      data() {
        return {    
            show: false
        }
      },
      computed:{
          userName(){
          return this.$store.state.user
          },        
          ...mapGetters({
              items: 'cart/getListItem',
              printStatus: 'cart/getPrint',
              transaksi: 'cart/getTransaksi'
          }),      
          getDateFull: function(){
                  var newDate = new Date()
                  var date= newDate.getDate()
                  var month = newDate.getMonth()
                  var year = newDate.getFullYear()
                  return `${date}/${month+1}/${year}`
              },               
      },    
      methods:{       
          // 
          ...mapMutations({
            fillPrint: 'cart/fillPrint',
            fillItem: 'cart/fillItem'
          }),         
          print(){
              this.fillPrint(true)
              this.show = true
          },
          printOke(){
              window.print()
              this.fillPrint(false)
              this.fillItem(false)
              this.show = false
          },
          ...mapActions({
              fetchItem: 'item/fetchAction',
          }),       
          getRupiah(uang){
              if(uang){
                  var number_string = uang.toString()
                  var sisa 	= number_string.length % 3,
                      rupiah 	= number_string.substr(0, sisa),
                      ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                          
                  if (ribuan) {
                      uang = sisa ? '.' : '';
                      rupiah += uang + ribuan.join('.');
                  }            
  
                  return rupiah
              }else{
                  return '-'
              }
          },
          formatRupiahEsc(angka){
              console.log(angka)
              let al = "";
              if(angka=="" || angka==null || angka=="null" || angka==undefined){
                  al = "";
              } else {
                  al = Math.abs(angka.replace(/[^,\d]/g, '').toString());
              }
              return al;
          },
          getHargaGrosir(item){
              if(item.hargaGrosir === null || item.hargaGrosir === false){
                  return item.hargaEcer
              }else{
                  return item.hargaGrosir
              }
          },
          getTotalHargaGrosir(data){
              if(data.hargaGrosir === null || data.hargaGrosir === false){
                  return data.hargaEcer * data.qty                    
              }else{
                  return data.hargaGrosir * data.qty
              }
          }                         
      },
      watch:{
      show: function(){
              if(this.show){
                  this.printOke()
              }
          }       
      },
      created(){        
          this.show = false
          console.log(this.transaksi)
          this.print()
      }
    }
  </script>
  
  <style scoped>
  * {
      font-size: 12px;
      font-family: 'Times New Roman';
  }
  
  td,
  th,
  tr,
  table {
      border-top: 1px solid black;
      border-collapse: collapse;
  }
  
  td.description,
  th.description {
      width: 58mm;
      max-width: 58mm;
  }
  
  td.quantity,
  th.quantity {
      width: 58mm;
      max-width: 58mm;
      word-break: break-all;
  }
  
  /* td.price,
  th.price {
      width: 58mm;
      max-width: 58mm;
      word-break: break-all;
  } */
  
  .centered {
      text-align: center;
      align-content: center;
  }
  
  .ticket {
      width: 58mm;
      max-width: 58mm;
  }
  
  img {
      max-width: inherit;
      width: inherit;
  }
  
  @media print {
      .hidden-print,
      .hidden-print * {
          display: none !important;
      }
  }
  
  @page {
      size:58mm;
      margin: 0mm;
  }
  
  
  /* @page {
      size: 58mm 100mm;
      margin: 0;
  }
  @media print {
      .page {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
      }
  } */
  </style>
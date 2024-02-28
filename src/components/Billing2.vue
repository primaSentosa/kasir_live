<template>
<div class="page-container">
        <main class="main-content">
            <div id="invoice-app">
                <div class="header">
                    <div>
                        <h1>Invoice Prima Jaya</h1>
                        <small>Id.Transaksi : {{transaksi._id}}</small>
                        <br>
                        <small>Tanggal : {{getDateFull}}</small>
                        <br>
                        <small>Kasir : {{userName}}</small>   
                    </div>
                    <div>
                        <div class="section-spacer">
                            
                        </div>
                        <div class="section-spacer">
                            <!-- <p><strong>Bill to:</strong></p> -->
                            
                        </div>
                    </div>
                </div>
                <table class="responsive-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Item</th>
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tr v-for="(item, index) in items">
                        <td data-label="No">{{ index + 1 }}</td>
                        <td data-label="Item">{{item.nama}}</td>
                        <td data-label="Harga">Rp {{ getRupiah(item.harga)  }}</td>
                        <td data-label="Qty">{{ item.qty }}</td>
                        <td data-label="Total">Rp {{getRupiah(item.harga * item.qty)}}</td>
                    </tr>
                </table>

                <table>
                    <tr class="text-bold">
                        <td>Total</td>
                        <td>Rp {{getRupiah(transaksi.total)}}</td>
                    </tr>
                    <tr >
                        <td>Bayar</td>
                        <td>Rp {{getRupiah(transaksi.bayar)}}</td>
                    </tr>
                    <tr >
                        <td>Pembayaran</td>
                        <td>{{transaksi.pembayaran}}</td>
                    </tr> 
                    <tr >
                        <td>Kembali</td>
                        <td>Rp {{getRupiah(transaksi.total - transaksi.bayar)}}</td>
                    </tr>                                         
                </table>
            </div>
            
        </main>
    </div>
  
</template>
  
  <script>
      import { mapGetters,mapActions,mapMutations } from 'vuex'
  
    export default {
      data() {
        return {    
            show: false,           
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
          this.print()

        //   console.log(this.transaksi)
      }
    }
  </script>
  
  <style scoped>

.main-content {
    min-height: 100vh;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    @media print {
        align-items: flex-start;
    }
}


#invoice-app {
    padding: 2rem;
    border-radius: 0.5rem;
}

.header {
    @media (min-width: 761px) {
        display: flex;
    }

    > div {
        &:nth-child(-n+1){
            @media (min-width: 761px) {
                order: 1;
                flex: 1;
                text-align: right;
                padding-left: 1rem;
            }
        }
    }
}

.section-spacer {
    margin: 1rem 0;
}

textarea {
    width: 100%;
    min-height: 80px;
}

select {
    @media 
    only screen and (max-width: 760px) {
        width: 100%;
    }

    @media print {
        appearance: none;
    }
}

.company-name {
    font-size: 2rem;
}

table{
    width: auto; 
    border-collapse: collapse; 
    margin: 2rem 0;
    
    thead{
        th {
            padding: 0.5rem 1rem;

            &:nth-child(-n+1){
                padding-left: 0;
            }
            &:nth-last-child(-n+1){
                padding-right: 0;
            }
        }
    }
    
    tr { 
        border-bottom: 1px solid;

        td {
            padding: 0.5rem 1rem;

            &:nth-child(-n+1){
                padding-left: 0;
            }
            &:nth-last-child(-n+1){
                padding-right: 0;
            }

            input {
                width: 100%;
            }

            .cell-with-input {
                display: flex;

                input {
                    margin: 0 0.2rem;
                }
            }
        }
    }
}

.responsive-table {
    width: 100%;
    @media 
    only screen and (max-width: 760px) {

        table, thead, tbody, th, td, tr { 
            display: block; 
        }

        thead tr { 
            position: absolute;
            top: -9999px;
            left: -9999px;
        }

        tr {
            padding: 2rem 0;
        }

        
        td[data-label] {
            position: relative;
            padding-left: 40%; 
            display: flex;
            align-items: center;

            &:before { 
                content: attr(data-label);
                position: absolute;
                top: 0.5rem;
                left: 0;
                width: 35%; 
                padding-right: 10px; 
                white-space: nowrap;
                font-weight: bold;
            }
        }
    }
}

button {

    border: none;
    border-radius: 100px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;





    @media print {
        display: none;
    }



}

.text-right {
    text-align: right;
}

.text-bold {
    font-weight: bold;
}
  </style>
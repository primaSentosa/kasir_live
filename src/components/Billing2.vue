<template>
<div class="continuous_form landscape">
    <!-- Each sheet element should have the class "sheet" -->
    <!-- "padding-**mm" is optional: you can set 10, 15, 20 or 25 -->
    <section class="sheet padding-5mm">
        <!-- Write HTML just like a web page -->
        <!-- <article>This is an Continuous Form document.</article> -->

        <table style="table-layout: fixed;">
            <colgroup>
                <col style="<?= 'width: ' . $cols[0] . 'px'; ?>">
                <col style="<?= 'width: ' . $cols[1] . 'px'; ?>">
                <col style="<?= 'width: ' . $cols[2] . 'px'; ?>">
                <col style="<?= 'width: ' . $cols[3] . 'px'; ?>">
                <col style="<?= 'width: ' . $cols[4] . 'px'; ?>">
                <col style="<?= 'width: ' . $cols[5] . 'px'; ?>">
                <col style="<?= 'width: ' . $cols[6] . 'px'; ?>">
            </colgroup>
            <thead>
                <tr>
                    <td colspan="2" rowspan="3" style="background-image: url(<?= base_url('images/logo.png') ?>);
                        background-size: contain;
                        background-repeat-x: no-repeat;
                        background-size: 150px;">
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: left;" colspan="2">Bandung, {{getDateFull}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: left;" colspan="2">Kepada Yth.</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td></td>
                    <td style="text-align: left;" colspan="2">Daniel</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2">No. Faktur :{{ transaksi._id }}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr style="text-align: center;font-weight:bold;">
                    <td style="border: 1px solid black; text-align: center;" colspan="2">Nama Barang</td>
                    <td style="border: 1px solid black; text-align: center;">Pcs</td>
                    <td style="border: 1px solid black; text-align: center;">Harga</td>
                    <td style="border: 1px solid black; text-align: center;">Subtotal</td>
                </tr>

                <tr v-for="item in items" :key="item._id">
                    <td style="border: 1px solid black; text-align: left;" colspan="2">{{ item.nama }}</td>
                    <td style="border: 1px solid black; text-align: right;">{{ item.qty }}</td>
                    <td style="border: 1px solid black; text-align: right;">Rp {{ getRupiah(item.harga) }}</td>
                    <td style="border: 1px solid black; text-align: right;">Rp {{getRupiah(item.harga * item.qty)}}</td>
                </tr>
                    <tr>
                        <td style="border: 1px solid black; text-align: left;"></td>
                        <td style="border: 1px solid black; text-align: left;" colspan="2"></td>
                        <td style="border: 1px solid black; text-align: left;"></td>
                        <td style="border: 1px solid black; text-align: left;"></td>
                        <td style="border: 1px solid black; text-align: left;"></td>
                        <td style="border: 1px solid black; text-align: left;"></td>
                    </tr>
                <tr>
                    <td style="border: 1px solid black; text-align: center;" colspan="3">Total</td>
                    <td style="border: 1px solid black; text-align: right;"></td>
                    <td style="border: 1px solid black; text-align: right;"></td>
                    <td style="border: 1px solid black; text-align: right;"></td>
                    <td style="border: 1px solid black; text-align: right;">Rp {{getRupiah(transaksi.totalHarga)}}</td>
                </tr>
                <tr>
                    <td colspan="7"></td>
                </tr>
                <tr>
                    <td colspan="7">
                        <table>
                            <colgroup>
                                <col style="<?= 'width: ' . $footer[0] . 'px'; ?>">
                                <col style="<?= 'width: ' . $footer[1] . 'px'; ?>">
                                <col style="<?= 'width: ' . $footer[2] . 'px'; ?>">
                                <col style="<?= 'width: ' . $footer[3] . 'px'; ?>">
                                <col style="<?= 'width: ' . $footer[4] . 'px'; ?>">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Hormat Kami</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>Penerima</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border-bottom: 1px solid black;"></td>
                                    <td></td>
                                    <td style="border: 1px solid black;">
                                        <span style="text-align: center;font-weight:bold;">Perhatian!!!</span><br />
                                        <span style="text-align: left">
                                            1. Barang diterima dengan baik dan sesuai dengan pembelian<br />
                                            2. Kehilangan / kerusakan diluar Toko, bukan tanggung jawab Kami.<br />
                                            3. Barang yang sudah dibeli tidak boleh dikembalikan.
                                        </span>
                                    </td>
                                    <td></td>
                                    <td style="border-bottom: 1px solid black;"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
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
<template>
    <div class="page-container">
        <div class="header">
            <div>
                <h1>Nota</h1>
                <p>Tanggal: {{getDateFull}}</p>
            </div>
        </div>
        <v-simple-table
        fixed-header
        height="240px"
        >
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    Item
                </th>
                <th class="text-left">
                    Harga
                </th>
                <th class="text-left">
                    Qty
                </th>
                <th class="text-left">
                    Total Harga
                </th>
                <th class="text-left">
                    Delete
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(item,index) in items"
                :key="item._id"
                >
                    <td>{{ item.nama }}</td>
                    <td>
                        <v-edit-dialog
                        :return-value.sync="item.harga"
                        large
                        persistent
                        @save="save"
                        @cancel="cancel"
                        @open="item.harga = item.harga"
                        @close="close"
                        >
                        <div>Rp {{ getRupiah(item.harga) }}</div>
                        <template v-slot:input>
                            <div class="mt-4 text-h6">
                            Update Harga
                            </div>
                            <v-text-field
                            v-model="item.harga"
                            :rules="[max25chars]"
                            label="Edit"
                            single-line
                            counter
                            autofocus
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>                
                    </td>
                    <td>
                        <input type="number" min="0" :max="item.stok" v-model="item.qty" />
                    </td>
                    <td>{{getRupiah( Number(item.harga) * Number(item.qty) ) }}</td>
                    <td>
                        <a @click="deleteItem(index)">
                            <v-icon color="red" v-b-popover.hover.top="'Delete Item'" small>mdi-delete</v-icon>
                        </a>        
                    </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>           

        <table style="width:100%">
            <tr class="text-bold">
                <td>Total:</td>
                <td>Rp {{getRupiah(subTotal) }}</td>
            </tr>
        </table>
        <v-btn
        color="blue darken-1"
        text
        @click="bayar()"
        >
        Bayar
        </v-btn>
    
        <!-- form uang dibayar -->
        <v-dialog
        v-model="dialog"
        width="1000"
        >      
          <v-card >
            <v-card-title class="text-h5 grey lighten-2 mb-4">
            Total:   Rp {{ getRupiah(subTotal) }}
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                    <v-col cols="12" md="6">                  
                        <v-select
                        :items="pembayaran"
                        v-model="transaksi.pembayaran"
                        label="Metode Pembayaran"
                        ></v-select>
                    </v-col>                     
                </v-row>          
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="batal()"
              >
                Batal
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="tambahTransaksi()"
              >
                Bayar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>           
        <!-- form uang dibayar -->
    
    </div>
    
    </template>
    
    <script>
        import { mapActions, mapGetters, mapMutations } from 'vuex'
        import Swal from 'sweetalert2'
        import axios from 'axios'

        export default {
    
            data(){
            return {
                    dialog: false,
                    pembayaran: ['Tunai', 'Bon'],
                    transaksi:{
                        total: 0,
                        pembayaran: 'Tunai'
                    }
                }
            },
            methods: {
                ...mapActions({
                    createTransaksi: 'cart/createTransaksi',
                }),              
                ...mapMutations({
                    fillItem: 'cart/fillItem'
                }),     
                batal(){
                    this.dialog = false
                },
                bayar(){                
                    if(this.items.length > 0){
                        this.dialog = true
                        this.uang = `${this.subTotal}`                                
                    }
                },
                 tambahTransaksi(){
                        this.transaksi.total = this.subTotal
                            Swal.fire({
                                title: 'Buat Transaksi?',
                                showDenyButton: true,
                                confirmButtonText: `Ya`,
                                denyButtonText: `Batal`,
                                }).then(async (result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    let tempItem = []
                                    await this.items.forEach(element => {
                                    let temp = {
                                        _id: element.id,
                                        kodeBarang: element.kodeBarang,
                                        nama: element.nama,
                                        qty: Number(element.qty),
                                        hargaModal: element.harga
                                    }

                                    tempItem.push(temp)
                                    });

                                    axios({
                                    url: `http://localhost:3000/transaksi/pembelian`,
                                    method: 'post',
                                    headers:{
                                        token : localStorage.getItem('token')
                                    },
                                    data:{
                                        admin: this.userId,
                                        listItem: tempItem,
                                        totalHarga: this.transaksi.total,          
                                        metode: this.transaksi.pembayaran                   
                                    }
                                    })
                                        .then(({data}) =>{                                    
                                            this.dialog = false
                                            this.fillItem(false)
                                        })
                                        .catch(err=>{
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'internal server error !',
                                                text: err.errors,
                                            })                
                                        })                                                       
                                } else if (result.isDenied) {
                                        
                                }
                            })      
                },
                deleteItem: function(index) {
                    this.items.splice(index, 1)
                },
                formatRupiahEsc(angka){                
                    let al = "";
                    if(angka=="" || angka==null || angka=="null" || angka==undefined){
                        al = "";
                    } else {
                        al = Math.abs(angka.replace(/[^,\d]/g, '').toString());
                    }
                    return al;
                },              
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
                }                  
            },
            computed: {
                userName(){
                return this.$store.state.user
                },       
                userId(){
                return this.$store.state.userId
                },                 
                ...mapGetters({
                    items: 'cart/getListItem',
                }),                 
                getDateFull: function(){
                    var newDate = new Date()
                    var date= newDate.getDate()
                    var month = newDate.getMonth()
                    var year = newDate.getFullYear()
                    return `${date}/${month+1}/${year}`
                },          
                subTotal: function() {
                    var total = this.items.reduce(function(accumulator, item) {

                            return accumulator + ( Number(item.harga) * Number(item.qty) );
                    
                    }, 0)
                    return total;
                },
            },
            watch: {
                uang: function(){
                    if(this.uang){
                        var number_string = this.uang.replace(/[^,\d]/g, '').toString()
                        var sisa 	= number_string.length % 3,
                            rupiah 	= number_string.substr(0, sisa),
                            ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                                
                        if (ribuan) {
                            this.uang = sisa ? '.' : '';
                            rupiah += this.uang + ribuan.join('.');
                        }            
            
                        this.uang = rupiah
                    }
                },
            }
        }
    
    </script>
    
    <style scoped>
    
    body {
        background: linear-gradient(to right, red, yellow);
    }
    
    
    #invoice-app {
        background-color: white;
        padding: 2rem;
        border-radius: 0.5rem;
    }
    
    .header {
        @media (min-width: 761px) {
            display: flex;
        }
    }
    
    .text-right {
        text-align: right;
    }
    
    .text-bold {
        font-weight: bold;
    }
    </style>
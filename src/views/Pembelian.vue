<template>
    <div class="overflow-auto"> 
        <v-card max-width="auto" tile flat class="my-5">
        <v-toolbar color="" flat height="60px" >
        <v-spacer></v-spacer>
            <h2>Pembelian</h2>
            <v-spacer></v-spacer>
        </v-toolbar>
        </v-card>    
        <v-row class="m-4">          
            <v-col
            cols="12"
            sm="3"
            >
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="dateRangeText"
                        label="Tanggal"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="date"
                    range
                    @input="closeCalender()"
                    ></v-date-picker>
                </v-menu>              
            </v-col>
            <v-col
            cols="12"
            sm="2"
            >
            <v-select
            :items="allMetode"
            v-model="metode"
            label="Metode"
            outlined
            ></v-select>
            </v-col>                    
            <v-col
            cols="12"
            sm="2">
            <v-btn
                rounded
                color="#04428D"
                small
                dark
                style="margin-top: 10px;"
                @click.prevent="fetchAllPembelian()"
                >
                Cari
                </v-btn>  
            </v-col>   
            <!-- search -->
            <v-col
            cols="12"
            sm="4"
            >     
                <v-text-field
                    solo
                    label="Id Nota"
                    append-icon="mdi-magnify"
                    v-on:keyup.enter="search(1)"
                    class="mr-4 ml-4"
                    clearable
                    v-model="src"        
                ></v-text-field>
                </v-col>        
            <!-- search -->                        
        </v-row>      
  
        <v-row class="m-4">
            <v-col
            cols="12"
            sm="5">        
                <v-card
                class="mx-auto"
                outlined
                max-width="344"
                >
                <v-card-text>
                    <h4>Total Pembelian</h4>
                    <div class="text-h4" style="color: #000000;">
                    {{getRp(totalPenjualan)}}
                    </div>
                </v-card-text>
                </v-card>        
            </v-col>

            <v-col
            cols="12"
            sm="3">        
                <v-card
                class="mx-auto"
                outlined
                max-width="344"
                >
                <v-card-text>
                    <h4>Transaksi</h4>
                    <div class="text-h4" style="color: #000000;">
                    {{allData.length}}
                    </div>
                </v-card-text>
                </v-card>        
            </v-col> 

            <v-col
            cols="12"
            sm="3">
                <v-btn
                color="blue-grey"
                class="ma-2 white--text"
                @click="$router.push('/form/pembelian')"
                >                
                <v-icon
                    left
                    dark
                >
                    mdi-plus-thick
                </v-icon>
                Pembelian
                </v-btn>
            </v-col>
        </v-row>          
        
        <!-- tabel penjualan -->
        <v-simple-table
                fixed-header
                height="400px"
            >
            <template v-slot:default >
            <thead>
                <tr>
                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                    <h5>Tanggal</h5>
                </th>       
                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                    <h5>Jam</h5>
                </th>                                          
                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                    <h5>Admin</h5>
                </th>
                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                    <h5>Supplier</h5>
                </th>
                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                    <h5>Metode</h5>
                </th>         
                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                    <h5>Total Harga</h5>
                </th>
                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                    <h5>Item</h5>
                </th>                                        
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in allData"
                :key="item._id"
                @click="openFormEdit(item)"
                >           
                <td>{{ getDate(item.createdAt) }}</td>
                <td>{{ item.jam }}</td>
                <td>{{ item.admin.username }}</td>
                <td v-if="item.supplier">{{ item.supplier.nama }}</td>
                <td v-if="!item.supplier">-</td>
                <td>
                    <b-badge variant="success" class="lg" v-if="item.metode === 'Tunai'">TUNAI</b-badge>          
                    <b-badge variant="danger" class="lg" v-if="item.metode === 'Bon'">BON</b-badge>    
                </td>
                <td>Rp {{ getRp( item.totalHarga) }}</td>
                <td>
                    <v-btn
                      rounded                      
                      small
                      dark
                      @click.prevent="openList(item.listItem)"
                      >
                      ALL ITEM
                    </v-btn>  
                </td>
                
                </tr>
            </tbody>
            </template>
        </v-simple-table>   
        <!-- tabel penjualan -->

        <!-- list item -->
        <v-dialog
            v-model="dialog"
            max-width="auto"
        >
            <v-card>
                <b-table
                id="my-table"
                :items="items"
                :fields="fields"
                small
                hover
                >
                    <template #cell(KodeBarang)="row">
                        <span class="mr-auto">{{row.item.kodeBarang}}</span>            
                    </template>                
                    <template #cell(Item)="row">
                        <span class="mr-auto">{{row.item.nama}}</span>            
                    </template>      
                    <template #cell(Qty)="row">
                    <p>{{ row.item.qty}}</p>
                    </template>     
                    <template #cell(Harga)="row">
                        <p>Rp {{ getRp(row.item.harga)  }}</p>
                    </template>           
                    <template #cell(Total)="row">
                    <p>Rp {{ getRp(row.item.harga * row.item.qty) }}</p>
                    </template>                                                   
                </b-table>                            
                <v-spacer></v-spacer>
                <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
                >
                Cancel
                </v-btn>
            </v-card>
        </v-dialog>                    
        <!-- list item -->       
    </div>
  
  </template>
  
  <script>
      import Swal from 'sweetalert2'
      import axios from 'axios'
  
    export default {
      data() {
        return {
            // search
            allMetode:['Semua','Tunai','Bon'],
            metode:'Semua',
            src: '',
            date: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)],
            menu: false,
            loading: true,
            
            // data
            allData:[],

            // list item
            dialog: false,
            fields:['KodeBarang','Item','Qty','Harga','Total'],
            items: [],    
        }
      },
      components:{

      },
      computed:{  
            dateRangeText () {
                return this.date.join(' ~ ')
            },        
            getRole(){
                return this.$store.state.userRole
            },
            totalPenjualan(){
                if(this.allData.length > 0){
                    let temp = 0

                    this.allData.forEach(element => {
                            temp += element.totalHarga
                    });

                    return temp
                }             
            },                       
      },    
      methods:{   
        getDate(str){
            if(str){                
                let arr = ''
                if(str.includes('T') === true){
                    arr =  str.split('T')
                }else{
                    arr =  str.split(',')
                }
                
                return arr[0]
            }
        },          
          closeCalender(){
            if(this.date.length === 2){
                this.menu = false
            }
          },           
          getRp(text){
            if(text){
                var number_string = text.toString()
                var sisa 	= number_string.length % 3,
                    rupiah 	= number_string.substr(0, sisa),
                    ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                        
                if (ribuan) {
                    text = sisa ? '.' : '';
                    rupiah += text + ribuan.join('.');
                }            
    
                return rupiah
            }
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
            openList(data){
                this.dialog = true
                this.items = data
            },
            fetchAllPembelian(){
                this.src = ''
                this.allData = []
                this.loading = true
                axios({
                    url: `${this.$store.state.url}/transaksi/pembelian?mulai=${this.date[0]}&akhir=${this.date[1]}`,
                    method: 'get',
                    headers:{
                        token : localStorage.getItem('token')
                    }
                })      
                        .then(({data})=>{                             
                            this.allData = data
                            this.loading = false
                        })
                        .catch(err=>{
                            console.log(err)
                        })          
            }                      
      },
      watch:{
                         
      },
      created(){
            this.fetchAllPembelian()
      }
    }
  </script>
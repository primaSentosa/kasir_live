<template>
    <div class="overflow-auto"> 
        <v-card max-width="auto" tile flat class="my-5">
        <v-toolbar color="" flat height="60px" >
        <v-spacer></v-spacer>
            <h2>Bon</h2>
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
            sm="2">
            <v-btn
                rounded
                color="#04428D"
                small
                dark
                style="margin-top: 10px;"
                @click.prevent="getByDate()"
                >
                Cari
                </v-btn>  
            </v-col>     
            
            <v-col
            cols="12"
            sm="5">        
                <v-card
                class="mx-auto"
                outlined
                max-width="344"
                >
                <v-card-text>
                    <h4>Total</h4>
                    <div class="text-h4" style="color: #000000;">
                    Rp 100.000.000
                    </div>
                </v-card-text>
                </v-card>        
            </v-col> 
        </v-row>            
        
        <!-- tabel bon -->
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
                    <h5>Customer</h5>
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
                <td>{{ item.tanggal }}</td>
                <td>{{ item.jam }}</td>
                <td>{{ item.admin.username }}</td>
                <td>{{ item.customer.nama }}</td>
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
        <!-- tabel bon -->

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
            allData:[
                {
                    _id: "631f56f4ecc69a787d71fe82",
                    tanggal: "2022-10-13",
                    jam: "13:52",
                    admin: {
                        username:'kasir 1 '
                    },
                    customer:{
                        nama: "Daniel evan"
                    },
                    metode: "Bon",
                    totalHarga:10000000,
                    listItem: [{
                            kodeBarang:"BR-1",               
                            nama:"barang 1",              
                            qty:10, 
                            harga:2000000                                 
                        }                                                               
                    ],
                    deskripsi:"tesssssssss"
                } 
            ],

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
            }           
      },    
      methods:{     
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
            }                      
      },
      watch:{
                         
      },
      created(){
 
      }
    }
  </script>
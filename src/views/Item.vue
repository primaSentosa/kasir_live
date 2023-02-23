<template>
    <div class="overflow-auto"> 
          <v-card max-width="auto" tile flat class="my-5">
            <v-toolbar color="" flat height="60px" >
            <v-spacer></v-spacer>
              <h2>Item</h2>
              <v-spacer></v-spacer>
                <v-chip
                class="ma-2"
                color="indigo darken-3"
                outlined
                >
                Total : {{getLength}}
                </v-chip>        
                <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="none()"
                style="margin-right: 10px;"
                >
                Import/Export
                </v-btn>                                   
                <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="openForm()"
                >
                Tambah Item
                </v-btn>  
            </v-toolbar>
          </v-card>   

          <v-row class="m-4">
            <!-- kategori -->
              <v-col
              cols="12"
              sm="2"
              >
                <p>Kategori:</p>
                <b-form-select
                    v-model="kategoriPilih"
                    :options="allKategori"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                ></b-form-select>
              </v-col>     
              <v-col
              cols="12"
              sm="2"
              >
                <p>Merk Mobil:</p>
                <b-form-select
                    v-model="merkMobilPilih"
                    :options="allMerkMobil"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                ></b-form-select>
              </v-col>     
              <v-col
              cols="12"
              sm="2"
              >
                <p>Merk Kaca:</p>
                <b-form-select
                    v-model="merkKacaPilih"
                    :options="allMerkKaca"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                ></b-form-select>
              </v-col>                   
            <!-- kategori -->

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

            <!-- search name -->
              <v-col
              cols="12"
              sm="3"
              >     
                <v-text-field
                    solo
                    label="Search By Name"
                    append-icon="mdi-magnify"
                    v-on:keyup.enter="search(1)"
                    class="mr-4 ml-4"
                    clearable
                    v-model="src"        
                ></v-text-field>
                </v-col>        
            <!-- search name -->              
          </v-row>      
          
          <!-- tabel item -->
           <v-simple-table
                fixed-header
                height="400px"
                v-if="loading === false"
            >            
                <template v-slot:default >
                <thead>
                    <tr>
                        <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Kode</h5>
                    </th>                        
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Nama</h5>
                    </th>
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Kategori</h5>
                    </th>
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Harga</h5>
                    </th>
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Stok</h5>
                    </th>                                        
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in allItem"
                    :key="item._id"
                    @click="openFormEdit(item)"
                    >           
                    <td>{{ item.kodeBarang }}</td>
                    <td>{{ item.nama }}</td>
                    <td v-if="item.kategori">{{ item.kategori.nama }}</td>
                    <td v-if="!item.kategori">-</td>
                    <td>Rp {{getRp(item.harga) }}</td>
                    <td>{{ item.stok }}</td>
                    
                    </tr>
                </tbody>
                </template>
            </v-simple-table>   
          <!-- tabel item -->
          
          <!-- loading -->
          <v-container style="height: 400px;" v-if="loading">            
            <v-row
                class="fill-height"
                align-content="center"
                justify="center"
            >
                <v-col cols="6">
                <v-progress-linear
                    color="black darken-2"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
                </v-col>
            </v-row>
          </v-container> 	
          <!-- loading -->


          <!-- form tambah item -->
            <v-dialog
            v-model="dialog"
            width="1000"      
            >      
            <b-overlay :show="loading2" rounded="sm">
            <v-card >
                <v-card-title class="text-h5 grey lighten-2 mb-4">
                Tambah Produk
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-text-field
                                v-model="nama"
                                label="Nama Barang"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="tambahItem()"
                            ></v-text-field>      
                        </v-col>
                        <v-col cols="12" md="2">                  
                            <v-text-field
                            label="Stok"
                            min="0"
                            v-model="stok"
                            suffix="pcs"
                            type=number                
                            v-on:keyup.alt="tambahItem()"                                           
                            ></v-text-field>
                        </v-col>
                    </v-row>    
     
                    <v-row>
                        <v-col cols="12" md="7">                  
                            <v-text-field
                            label="Harga"
                            v-model="harga"
                            prefix="Rp"              
                            v-on:keyup.alt="tambahItem()"                                             
                            ></v-text-field>
                        </v-col>                          
                        <v-col cols="12" md="5">
                            <v-text-field
                                v-model="kodeBarang"
                                label="Kode Barang"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="tambahItem()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>      
                    
                    <v-row>
                        <!-- kategori -->
                        <v-col
                        cols="12"
                        sm="2"
                        >
                            <p>Kategori:</p>
                            <b-form-select
                                v-model="kategoriPilih"
                                :options="allKategori"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                            ></b-form-select>
                        </v-col>     
                        <v-col
                        cols="12"
                        sm="2"
                        >
                            <p>Merk Mobil:</p>
                            <b-form-select
                                v-model="merkMobilPilih"
                                :options="allMerkMobil"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                            ></b-form-select>
                        </v-col>     
                        <v-col
                        cols="12"
                        sm="2"
                        >
                            <p>Merk Kaca:</p>
                            <b-form-select
                                v-model="merkKacaPilih"
                                :options="allMerkKaca"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                            ></b-form-select>
                        </v-col>                   
                        <!-- kategori -->                                                  
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                            outlined
                            name="input-7-4"
                            label="Deskripsi Barang"
                            v-model="deskripsi"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>

                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog = false"
                >
                    Batal
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="tambahItem()"
                >
                    Tambah
                </v-btn>
                </v-card-actions>
            </v-card>
            </b-overlay>
            </v-dialog>                 
          <!-- form tambah item -->

          <!-- form edit item -->
          <v-dialog
            v-model="dialog2"
            width="1000"      
            >      
            <b-overlay :show="loading2" rounded="sm">
            <v-card >
                <v-card-title class="text-h5 grey lighten-2 mb-4">
                Edit Produk
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-text-field
                                v-model="nama"
                                label="Nama Barang"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="editItem()"
                            ></v-text-field>      
                        </v-col>
                        <v-col cols="12" md="2">                  
                            <v-text-field
                            label="Stok"
                            min="0"
                            v-model="stok"
                            suffix="pcs"
                            type=number                
                            v-on:keyup.alt="editItem()"                                           
                            ></v-text-field>
                        </v-col>
                    </v-row>    
     
                    <v-row>
                        <v-col cols="12" md="7">                  
                            <v-text-field
                            label="Harga"
                            v-model="harga"
                            prefix="Rp"              
                            v-on:keyup.alt="editItem()"                                             
                            ></v-text-field>
                        </v-col>                          
                        <v-col cols="12" md="5">
                            <v-text-field
                                v-model="kodeBarang"
                                label="Kode Barang"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="editItem()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>      
                    
                    <v-row>
                        <!-- kategori -->
                        <v-col
                        cols="12"
                        sm="2"
                        >
                            <p>Kategori:</p>
                            <b-form-select
                                v-model="kategoriPilih"
                                :options="allKategori"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                            ></b-form-select>
                        </v-col>     
                        <v-col
                        cols="12"
                        sm="2"
                        >
                            <p>Merk Mobil:</p>
                            <b-form-select
                                v-model="merkMobilPilih"
                                :options="allMerkMobil"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                            ></b-form-select>
                        </v-col>     
                        <v-col
                        cols="12"
                        sm="2"
                        >
                            <p>Merk Kaca:</p>
                            <b-form-select
                                v-model="merkKacaPilih"
                                :options="allMerkKaca"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                            ></b-form-select>
                        </v-col>                   
                        <!-- kategori -->                                            
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                            outlined
                            name="input-7-4"
                            label="Deskripsi Barang"
                            :value="deskripsi"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>

                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog2 = false"
                >
                    Batal
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="editItem()"
                >
                    Edit
                </v-btn>
                <v-btn
                    color="red darken-1"
                    text
                    @click="deleteItem()"
                >
                    Delete
                </v-btn>                
                </v-card-actions>
            </v-card>
            </b-overlay>
            </v-dialog>                
          <!-- form edit item -->
    </div>
  
  </template>
  
  <script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import Swal from 'sweetalert2'
    import axios from 'axios'

  
    export default {
      data() {
        return {
            allKategori:[{ item: '-', name: '-' }],
            kategoriPilih:'-',
            allMerkKaca:[{ item: '-', name: '-' }],
            merkKacaPilih:'-',
            allMerkMobil:[{ item: '-', name: '-' }],
            merkMobilPilih:'-',

            // search
            src:'',

            // form + item
            dialog: false,
            dialog2:false,
            loading2: false,
            id: "",
            nama : "",
            harga: 0,
            stok: 0,
            kodeBarang: "",
            kategori: "",
            merkKaca: "",
            merkMobil: "",
            deskripsi: ""
        }
      },
      components:{

      },
      computed:{  
            ...mapGetters({
                allItem: 'item/getAllItem',
                totalItem: 'item/getTotalItem',
                loading: 'item/getLoading',
                getKategori: 'kategori/getKategori',
                getMerkMobil: 'kategori/getMerkMobil',
                getMerkKaca: 'kategori/getMerkKaca'
            }),          
            getRole(){
                return this.$store.state.userRole
            },
            getLength(){
                return this.allItem.length
            }           
      },    
      methods:{  
            ...mapMutations({
            fillData: 'item/fillData',
            fillTotal: 'item/fillTotal',  
            fillLoading: 'item/fillLoading'        
            }),            
            ...mapActions({
                fetchItem: 'item/fetchAction',
                fetchKetegori: 'kategori/fetchKategori',
                fetchMerkMobil: 'kategori/fetchMerkMobil',
                fetchMerkKaca: 'kategori/fetchMerkKaca'
            }),               
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
            openForm(){
                this.nama = ""
                this.harga = 0
                this.stok = 0
                this.kodeBarang = ""
                this.kategoriPilih = '-'
                this.merkMobilPilih = '-'
                this.merkKacaPilih = '-'
                this.deskripsi = ""                
                this.dialog = true
            },
            openFormEdit(item){       
                this.id = item._id
                this.nama = item.nama
                this.harga = this.getRp(item.harga)
                this.stok = item.stok
                this.kodeBarang = item.kodeBarang
                this.kategoriPilih = '-'
                this.merkMobilPilih = '-'
                this.merkKacaPilih = '-'
                if(item.kategori){
                    this.kategoriPilih = item.kategori._id
                }
                if(item.merkMobil){
                    this.merkMobilPilih = item.merkMobil._id
                }
                if(item.merkKaca){
                    this.merkKacaPilih = item.merkKaca._id
                }
                this.deskripsi = item.deskripsi
                this.dialog2 = true
            },
            search(page){          
                if(this.src === ''){
                        this.fetchItem(1,this.perPage)
                } else{
                    if(page === 1){
                    this.currentPage = 1
                    }         
                    this.fillLoading(true)
                    this.fillData([])
                    axios({
                    url: `${this.$store.state.url}/item/search2?src=${this.src}&page=${this.currentPage}&limit=10`,
                    method: 'get',
                    headers:{
                        token : localStorage.getItem('token')
                    }
                    })      
                        .then(({data})=>{               
                            this.fillTotal(data.Total)
                            this.fillData(data.results)
                            this.fillLoading(false)

                                                                        
                        })
                        .catch(err=>{
                            console.log(err)
                        })        
                }         
                },                    
            tambahItem(){

                this.loading2 = true
                let temp = {
                    nama: this.nama,
                    stok:this.stok,
                    harga: this.formatRupiahEsc(this.harga),
                    kodeBarang: '-',
                    deskripsi: this.deskripsi
                }
                
                if(this.kodeBarang !== ''){
                    temp.kodeBarang = this.kodeBarang
                }    
                
                if(this.kategoriPilih !== '-'){
                    temp.kategori = this.kategoriPilih
                }

                if(this.merkMobilPilih !== '-'){
                    temp.merkMobil = this.merkMobilPilih
                }

                if(this.merkKacaPilih !== '-'){
                    temp.merkKaca = this.merkKacaPilih
                }

                axios({
                    url: `${this.$store.state.url}/item`,
                    method: 'post',
                    headers:{
                        token : localStorage.getItem('token')
                    },
                    data:temp
                    })
                    .then(({data}) =>{
                        this.nama = ""
                        this.harga = 0
                        this.stok = 0
                        this.kodeBarang = ""
                        this.kategoriPilih = '-'
                        this.kategoriMerkMobil = '-'
                        this.kategoriMerkKaca = '-'                        
                        this.deskripsi = ""    
                        this.loading2 = false      
                        this.fetchItem(1,10)                        
                    })
                    .catch(err=>{
                            this.loading2 = false
                            console.log()
                            if(err.response.data.errors[0] === 'kode sudah terdaftar !'){
                                Swal.fire({
                                icon: 'error',
                                title: 'kode sudah terdaftar !',
                                text: err.errors,
                                })                        
                            }else{
                                Swal.fire({
                                icon: 'error',
                                title: 'isi data dengan lengkap !',
                                text: err.errors,
                                })         
                            }
                    })    
                
            },    
            editItem(){
                this.loading2 = true
                let temp = {
                    nama: this.nama,
                    stok:this.stok,
                    harga: this.formatRupiahEsc(this.harga),
                    kodeBarang: '-',
                    deskripsi: this.deskripsi
                }
                
                if(this.kodeBarang !== ''){
                    temp.kodeBarang = this.kodeBarang
                }    
                
                if(this.kategoriPilih !== '-'){
                    temp.kategori = this.kategoriPilih
                }

                if(this.merkMobilPilih !== '-'){
                    temp.merkMobil = this.merkMobilPilih
                }

                if(this.merkKacaPilih !== '-'){
                    temp.merkKaca = this.merkKacaPilih
                }

                  axios({
                        url: `${this.$store.state.url}/item/${this.id}`,
                        method: 'put',
                        headers:{
                            token : localStorage.getItem('token')
                        },
                        data:temp
                      })
                      .then(({data}) =>{                      
                        this.nama = ""
                        this.harga = 0
                        this.stok = 0
                        this.kodeBarang = ""
                        this.kategoriPilih = '-'
                        this.kategoriMerkMobil = '-'
                        this.kategoriMerkKaca = '-'                        
                        this.deskripsi = ""    
                        this.loading2 = false   
                        this.dialog2 = false   
                        this.fetchItem(1,10)  
                      })
                      .catch(err=>{
                          this.loading2 = false                  
                              console.log(err)
                              Swal.fire({
                              icon: 'error',
                              title: 'gagal !',
                              text: err.errors,
                              })                        
                      })                     
            },              
            deleteItem(){
                Swal.fire({
                    title: 'Apakah anda yakin akan menghapus?',
                    showDenyButton: true,
                    confirmButtonText: `Batal`,
                    denyButtonText: `Ya,Hapus`,
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                            
                    } else if (result.isDenied) {
                        axios({
                        url: `${this.$store.state.url}/item/${this.id}`,
                        method: 'delete',
                        headers:{
                            token : localStorage.getItem('token')
                        }
                        })
                        .then((respone) =>{
                            this.dialog2 = false
                            this.fetchItem(1,10)                        
                            Swal.fire('deleted!', '', 'success')
                        })                   
                    }
                })            
            }                
      },
      watch:{
            harga: function(){
                if(this.harga){
                var number_string = this.harga.replace(/[^,\d]/g, '').toString()
                var sisa 	= number_string.length % 3,
                    rupiah 	= number_string.substr(0, sisa),
                    ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                        
                if (ribuan) {
                    this.harga = sisa ? '.' : '';
                    rupiah += this.harga + ribuan.join('.');
                }            
    
                this.harga = rupiah
                } 
            },
            getKategori: function(){
                if(this.getKategori.length > 0){
                    this.getKategori.forEach(element => {
                        this.allKategori.push({ item: element._id, name: element.nama })
                    });
                }
            },
            getMerkMobil: function(){
                if(this.getMerkMobil.length > 0){
                    this.getMerkMobil.forEach(element => {
                        this.allMerkMobil.push({ item: element._id, name: element.nama })
                    });
                }
            },            
            getMerkKaca: function(){
                if(this.getMerkKaca.length > 0){
                    this.getMerkKaca.forEach(element => {
                        this.allMerkKaca.push({ item: element._id, name: element.nama })
                    });
                }
            },               
      },
      created(){
        this.fetchKetegori()
        this.fetchMerkMobil()
        this.fetchMerkKaca()
        this.fetchItem(1,10)
        console.log(this.loading)
      }
    }
  </script>
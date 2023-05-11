<template>
    <div class="overflow-auto"> 
          <v-card max-width="auto" tile flat class="my-5">
            <v-toolbar color="" flat height="60px" >
            <v-spacer></v-spacer>
              <h2>Customer</h2>
              <v-spacer></v-spacer>                                  
                <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="openForm()"
                >
                Tambah Customer
                </v-btn>  
            </v-toolbar>
          </v-card>   

          <v-row class="m-4">
            <!-- search name -->
              <v-col
              cols="12"
              sm="5"
              >     
                <v-text-field
                    solo
                    label="Search"
                    append-icon="mdi-magnify"
                    v-on:keyup.enter="search(1)"
                    class="mr-4 ml-4"
                    clearable
                    v-model="src"        
                ></v-text-field>
            <!-- search name -->              
              </v-col>        
          </v-row>      
          
          <!-- tabel customer -->
           <v-simple-table
                fixed-header
                height="400px"
            >
                <template v-slot:default >
                <thead>
                    <tr>                     
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Nama</h5>
                    </th>
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Alamat</h5>
                    </th>  
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Nomor Telp</h5>
                    </th>     
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Email</h5>
                    </th>                     
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Action</h5>
                    </th>                                                            
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in allCustomer"
                    :key="item._id"                    
                    >
                    <td>{{ item.nama }}</td>  
                    <td>{{ item.alamat }}</td>                    
                    <td>{{ item.noHp }}</td>  
                    <td>{{ item.email }}</td>                    
                    <td>
                      <v-btn
                      rounded                      
                      small
                      dark
                      @click.prevent="openFormEdit(item)"
                      >
                      EDIT
                      </v-btn>  
                      <!-- <v-btn
                      style="margin-left: 10px;"
                      rounded
                      color="#a30606"
                      small
                      dark
                      @click.prevent="deleteCust(item._id)"
                      >
                      DELETE
                      </v-btn>                         -->
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>   
          <!-- tabel customer -->

          <!-- form tambah customer -->
            <v-dialog
            v-model="dialog"
            width="1000"      
            >      
            <b-overlay :show="loading2" rounded="sm">
            <v-card >
                <v-card-title class="text-h5 grey lighten-2 mb-4">
                Tambah Customer
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-text-field
                                v-model="nama"
                                label="Nama"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="tambahItem()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>    
     
                    <v-row>   
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="email"
                                label="Email"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="tambahItem()"
                            ></v-text-field>      
                        </v-col>                                             
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="noHp"
                                label="Nomor Telp"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="tambahItem()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>      

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                            outlined
                            name="input-7-4"
                            label="Alamat"
                            v-model="alamat"
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
          <!-- form tambah customer -->

          <!-- edit Customer -->
          <v-dialog
                v-model="dialog2"
                width="1000"      
                >      
            <b-overlay :show="loading2" rounded="sm">
            <v-card >
                <v-card-title class="text-h5 grey lighten-2 mb-4">
                Edit Customer
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-text-field
                                v-model="nama"
                                label="Nama"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="editCust()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>    
     
                    <v-row>   
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="email"
                                label="Email"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="editCust()"
                            ></v-text-field>      
                        </v-col>                                             
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="noHp"
                                label="Nomor Telp"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="editCust()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>      

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                            outlined
                            name="input-7-4"
                            label="Alamat"
                            v-model="alamat"
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
                    @click="editCust()"
                >
                    Edit
                </v-btn>
                </v-card-actions>
            </v-card>
            </b-overlay>
            </v-dialog>               
          <!-- edit Customer -->          
    </div>
  
  </template>
  
  <script>
    import { mapActions, mapGetters } from 'vuex'
    import Swal from 'sweetalert2'
    import axios from 'axios'

  
    export default {
      data() {
        return {
            // search
            src:'',

            // form + item
            loading2: false,
            dialog: false,
            nama : "",
            noHp:"",
            email:"",
            alamat: "",

            // form edit
            dialog2: false,
            idTemp: "",
        }
      },
      components:{

      },
      computed:{  
        ...mapGetters({
                allCustomer: 'customer/getAllItem',
                totalCustomer: 'customer/getTotalItem',
                loading: 'customer/getLoading',
            }),                  
          getRole(){
            return this.$store.state.userRole
          }  
      },    
      methods:{     
            ...mapActions({
                fetchCustomer: 'customer/fetchAction',
            }),                 
            openForm(){
                this.dialog = true
            },
            tambahItem(){
                this.loading2 = true        
                axios({
                    url: `${this.$store.state.url}/customer`,
                    method: 'post',
                    headers:{
                        token : localStorage.getItem('token')
                    },
                    data:{
                        nama : this.nama,
                        alamat: this.alamat,
                        email: this.email,
                        noHp: this.noHp
                    }
                    })
                    .then(({data}) =>{
                        this.nama = ""
                        this.alamat = ""
                        this.email = ""
                        this.noHp = ""
                        this.loading2 = false      
                        this.fetchCustomer()                        
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
            openFormEdit(item){
                this.nama = item.nama
                this.alamat = item.alamat
                this.email = item.email
                this.noHp = item.noHp
                this.idTemp = item._id
                this.dialog2 = true
            },                
            editCust(){
                this.loading2 = true        
                axios({
                    url: `${this.$store.state.url}/customer/${this.idTemp}`,
                    method: 'put',
                    headers:{
                        token : localStorage.getItem('token')
                    },
                    data:{
                        nama : this.nama,
                        alamat: this.alamat,
                        email: this.email,
                        noHp: this.noHp
                    }
                    })
                    .then(({data}) =>{
                        this.nama = ""
                        this.alamat = ""
                        this.email = ""
                        this.noHp = ""
                        this.loading2 = false      
                        this.fetchCustomer()   
                        this.dialog2 = false                     
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
            deleteCust(id){
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
                        url: `${this.$store.state.url}/customer/${id}`,
                        method: 'delete',
                        headers:{
                            token : localStorage.getItem('token')
                        }
                        })
                        .then((respone) =>{
                            if(this.src !== ''){
                              this.search()
                            }else{
                              this.fetchCustomer()       
                            }
                            Swal.fire('deleted!', '', 'success')
                        })                   
                    }
                })            
            }                         
      },
      watch:{
                        
      },
      created(){
            this.fetchCustomer()
      }
    }
  </script>
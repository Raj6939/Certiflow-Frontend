<template>
    <div>
      <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
      <b-modal v-model="show" id="invite-modal" hide-footer ref="modal-1" title="Invite Admin" centered>    
    <div class="row g-3 align-items-center w-100  mt-4">
            <div class="col-lg-3 col-md-3 text-left">
                <label for="email" class="col-form-label">Email Id :</label>
            </div>
            <div class=" col-lg-9 col-md-9 px-0">
                <input v-model="admin.emailId" type="text" placeholder="john@gmail.com" id="email" class="form-control w-100" >
            </div>   
    </div>
    <div class="row g-3 align-items-center w-100  mt-4">
            <div class="col-lg-3 col-md-3 text-left">
                <label for="email" class="col-form-label">Name :</label>
            </div>
            <div class=" col-lg-9 col-md-9 px-0">
                <input v-model="admin.name" type="text" placeholder="john" id="name" class="form-control w-100" >
            </div>               
    </div>
    <div class="row g-3 align-items-center w-100  mt-4">
      <b-button @click="sendInvite">Send</b-button>
    </div>
  </b-modal>   
    <b-card no-body>          

        <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Admin DIDs </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <b-button variant="primary" @click="inviteAdmin">Invite</b-button>
      </b-col>
    </b-row>

         <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="adminArray"      
    >
      <el-table-column label="Admin Name" min-width="310px" prop="adminArray">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span>{{ row.name }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Admin Email" min-width="310px" prop="adminArray">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span>{{ row.emailId }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Status" min-width="140px">
        <!-- <template v-slot="{ row }">
          <div class="avatar-group">
            <badge class="badge-dot mr-4 bg-white" type="">
                        <i :class="`bg-${row.status}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                    </badge>
          </div>
        </template> -->
      </el-table-column>

      <el-table-column label="Action" min-width="190px">
        <template>
          <div class="avatar-group">
            <el-dropdown trigger="click" class="dropdown">
                    <span class="btn btn-sm btn-icon-only ">
                      <i class="fas fa-ellipsis-v mt-2 text-dark"></i>
                    </span>
                        <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                            <b-dropdown-item><i class="fas fa-edit"></i>Edit Admin Profile</b-dropdown-item>
                            <b-dropdown-item><i class="fa fa-trash"></i> Remove Admin</b-dropdown-item>                            
                        </el-dropdown-menu>
                    </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
  </div>
</template>
<script> 
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  import toast from "../../../util/toast"
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      Loading
    },  
    data() {
      return {        
        currentPage: 1,
        isLoading:false,
        fullPage:true,
        admin:{
          emailId:'',
          name:'',
          issuerDID:'did:hid:testnet:zg2SBqaV2reovA27CAhTz3wbboWRGeDrrabY2i9Yic4y'
        }        
      };
    },
    computed:{
      ...mapState({
        adminArray:(state)=>state.adminArray
      })
    },
    mounted() {
      this.getAllAdmin()
    },
    methods:{
      ...mapActions("issuerStore",[
        "addAdmin",
        "getAllAdmin"
      ]),
      inviteAdmin(){
        console.log('in invite')        
        this.$root.$emit('bv::show::modal', 'invite-modal')
      },
      async sendInvite(){
        try {
          if(this.admin.emailId!==''||this.admin.name!==''){
          this.isLoading = true
          const resp = await this.addAdmin(this.admin)
          console.log(resp)
          if(resp){
            this.toast('Successfuly Sent Invite','success')
            this.admin = {
              name:'',
              emailId:'',
              issuerDID:'did:hid:testnet:zg2SBqaV2reovA27CAhTz3wbboWRGeDrrabY2i9Yic4y'
            }
          }          
        }
        } catch (error) {
          this.toast(error,'error')
        } finally {
          this.isLoading = false
        }        
      }
    },
    mixins:[toast]
  };
</script>


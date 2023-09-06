<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Issuer Profile </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <b-button variant="primary" @click="updateProfile">Save</b-button>
      </b-col>
    </b-row>

    <b-form>
      <h6 class="heading-small text-muted mb-4">Issuer information</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Name"
              placeholder="Your Name Name"
              v-model="issuer.name"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="email"
              label="Email address"
              placeholder="Your Email address"
              v-model="issuer.emailId"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="DID"
              placeholder="DID"
              disabled="true"
              v-model="issuer.did"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Domain"
              placeholder="ex. www.yourdomain.com"
              v-model="issuer.domainUrl"
            >
            </base-input>            
      
          </b-col>
          <h6 class="heading-small text-muted mb-4">About me</h6>      
        
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea rows="4" v-model="issuer.about" id="about-form-textaria" placeholder="A few words about you ..."></b-form-textarea>
        
        </b-row>
      </div>
      <hr class="my-4">

      <!-- Admin table -->
      <h6 class="heading-small text-muted mb-4">Administrative information</h6>
      <!--  -->
      <issuer-table></issuer-table>
      <hr class="my-4">
      <!-- Description -->      

    </b-form>
  </card>
</div>
</template>
<script>
// import LightTable from '../../Tables/RegularTables/LightTable.vue';
import IssuerTable from "../../Tables/RegularTables/IssuerTable.vue"
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
import toast from "../../../util/toast"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components:{ 
    IssuerTable,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    Loading
  },
  data() {
    return {
      isLoading:false,
      fullPage:true,
      issuer: {        
        name: '',
        emailId: '',
        did:'',
        domainUrl:'',        
        about: ''
      }
    };
  },
  methods: {
  async updateProfile() {
      try {
        this.isLoading = true
        const url = 'http://localhost:3000/create/issuer'
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body:JSON.stringify(this.issuer)
        }
        const res = await fetch(url,options)
        console.log(res)
        if (res.status == 200) {
          this.toast('Profile successfully updated!','success')
          this.resetIssuerFields()
        }      
      } catch (error) {
        console.log('in catch')
        console.log(error)
        this.toast(error,'error')
      } finally {
        this.isLoading = false
      }      
    },
    resetIssuerFields(){
      let issuer = {
        name: '',
        emailId: '',
        did:'',
        domainUrl:'',        
        about: ''
      }
      this.issuer = issuer
    }
  },
  mixins:[toast]
};
</script>
<style></style>

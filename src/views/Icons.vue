<template>
  <div>    
       <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-md-5 bg-gradient-success">
      <!-- Card stats -->   
      <b-breadcrumb  style="background-color: transparent;">   
    <b-breadcrumb-item to="/tables">
      <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>      
      Issued Certificates</b-breadcrumb-item>
    <b-breadcrumb-item active>Schema</b-breadcrumb-item>    
  </b-breadcrumb>  
    </base-header>
    
    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">          
          <schema-table :schemaTypes="schemaTypes"></schema-table>              
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BaseHeader from '@/components/BaseHeader';
  import axios from "axios"
  import schemaTypes from './Tables/schemaTypes';
  import SchemaTable from './Tables/RegularTables/SchemaTable.vue';
  Vue.use(VueClipboard)
  export default {
    name: 'Icons',
    components: {
      BaseHeader,
      SchemaTable
    },
    data(){
      return{
        schemaTypes,
        certDetails:{
          certName:'',
          issuerName:'',
          recipientName:'',
          recipientEmail:'',
          issuanceDate: ''
        },
        imgS:'',
        name:'Raj',
        edit:false,
        isPreview:false
      }
    },        
    mounted(){
    },
    methods: {
      async save(){
     const data = await axios({
          method: 'post',
          url: 'http://localhost:3000/send/email',
          data: this.certDetails
        });             
        console.log(data)
        this.$notify({
          type: 'success',
          message: 'Successfully send certificate'
        })
      },
      closePreview(){
        this.isPreview = false
      },
      previewOpen () {      
        this.isPreview = true        
      },
      openSlider () {        
        this.certDetails = {
          certName:'',          
          recipientName:'',
          issuerName:'',
          recipientEmail:'',
          issuanceDate: ''
        },
        this.$root.$emit("bv::toggle::collapse", "sidebar-right");
      },
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      },           
    }
  };
</script>
<style></style>

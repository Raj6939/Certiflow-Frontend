<template>   
  <b-card no-body>
    <!-- <b-sidebar id="sidebar-right" right shadow width="40%" :title="isPreview ? 'Preview Certificate' : 'Configure Certificate'">                        
  
        <div class="form-group mt-2" v-if="!isPreview">
          <b-button variant="primary" @click="previewCert">Preview</b-button>          
        </div>
      </div>
      <div class="container" v-else>
        <div class="form-group">          
          <label for="orgName"><strong>Certificate Name<span style="color: red">*</span>:</strong></label>
          <input type="text" class="form-control" v-model="certDetails.certName" id="certName"
            placeholder="Enter certificate name">
        </div>

        <div class="form-group">          
          <label for="orgName"><strong>Subject Name<span style="color: red">*</span>:</strong></label>
          <input type="text" class="form-control" v-model="certDetails.recipientName" id="certName"
            placeholder="Enter Subject name">
        </div>

        <div class="form-group">          
          <label for="orgName"><strong>Subject Email Id<span style="color: red">*</span>:</strong></label>
          <input type="text" class="form-control" v-model="certDetails.recipientEmail" id="certName"
            placeholder="Enter Subject Email">
        </div>

        <div class="form-group">          
          <label for="orgName"><strong>Issuance Date<span style="color: red">*</span>:</strong></label>
          <input type="date" class="form-control" v-model="certDetails.issuanceDate" id="certName"
            placeholder="Enter Subject Email">
        </div>  

        <div class="form-group">         
          <label for="orgName"><strong>Issued By<span style="color: red">*</span>:</strong></label>
          <input type="text" class="form-control" v-model="certDetails.issuerName" id="certName"
            placeholder="Enter Subject Email">
        </div>                 
  
        <div class="form-group">
          <b-button variant="primary" @click="previewCert">Preview</b-button>
          <b-button variant="primary" @click="generateCanvas">Save</b-button>
        </div>
      </div>
    </b-sidebar> -->

    <b-sidebar id="sidebar-right" right shadow width="40%" :title="isPreview ? 'Preview Certificate' : 'Configure Certificate'">        
      <div class="mt-2" style="height: 3rem;" v-if="isPreview">
              <b-button  variant="danger" style="float:right" @click="closePreview" >Close</b-button>            
            </div>         
      <degree-certificate v-if="isPreview" :certDetails="certDetails"></degree-certificate>
      
        <div class="container" v-if="!isPreview">
                <div class="form-group row">
                  <div class="col-md-12">
                    <form style="padding: 5px" v-if="issueCredAttributes.length">                   
                    <div class="form-group" v-for="attr in issueCredAttributes" :key="attr.name">
                      <label for="schDescription"><strong>{{ capitaliseString(attr.name,30) }}<span v-if="attr.required===true" style="color: red">*</span>:</strong></label>
                      <input :type="attr.type==='date'? 'date': 'text'" class="form-control"                                            
                         />
                    </div>                                                                          
                  </form>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">                    

                    <input type="file" @change="onFileChange" accept=".csv" />

                    <b-button variant="link" @click="downloadSampleSheet">Download Sample Sheet</b-button>   
                    <hr />                     
                    <b-button                                                            
                      class="ml-auto mt-4"
                      @click="save"
                      variant="primary"
                    >
                    Save
                    </b-button>                    
                  </div>
                </div>
              </div>       
    </b-sidebar>

    <base-header class="pb-6 pb-8 pt-md-5 bg-gradient-success">      
      <b-breadcrumb class="mt-4" style="background-color: transparent;">
        <b-breadcrumb-item to="/tables">
            <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
            Issued Certificates</b-breadcrumb-item>
        <b-breadcrumb-item to="/tables/icons">Schema</b-breadcrumb-item>
        <b-breadcrumb-item active>Design</b-breadcrumb-item>
      </b-breadcrumb>      
    </base-header>
    <b-container fluid class="mt--7 mb-4">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <div class="mb-2 d-flex">
            <b-card
              :img-src="getSelectedSchemaType.imgLink"
              :title="getSelectedSchemaType.schemaName"              
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem"
              class="text-center p-4"
            >            
              <div class="text-center">
                <b-button href="javascript:;" variant="primary"
                @click="openPreviewFromCard"
                  >Preview</b-button
                >
                <b-button href="javascript:;" variant="primary"
                @click="openSlider"
                  >Use Design</b-button
                >
              </div>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <!-- <b-card-footer class="d-flex justify-content-end">
        <base-pagination
          v-model="currentPage"
          :per-page="5"
          :total="0"
        ></base-pagination>
      </b-card-footer> -->
  </b-card>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import BaseHeader from "@/components/BaseHeader";
import { BBreadcrumb } from "bootstrap-vue";
import { mapActions, mapGetters } from 'vuex';
import FileDownload from "js-file-download";
import toast from "../util/toast";
import DegreeCertificate from './previewTemplates/DegreeCertificate.vue';
import {UNIVERSITY_CERTIFICATE,EVENT_PASS_SCHEMA} from "../util/hsConstants"
export default {
  name: "design",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BaseHeader,
    BBreadcrumb,
    DegreeCertificate
  },  
  data() {
    return {    
    expiryDateTime:null,    
      currentPage: 1,      
        certDetails:{
          certName:'',
          issuerName:'',
          recipientName:'',
          recipientEmail:'',
          issuanceDate: ''
        },
        fileinput: '',
        jsonData: [],
        allFields:[],
        issueCredAttributes:[],
        isEdit:false,
        isPreview:false,
        fieldNames: [],
        schemaID:null,
      }    
  },
  async mounted(){
    // await this.renderCredAttributes()    
    if(this.getSelectedSchemaType===null){
      this.$router.go(-1);

    }
    // else{
    //   this.$router.push('icons')
    // }
  },
  computed:{
    ...mapGetters("issuerStore", ["getSelectedSchemaType"]),
  },
  methods: {      
    ...mapActions("issuerStore",[
          "resolveSchema",          
        ]),
        capitaliseString(string) {
      const spaced = string.replace(/([a-z])([A-Z])/g, '$1 $2');
      return spaced.charAt(0).toUpperCase() + spaced.slice(1);
    },
    async save(){
      const url = 'http://localhost:3000/send/email'
      console.log('in save')
      console.log(this.getSelectedSchemaType)            
      const  dataToSend = {
          schemaId : this.getSelectedSchemaType.schemaId,
          recipientDetails:this.jsonData
        }     
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend)
      }
      const res = await fetch(url,options)
      console.log(res)      
      console.log(res)
      if(res.status ===200){
        console.log('okay')
        this.toast('Certificates Sent Successfully','success')
      }
      
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const file = files[0];
      this.readCsvFile(file);
    },
    readCsvFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target.result;
        const lines = csvContent.split('\n');
        const header = lines[0].split(',');

        const jsonData = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length !== header.length) continue;

          const rowObject = {};
          for (let j = 0; j < header.length; j++) {
            rowObject[header[j]] = values[j];
          }
          jsonData.push(rowObject);
        }

        this.jsonData = jsonData;
      };
      reader.readAsText(file);
    },
    downloadSampleSheet() {
      FileDownload(this.fieldNames, 'Certificate.csv');
    },
    async openSlider () {  
      this.isPreview = false      
      this.jsonData = []
        this.certDetails = {
          certName:'',          
          recipientName:'',
          issuerName:'',
          recipientEmail:'',
          issuanceDate: ''
        },        
        this.$root.$emit("bv::toggle::collapse", "sidebar-right");
        await this.renderCredAttributes()        
      },
    previewModal(id) {
      console.log(id);
    },
    // openSlider(id) {
    //   console.log(id);
    //   this.$router.push("icons/design");
    // },
    async renderCredAttributes(){    
      this.issueCredAttributes = [];
      const result = await this.resolveSchema()      
      this.allFields = JSON.parse(result.schema.properties)        
      const requiredFields = result.schema.required;
      console.log(requiredFields)
      this.fieldNames = requiredFields
      for (const e of Object.entries(this.allFields)) {
        let dataToPush = {
          type: e[1].type,
          name: e[0],
        };
        switch (e[1].type) {
          case "boolean":
            dataToPush["value"] = null;
            break;
          case "string":
            dataToPush["value"] = "";
            break;
          case "number":
            dataToPush["value"] = "";
            break;
          case "integer":
            dataToPush["value"] = "";
            break;
          case "date":
            dataToPush["value"] = "";
            break;
          default:
            console.log("invalid type", "error");
        }
        this.issueCredAttributes.push(dataToPush);
      }
      console.log(this.issueCredAttributes)
      this.issueCredAttributes.map((x) => {
        if (requiredFields.includes(x.name)) {
          x["required"] = true;
        } else {
          x["required"] = false;
        }
      });
    },
    openPreviewFromCard(){    
        this.$root.$emit("bv::toggle::collapse", "sidebar-right");
        this.isPreview = true   
    },
    previewCert(){
        this.isPreview = true
    },
    closePreview(){
        this.isPreview = false
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
  },
  mixins:[toast]
};
</script>
<style>
.el-table__row:hover {
  cursor: pointer;
}
</style>

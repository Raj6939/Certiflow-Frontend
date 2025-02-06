<template>
  <div>
    <b-sidebar id="sidebar-right" right shadow width="40%" :title="edit ? 'Edit Application' : 'Add Student Details'">
      <div class="container"  v-if="isPreview">        
            <b-card-header header-tag="header" class="p-1 border-0 accordin-header accordion-header-theme"  role="tab">
              <b-button class="primary" style="float: right;" @click="closePreview">Close</b-button>
              <!-- <b-button variant="info" style="float:right" class="bg-transparent border-0 text-left theme-color"
                title="Close" @click="closePreview">
                <i class="fas fa-close">Close</i>
              </b-button> -->
            </b-card-header>
            
            <div class="cred-card-body" style="padding: 12px; color: rgb(80, 54, 101); font-size: small;">
          <div class="container" align="center">
            <table class="cert" style="border: 5px solid #b2bbc1; border-right: 5px solid #b2bbc1; border-left: 5px solid #b2bbc1; width: 90%; font-family: arial; color: rgb(80, 54, 101);">
              <tr>
                <td align="center" class="crt_logo">
                <img src="../assets/hypersign.jpg" class="mt-2" width="60px" height="60px" alt="logo">

                </td>
              </tr>
              <tr>
                <td align="center">      
                  <h1 class="crt_title" style="margin-top: 5px; letter-spacing: 1px; color: rgb(80, 54, 101) !important;">{{ certDetails.certName ? certDetails.certName : '{ Certificate Name}' }}</h1>
                  <h2 style="font-size: larger; color: rgb(80, 54, 101);">CERTIFICATE</h2>
                  <p style="margin-bottom: 0;">This Certificate is awarded to</p>
                  <h3>{{ certDetails.subName ? certDetails.subName : '{ Subject Name }' }}</h3>
                  <h1 class="crt_user" style="font-family: 'Satisfy', cursive; font-size: 40px; margin-top: 0; margin-bottom: 0;">{{ certDetails.subName }}</h1>                  
                  <p style="margin-bottom: 0;">for succuessfully participated in {{ certDetails.certName ? certDetails.certName : '{ Certificate Name }' }}</p>
                  <div style="display: flex;">
                  <div style="display: inline; text-align: center;">
                    <h4 style="margin-right: auto;" class="ml-4 mr-4 mt-4">Issued By</h4>
                    <span class="mb-2">{{ certDetails.issuerName? certDetails.issuerName:`{ Issuer Name }` }}</span>
                  </div>
                  <div style="margin-left: auto; text-align: center;">
                    <h4 class="mr-4 mt-4">Date</h4>
                    <span class="mr-4">{{ certDetails.issuedDate ? certDetails.issuedDate : '{ issued Date }' }}</span>
                  </div>
                </div>
                </td>
                <tr>
              </tr>
              </tr>      
            </table>
          </div>
        </div>
                  
  
        <!-- <div class="form-group">
          <b-button class="primary" @click="previewOpen">Preview</b-button>
          <b-button class="primary">Save</b-button>
        </div> -->
      </div>
      <div class="form-group" v-if="csvFile!=null">
          <b-button class="primary" @click="previewOpen">Preview</b-button>
          <b-button class="primary" @click="save">Save</b-button>
        </div>
      <div>    
    <input type="file" @change="handleFileUpload" accept=".csv" />
    <button @click="parseCSV" class="btn btn-success mt-3">Parse CSV</button>    
    <h3>Parsed JSON Data</h3>
    <pre>{{ jsonData }}</pre>
  </div>        
    </b-sidebar>
       <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-md-5 bg-gradient-success">
      <!-- Card stats -->
     
    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <h3 slot="header" class="mb-0">Design</h3>
            <b-row class="icon-examples">
              <b-col lg="3" md="6">
                <p>Select Design Template</p>
                <div class="text-center mt-4">                  
                <b-card
                  title="Course Completion Certificate"
                  img-src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/img-1-1000x600.jpg"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-2"
                >
                  <b-card-text>
                    Simple Course Completion Certificate template
                  </b-card-text>                
                    <b-button variant="primary" @click="openSlider" >Certificate</b-button>               
                </b-card>              
              </div>
              </b-col>             
            </b-row>              
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import config from '../config'
  import Vue from 'vue'
  import axios from "axios"
  import Papa from "papaparse"
  import VueClipboard from 'vue-clipboard2'
  import BaseHeader from '@/components/BaseHeader';
  import logoImage from "../assets/hypersign.jpg"
  import html2canvas from "html2canvas"  
  // import CreativeEditorSDK from '@cesdk/cesdk-js';  
  // import CreativeEngine from "@cesdk/engine"
  Vue.use(VueClipboard)
  export default {
    name: 'icons',
    components: {
      BaseHeader
    },
    data(){
      return{
        csvFile:null,
        jsonData: [],
        certDetails:{},        
        imgS:'',
        name:'Raj',
        edit:false,
        isPreview:false
      }
    },        
    mounted(){
    },
    methods: {
      closePreview(){
        this.isPreview = false
      },
      previewOpen () {
        this.isPreview = true        
      },
      async save(){
        console.log('hi')
        console.log(config)
        this.certDetails = {schemaId:"sch:hid:testnet:z6MkkipnHwpLmMHiQRdVaqRA1RwrQJcoP8ZDnm8Tqszreju5:1.0",recipientDetails:[...this.jsonData]}
     const data = await axios({
          method: 'post', 
          url: "https://certiflow-backend-production.up.railway.app/send/email",
          data: this.certDetails
        });             
        console.log(data)
        this.$notify({
          type: 'success',
          message: 'Successfully send certificate'
        })
      },
    handleFileUpload(event) {
      this.csvFile = event.target.files[0];
  },
  parseCSV() {
  if (this.csvFile) {
    Papa.parse(this.csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Filter and transform rows
        this.jsonData = results.data
          .filter((row) => {
            // Filter out rows where all values are empty
            return Object.values(row).some(value => value.trim() !== "");
          })
          .map((row) => {
            // Convert date fields to ISO 8601 format
            if (row.dateOfBirth) {
              row.dateOfBirth = this.convertToISO(row.dateOfBirth);
            }
            if (row.degreeEarnedDate) {
              row.degreeEarnedDate = this.convertToISO(row.degreeEarnedDate);
            }
            return row;
          });
        
        console.log(this.jsonData);  // Display JSON data in console
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
      }
    });
  } else {
    alert('Please upload a CSV file');
  }
},
// Helper function to convert date to ISO 8601 format
convertToISO(dateString) {
  const parts = dateString.split('/');
  // Check if the date has exactly three parts and that they’re numbers
  if (parts.length !== 3) {
    console.error("Invalid date format, expected MM/DD/YYYY");
    return null;
  }
  
  const [month, day, year] = parts;
  // Validate month, day, and year values
  if (isNaN(month) || isNaN(day) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31 || year.length !== 4) {
    console.error("Invalid date components");
    return null;
  }
  // Construct the date string in YYYY-MM-DD format for compatibility with the Date constructor
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T18:30:00Z`;
  // Convert to ISO string format
  const date = new Date(formattedDate);
  if (isNaN(date.getTime())) { // Check if date is invalid
    console.error("Failed to parse date:", formattedDate);
    return null;
  }
  
  return date.toISOString();
},
      openSlider () {        
        this.certDetails = {
          certName:'',
          issuerName:'',
          subName:'',
          issuerName:'',
          subEmail:''
        },
        this.$root.$emit("bv::toggle::collapse", "sidebar-right");
      },
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      },
      generateCan(){      
      },
      async generateCertificate(element) {
      console.log(element)
        try {
          const canvas = await html2canvas(element);
          console.log(canvas)
          // Convert canvas to PNG image data
          const imageData = canvas.toDataURL();       
          return imageData
        } catch (error) {
          console.error('Error generating certificate:', error);
        }
      },
      async createTemplate(){
        var div = document.createElement('div');
        div.style.width = '717px';
        div.style.height = '1224px';
        div.innerHTML = 
        `<div class="cred-card-body" style="padding: 12px; color: rgb(80, 54, 101); font-size: small;">
          <div class="container" align="center">
            <table class="cert" style="border: 5px solid #b2bbc1; border-right: 5px solid #b2bbc1; border-left: 5px solid #b2bbc1; width: 100%; font-family: arial; color: rgb(80, 54, 101);">
              <tr>
                <td align="center" class="crt_logo">
                <img src="${logoImage}" style="margin-top:5px;" width="30px" height="30px" alt="logo">

                </td>
              </tr>
              <tr>
                <td align="center">      
                  <h1 class="crt_title" style="margin-top: 5px; letter-spacing: 1px; color: rgb(80, 54, 101) !important;">SSI Workshop</h1>
                  <h2 style="font-size: larger; color: rgb(80, 54, 101);">CERTIFICATE</h2>
                  <p style="margin-bottom: 0;">This Certificate is awarded</p>
                  <h1 class="crt_user" style="font-family: 'Satisfy', cursive; font-size: 40px; margin-top: 0; margin-bottom: 0;">Raj</h1>
                  <h3 class="afterName" style="font-weight: 100; color: rgb(80, 54, 101); margin-top: 0; margin-bottom: 0;">For participating in UVCE HAck<br> organized by <br> UVCE</h3>
                  <h3 style="margin-bottom: 0;">Awarded as 1st</h3>
                  <div style="display: flex;">
                  <div style="display: inline; text-align: center;">
                    <h3 style="margin-right: auto;" class="ml-4">Organizer</h3>
                    <span>UVCE</span>
                  </div>
                  <div style="margin-left: auto; text-align: center;">
                    <h3 class="mr-4">Date</h3>
                    <span>15-08-2023</span>
                  </div>
                </div>
                </td>
                <tr>
              </tr>
              </tr>      
            </table>
          </div>
        </div>`;
        document.body.appendChild(div);

        // Create a canvas element
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);

        const getCanvas = await this.generateCertificate(div)
        console.log(getCanvas)
        document.body.removeChild(canvas);
        document.body.removeChild(div);
        this.imgS = getCanvas
      }
    }
  };
</script>
<style></style>

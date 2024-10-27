<template>
    <div>
      <!-- Header -->
      <div class="header bg-gradient-success py-lg-7">
        <b-container>
      <div class="header-body text-center">            
        <div class="cred-card-body" style="padding: 12px; color: rgb(80, 54, 101); font-size: small;">
          <div class="container" align="center">
            <table class="cert" ref="credCardBody" style="border: 5px solid; min-height: 30rem; #b2bbc1; border-right: 5px solid #b2bbc1; border-left: 5px solid #b2bbc1; width: 90%; font-family: arial; color: rgb(80, 54, 101); background-color: white;">
              <tr>
                <td align="center" class="crt_logo">
                <img src="../../assets/hypersign.jpg" class="mt-2" width="100px" height="100px" alt="logo">

                </td>
              </tr>
              <tr>
                <td align="center">      
                  <h1 class="crt_title" style="letter-spacing: 1px; color: rgb(80, 54, 101) !important;">{{ vcDetails.degreeName }}</h1>
                  <h2 style="font-size: larger; color: rgb(80, 54, 101);">CERTIFICATE</h2>
                  <p style="margin-bottom: 0;">This Certificate is awarded to</p>                  
                  <h1 class="crt_user" style="font-family: 'Satisfy', cursive; font-size: 40px; margin-top: 0; margin-bottom: 0;">{{ vcDetails.recipientFullName }}</h1>                  
                  <p style="margin-bottom: 0;">for succuessfully completing {{ vcDetails.degreeType }} in {{ vcDetails.degreeName }} </p>
                  <div style="display: flex;">
                  <div style="display: inline; text-align: center;">
                    <h4 style="margin-right: auto;" class="ml-4 mr-4 mt-4">Issued By</h4>
                    <span class="mb-2">{{ vcDetails.issuerName }}</span>
                  </div>
                  <div style="margin-left: auto; text-align: center;">
                    <h4 class="mr-4 mt-4">Date</h4>
                    <span class="mr-4">{{ new Date(vcDetails.issuanceDate).toDateString() }}</span>
                  </div>
                </div>
                </td>
                <tr>
              </tr>
              </tr>      
            </table>
          </div>
        </div>
        <b-row class="justify-content-center">
              <b-col xl="5" lg="6" md="8" class="px-5">                
                <p class="text-lead text-white">Download your Verifiable Certificate here!</p>                                    
                  <b-dropdown id="dropdown-1" text="Download" class="m-md-2" variant="primary">
                    <b-dropdown-item @click="createPdf('pdf')">PDF</b-dropdown-item>
                    <b-dropdown-item @click="createPdf('png')">PNG</b-dropdown-item>                                        
                  </b-dropdown>
              </b-col>
            </b-row>
          </div>
          <!-- <event-pass></event-pass> -->
<!-- <degree-certificate :certDetails="vcDetails"></degree-certificate> -->
        </b-container>
        
      </div>      
   
    </div>
  </template>
  <script>
const jwt = require('jsonwebtoken');
import html2canvas from "html2canvas";
import { PDFDocument, StandardFonts } from 'pdf-lib'
import toast from "../../util/toast";
import { mapActions, mapState } from "vuex"
import EventPass from '../Pages/EventPass.vue';
import DegreeCertificate from '../Pages/DegreeCertificate.vue';
import JSZip from 'jszip';
    export default {
      components:{ EventPass, DegreeCertificate},
      data() {
        return {
          tokenDetails:null,
          jwtToken:null,
          vcDetails:null,
          showCert:false
        };
      },
      computed:{
        ...mapState({
          didDoc:(state) => state.issuerStore.didDoc,
          issuedVC:(state) => state.issuerStore.issuedVC
        })
      },
      async mounted(){
        this.authenticateEntity()
        console.log(this.$route.query.jwt)    
        this.jwtToken = this.$route.query.jwt
        this.tokenDetails = jwt.decode(this.jwtToken)
        console.log(this.tokenDetails)
        this.vcDetails = this.tokenDetails.vcAttributes
        console.log(this.vcDetails)
      },
      methods: {
        ...mapActions("issuerStore",[
          "authenticateEntity",
          "generateDIDDoc",
          "issueCredential"
        ]),
        


  async createPdf(id) { 
    try {
      const issueCert = await this.downloadCert()  
      console.log(issueCert)
      const zip = new JSZip(); 
      const blobData = new Blob([JSON.stringify(issueCert)], { type: 'application/json' });      
    if(issueCert.credentialDocument && id === 'pdf'){
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add a blank page to the document
      const page = pdfDoc.addPage();

      // Convert the canvas to an image data URL
      const canvas = await html2canvas(this.$refs.credCardBody);
      const imageDataURL = canvas.toDataURL('image/png');

      // Load the image data URL into the PDF document
      const image = await pdfDoc.embedPng(imageDataURL);

      // Get the dimensions of the image and calculate its position on the page
      const imageSize = image.scale(0.5); // You can adjust the scale as needed
      const imagePosition = page.getSize().height - imageSize.height - 50;

      // Draw the image on the page
      page.drawImage(image, {
        x: 50,
        y: imagePosition,
        width: imageSize.width,
        height: imageSize.height,
      });

      // Save the PDF document
      const pdfBytes = await pdfDoc.save();

      // Trigger the browser to download the PDF document
      // this.download(pdfBytes, 'certificate.pdf', 'application/pdf');
      zip.file('certificate.pdf', pdfBytes);      
      this.showCert = true
      this.toast('Downloaded Successfully','success')
    } 
    else if(issueCert.credentialDocument && id === 'png'){
      const imgLink = this.generateCanvas()
      zip.file('certificate.png', imgLink);
      this.toast('Downloaded Successfully','success')
    }
    zip.file('credential.json',blobData)
    const zipBlob = await zip.generateAsync({ type: 'blob' });    
    this.download(zipBlob, 'certificate.zip', 'application/zip');
    } catch (error) {
      this.toast(error,'error')
    }    
    
  },
        
        ///////////////////

        download(data, filename, type) {
          const blob = new Blob([data], { type });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        },
        async downloadCert () {
          console.log(this.vcDetails)
          try {
            const res = await this.generateDIDDoc()
          console.log(res)
          if(res.metaData){
            const issueCred = await this.issueCredential(this.vcDetails)
            console.log(issueCred)
            return issueCred;
            // if(issueCred.credentialDocument){
            //   this.generateCanvas()
            // }
          } 
          } catch (error) {
            console.log(error)
          }          
        },
        async generateCanvas(){
          console.log('in generate canvas')
          const element = this.$refs.credCardBody; // Reference to the target div

      // Use html2canvas to capture the content of the div as an image
      const canvas = await html2canvas(element);

      // Convert the canvas to a PNG image data URL
      const imageDataURL = canvas.toDataURL('image/png');

      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = imageDataURL;
      return imageDataURL      
      // link.download = 'certificate.png';
      // link.click();
        }
      },
      mixins: [toast],
    };
  </script>
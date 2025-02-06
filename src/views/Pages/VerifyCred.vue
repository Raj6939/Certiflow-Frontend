<template>
<div class="container mt-7 p-4 bg-light rounded text-center">
    <h1 class="mb-3 text-primary">Certiflow Verifier</h1>
    <p class="mb-4 text-muted">
      Certiflow Verifier allows users to verify digital academic credential. This site is operated by <a href="https://www.hypersign.id" target="_blank" class="text-decoration-none">Hypersign</a>, a leading blockchain-based credential issuance and verification network designed on the open standards of W3C Verifiable Credentials for digital academic credentials       
    </p>   
    
    <div class="mt-4">
      <div class="form-floating">
        <b-form-textarea v-model="vcJson" class="form-control" id="textarea" rows="6" placeholder="Paste JSON"></b-form-textarea>
        <label for="textarea">Paste Verifible Credential JSON </label>
      </div>
      <button @click="verify" class="btn btn-success mt-3">Verify</button>
    </div>   
    
    <p v-if="response" class="alert alert-info mt-3">True</p>
  </div>
  </template>
  <script>
const jwt = require('jsonwebtoken');
import html2canvas from "html2canvas";
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { mapActions, mapState } from "vuex"
import EventPass from '../Pages/EventPass.vue';
import DegreeCertificate from '../Pages/DegreeCertificate.vue';
import axios from "axios";
import config from "../../config";
import JSZip from 'jszip';
import { Header } from "element-ui";
    export default {
      components:{ EventPass, DegreeCertificate},
      data() {
        return {
          tokenDetails:null,
          jwtToken:null,
          vcJson:null,
          showCert:false,
          response:false,
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijk0YWNhMGEyOGUwZTA5ZjQzNDY3ZWUxNzdiMGU2ZWQyOWZjOSIsInVzZXJJZCI6ImNjZWJlOWNlLWM1MzItNDVmNS1hNzlhLWZkZDRjMzAxYTljOCIsImdyYW50VHlwZSI6ImFjY2Vzc19zZXJ2aWNlX3NzaSIsImttc0lkIjoiaHM6ZG9jOmJhdGdpd25jZXRvbGJzbW53ZWUwOHloM3Q2aWRuN2w1ZTAwZjllYWhtNnciLCJ3aGl0ZWxpc3RlZENvcnMiOlsiKiIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MiIsImh0dHBzOi8vZW50aXR5LmRhc2hib2FyZC5oeXBlcnNpZ24uaWQiLCJodHRwczovL3ZlcmlmeS5oeXBlcnNpZ24uaWQiXSwic3ViZG9tYWluIjoiZW50LTdlMmU5NjgiLCJlZHZJZCI6ImhzOmRldmVsb3Blci1kYXNoYm9hcmQ6YXBwOjk0YWNhMGEyOGUwZTA5ZjQzNDY3ZWUxNzdiMGU2ZWQyOWZjOSIsImFjY2Vzc0xpc3QiOlsiQUxMIl0sImVudiI6ImRldiIsImFwcE5hbWUiOiJTY3ViZSIsImlhdCI6MTczNDk1NjMyMywiZXhwIjoxNzg2OTQwMzIzfQ.qqYVQTIrAG1oWgBS11HNrhbsE96Swt3q6vzL5ff2btg"
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
      },
      methods: {
        ...mapActions("issuerStore",[
          "authenticateEntity",
          "generateDIDDoc",
          "issueCredential",
          "verifyCredential"
        ]),
                     
        async verify () {
          this.response = false
          console.log(this.vcJson)
          try {   
            const data = this.vcJson
            const headers = {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + this.token,              
            }      
          if(this.vcJson){
            const url = config.subdomain+ "/api/v1/credential/verify"
            const verifiedCred = await axios.post(url,data,{
              headers
            }
            )

            console.log("ab",verifiedCred.data.verified)      
            if(verifiedCred.data.verified==true){
              this.response = true         
            }           
          } 
          } catch (error) {
            console.log(error)
          }          
        }       
      },
    };
  </script>
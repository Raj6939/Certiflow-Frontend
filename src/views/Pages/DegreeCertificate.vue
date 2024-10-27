<template>
    <div class="container">                                             
              <div class="cred-card-body" style="padding: 12px; color: rgb(80, 54, 101); font-size: small;">
            <div class="container" align="center">
              <table class="cert" ref="credCardBody" style="border: 5px solid #b2bbc1; border-right: 5px solid #b2bbc1; border-left: 5px solid #b2bbc1; width: 90%; font-family: arial; color: rgb(80, 54, 101);">
                <tr>
                  <td align="center" class="crt_logo">                
                  <h3 class="mt-4">{{ certDetails.recipientFullName ? certDetails.recipientFullName : '{ logo }' }}</h3>
                  </td>
                </tr>
                <tr>
                  <td align="center">      
                    <h1 class="crt_title" style="margin-top: 5px; letter-spacing: 1px; color: rgb(80, 54, 101) !important;">{{ certDetails.degreeName ? certDetails.degreeName : '{ Certificate Name}' }}</h1>
                    <h2 style="font-size: larger; color: rgb(80, 54, 101);">CERTIFICATE</h2>
                    <p style="margin-bottom: 0;">This Certificate is awarded to</p>
                    <h3>{{ certDetails.recipientFullName ? certDetails.recipientFullName : '{ Subject Name }' }}</h3>
                    <h1 class="crt_user" style="font-family: 'Satisfy', cursive; font-size: 40px; margin-top: 0; margin-bottom: 0;">{{ certDetails.subName }}</h1>                  
                    <p style="margin-bottom: 0;">for succuessfully participated in {{ certDetails.degreeName ? certDetails.degreeName : '{ Certificate Name }' }}</p>
                    <div style="display: flex;">
                    <div style="display: inline; text-align: center;">
                      <h4 style="margin-right: auto;" class="ml-4 mr-4 mt-4">Issued By</h4>
                      <span class="mb-2">{{ certDetails.issuerName? certDetails.issuerName:`{ Issuer Name }` }}</span>
                    </div>
                    <div style="margin-left: auto; text-align: center;">
                      <h4 class="mr-4 mt-4">Date</h4>
                      <span class="mr-4">{{ certDetails.issuanceDate ? certDetails.issuanceDate : '{ Issuance Date }' }}</span>
                    </div>
                  </div>
                  </td>
                  <tr>
                </tr>
                </tr>      
              </table>
            </div>
          </div>
          </div>
  </template>
  
  <script>
  export default {
  props:{
      certDetails:{
          type:Object,
          default:{}
      }
  }
  }
  </script>
  
  <style>
  
  </style>
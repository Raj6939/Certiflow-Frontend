<template>
<div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <h1>Hi This is Invitation Page</h1>
</div>
</template>

<script>
import toast from "../../util/toast";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
name:'Invitation',
components:{Loading},
data() {
    return {
        token:null,
        isLoading:false,
        fullPage:true
    }
},
async mounted() {
    console.log(this.$route.query.jwt)
    await this.invokeStatus()
},
methods:{
    async invokeStatus(){
        try {
            this.isLoading = true
        const url = `http://localhost:3000/invite/${this.$route.query.jwt}`
        const headers = {
            "Content-type": "application/json"
        }
        const resp = await fetch(url,{
            headers,
            method:'GET'
        })
        const msg = await resp.json()
        console.log(msg)   
        this.toast(msg.message,'success')
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

<style>

</style>
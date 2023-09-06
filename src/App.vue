<template>
  <router-view></router-view>
</template>

<script>
import {mapActions} from "vuex"
export default {
  methods:{
    ...mapActions("issuerStore",[
      "authenticateEntity"
    ])
  },
  async mounted(){
    await this.authenticateEntity()
  }
}
</script>

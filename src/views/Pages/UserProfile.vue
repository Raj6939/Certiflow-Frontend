<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center bg-gradient-success">
     
    </div>

    <b-container fluid class="mt--6">
      <b-row>  
        <b-col xl="12" class="order-xl-1">
          <edit-profile-form></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue';
  import UserCard from './UserProfile/UserCard.vue';

  export default {
    components: {
      EditProfileForm,
      UserCard
    }
  };
</script>
<style>
</style>

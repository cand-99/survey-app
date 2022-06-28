<template>
  <div class="min-h-full">
      <Navbar />
        <router-view> </router-view>

        <Notification />
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from "../components/navbar/Navbar.vue";
import Notification from "../components/Notification.vue";


 const routerNames = ref(useRoute().name)
 const routerName = {
  watch: {
   routerNames
  }
 }


</script>

<style lang="scss" scoped>

</style>
<script>
import MainPageHeader from "@/components/MainPageHeader.vue";
import MainPageFooter from "@/components/MainPageFooter.vue";

export default {
  name: "MainPage",
  components: {MainPageFooter, MainPageHeader}
}
</script>

<template>
  <main-page-header></main-page-header>
  <router-view></router-view>
  <main-page-footer></main-page-footer>
</template>

<style scoped>

</style>

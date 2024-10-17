<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <HeaderPage class="header"></HeaderPage> -->
  <router-view class="content"/>
  <Footer  v-if="!$route.meta.hideFooter" />
  <!-- <FooterPage class="footer"></FooterPage> -->
</template>

<script>
import Footer from '@/components/FooterPage.vue'

// import HeaderPage from '@/components/HeaderPage.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import FooterPage from '@/components/FooterPage.vue';

export default {
  name: 'App',
  components: {
    Footer
    // HeaderPage,
    // HelloWorld
    // FooterPage
  }
}
</script>

<style>

  button {
    cursor: pointer;
  }
</style>
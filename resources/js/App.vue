<template>
  <v-app id="app">
    <VuePerfectScrollbar class="scroll-area">
      <router-view></router-view>
    </VuePerfectScrollbar>
  </v-app>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import 'vuetify/dist/vuetify.min.css'
export default {
  name: 'App',
  components: {
    VuePerfectScrollbar
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .scroll-area {
    position: relative;
    height: 100vh;
  }
}
</style>
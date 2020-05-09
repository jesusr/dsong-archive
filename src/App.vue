<template>
  <div class="app">
    <div class="app-wrapper">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue"

export default {
  name: 'App',

  components: {
    Header
  }
}
</script>

<style lang="scss">
@import "styles/components/App.scss";
</style>

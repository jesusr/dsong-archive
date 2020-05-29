<template>
  <div :class="'app page-' + pageName">
    <div class="app-wrapper">
      <Header />
      <router-view v-on:set-page-name="setPageName"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue"

const DEFAULT_PAGE_NAME = 'undefined'

export default {
  name: 'App',

  data() {
    return {
      pageName: DEFAULT_PAGE_NAME
    }
  },

  components: {
    Header
  },

  methods: {
    setPageName(value) {
      this.pageName = value
    }
  },

  watch: {
    $route(from, to) {
      if (from.name !== to.name) {
        this.pageName = DEFAULT_PAGE_NAME
      }
    }
  }
}
</script>

<style lang="scss">
@import "styles/components/App.scss";
</style>

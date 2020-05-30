<template>
  <div :class="'app page-' + pageName">
    <div class="app-wrapper">
      <Header />
      <router-view
        v-title="pageTitle"
        v-on:set-component-title="setComponentTitle"
        v-on:set-page-name="setPageName"
      />
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
      pageName: DEFAULT_PAGE_NAME,
      componentTitle: null
    }
  },

  components: {
    Header
  },

  computed: {
    pageTitle() {
      let title = `El Archivo de dSong » ${this.$route.meta.title}`
      if (this.componentTitle) { title += `${this.componentTitle}` }
      return title
    }
  },

  methods: {
    setPageName(value) {
      this.pageName = value
    },

    setComponentTitle(value) {
      this.componentTitle = value
    }
  },

  watch: {
    $route(from, to) {
      this.componentTitle = null

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

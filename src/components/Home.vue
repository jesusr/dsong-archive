<template>
  <div class="home">
    <post-view v-if="featuredPost" :value="featuredPost" :linkToArchive="true" />
  </div>
</template>

<script>
import api from "../api"
import Post from "../models/Post"
import PostView from "./PostView"

export default {
  components: {
    PostView
  },

  data() {
    return {
      postsIndex: [],
      featuredPost: null
    }
  },

  async created() {
    await this.fetchIndex()
    this.fetchFeaturedPost()
  },

  methods: {
    fetchIndex: async function() {
      const response = await api.fetchIndex()
      this.postsIndex = response.data
    },

    fetchFeaturedPost: async function() {
      await api.fetchPost(this.randomPostId())
        .then((response) => { this.featuredPost = new Post(response.data) })
    },

    randomPostId() {
      return this.postsIndex[Math.floor(Math.random() * this.postsIndex.length)]
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/Home.scss";
</style>

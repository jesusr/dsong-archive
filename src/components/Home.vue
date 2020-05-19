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
      posts: [],
      featuredPost: null
    }
  },

  async created() {
    const response = await api.fetchIndex()
    this.posts = Post.array(response.data.map(id => { return { id: id } }))
    this.fetchFeaturedPost()
  },

  methods: {
    fetchFeaturedPost: async function() {
      await api.fetchPost(this.randomPostId())
        .then((response) => { this.featuredPost = new Post(response.data) })
    },

    randomPostId() {
      return this.posts[Math.floor(Math.random() * this.posts.length)].id
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/Home.scss";
</style>

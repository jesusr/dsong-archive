<template>
  <div class="archive-post">
    <post-view v-if="post" :value="post" />
    <div v-if="error">{{ error.message }}</div>
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
      postId: this.$route.params.postId,
      post: null,
      error: null
    }
  },

  created() {
    this.fetchPost()
  },

  methods: {
    fetchPost: async function() {
      await api.fetchPost(this.postId)
        .then(response => {
          this.post = new Post(response.data)
        })
        .catch((error) => {
          this.error = error
        })
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/ArchivePost.scss";
</style>

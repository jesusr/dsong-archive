<template>
  <div />
</template>

<script>
import api from "../api"

export default {
  data() {
    return {
      postsIndex: []
    }
  },

  async created() {
    await this.fetchIndex()
    this.navigateToRandomPost()
  },

  methods: {
    fetchIndex: async function() {
      const response = await api.fetchIndex()
      this.postsIndex = response.data
    },

    navigateToRandomPost() {
      this.$router.push({ name: 'archive-post', params: { postId: this.randomPostId() } })
    },

    randomPostId() {
      return this.postsIndex[Math.floor(Math.random() * this.postsIndex.length)]
    }
  }
}
</script>

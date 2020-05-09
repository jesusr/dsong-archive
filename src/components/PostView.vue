<template>
  <div class="post-view">
    <h2 class="post-view__title">{{ value.title }}</h2>

    <div class="post-view__meta">
      <span>
        <span class="post-view__author">
          <a v-if="value.authorUrl" :href="value.authorUrl" target="blank">
            <img class="post-view__author-image" :src="value.authorGravatarUrl(20)" />
            <span class="post-view__author-name">{{ value.authorName }}</span>
          </a>
          <span v-else>
            <img class="post-view__author-image" :src="value.authorGravatarUrl(20)" />
            <span class="post-view__author-name">{{ value.authorName }}</span>
          </span>
        </span>

        <span class="post-view__date">{{ value.publishedAt }}</span>
      </span>
    </div>

    <div class="post-view__body">
      <div class="post-view__content" v-html="value.contentAsHtml" />
    </div>
  </div>
</template>

<script>
import Post from "../models/Post"

export default {
  props: {
    value: {
      type: Post,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/PostView.scss";
</style>

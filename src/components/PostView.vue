<template>
  <div class="post-view">
    <h2 v-if="linkToArchive" class="post-view__title">
      <router-link :to="`/archivo/${value.id}`">{{ value.title }}</router-link>
    </h2>
    <h2 v-else class="post-view__title">{{ value.title }}</h2>

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

        <span v-if="linkToArchive" class="post-view__permalink">
          <router-link :to="`/archivo/${value.id}`">Enlace permanente</router-link>
        </span>
      </span>
    </div>

    <div class="post-view__body">
      <div class="post-view__content" v-html="value.contentAsHtml" />
    </div>

    <div v-if="value.hasYouTubePlayer" class="post-view__youtube">
      <h3>Reproducir en YouTube</h3>
      <div class="post-view__youtube-container">
        <div v-html="value.youTubePlayerAsHtml" />
      </div>
    </div>

    <div v-if="value.hasSpotifyPlayer" class="post-view__spotify">
      <h3>Reproducir en Spotify</h3>
      <div v-html="value.spotifyPlayerAsHtml" />
    </div>
  </div>
</template>

<script>
import Post from "../models/Post"

export default {
  props: {
    value: {
      type: Post,
      required: true,
    },
    linkToArchive: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/PostView.scss";
</style>

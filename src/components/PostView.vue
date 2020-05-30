<template>
  <div class="post-view">
    <h2 v-if="!fullView" class="post-view__title">
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

        <span v-if="value.commentsCount === 0" class="post-view__comments-count">Sin comentarios</span>
        <span v-else-if="value.commentsCount === 1" class="post-view__comments-count">{{ value.commentsCount }} comentario</span>
        <span v-else-if="value.commentsCount > 1" class="post-view__comments-count">{{ value.commentsCount }} comentarios</span>

        <span v-if="!fullView" class="post-view__permalink">
          <router-link :to="`/archivo/${value.id}`">Enlace permanente</router-link>
        </span>
      </span>
    </div>

    <div class="post-view__content" v-html="value.contentAsHtml" />

    <div v-if="value.hasPodcast" class="post-view__media post-view__media--podcast">
      <h3 class="post-view__subtitle">Reproducir el podcast de UniRadio Jaén</h3>
      <div v-html="value.podcastPlayerAsHtml" />
    </div>

    <div v-if="value.hasYouTubePlayer" class="post-view__media post-view__media--youtube">
      <h3 class="post-view__subtitle">Reproducir en YouTube</h3>
      <div class="post-view__media-container">
        <div v-html="value.youTubePlayerAsHtml" />
      </div>
    </div>

    <div v-if="value.hasSpotifyPlayer" class="post-view__media post-view__media--spotify">
      <h3 class="post-view__subtitle">Reproducir en Spotify</h3>
      <div v-html="value.spotifyPlayerAsHtml" />
    </div>

    <div v-if="fullView && value.hasComments" class="post-view__comments">
      <h3 class="post-view__subtitle">Comentarios</h3>
      <ul>
        <li v-for="comment in value.comments" :key="comment.publishedAt" class="post-view__comment">
          <div class="post-view__comment-content">{{ comment.content }}</div>

          <div class="post-view__comment-meta">
            <span class="post-view__comment-author">
              —
              <a v-if="comment.authorUrl" :href="comment.authorUrl" target="blank">
                <span class="post-view__comment-author-name">{{ comment.authorName }}</span>
              </a>
              <span v-else>
                <span class="post-view__comment-author-name">{{ comment.authorName }}</span>
              </span>
            </span>

            <span class="post-view__comment-date">{{ comment.publishedAt }}</span>
          </div>
        </li>
      </ul>
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
    fullView: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/PostView.scss";
</style>

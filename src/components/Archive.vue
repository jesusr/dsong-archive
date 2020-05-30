<template>
  <div class="archive">
    <table class="archive-table">
      <thead>
        <tr>
          <th class="archive-table__cell--published-at">
            <router-link :to="{ query: filter({ sortCriteria: 'publishedAt', sortMode: sortMode('publishedAt') }) }" :class="sortModeClassFor('publishedAt')">Fecha</router-link>
          </th>
          <th class="archive-table__cell--title">Publicación</th>
          <th class="archive-table__cell--song">
            <router-link :to="{ query: filter({ sortCriteria: 'song', sortMode: sortMode('song') }) }" :class="sortModeClassFor('song')">Canción</router-link>
          </th>
          <th class="archive-table__cell--artist">
            <router-link :to="{ query: filter({ sortCriteria: 'artist', sortMode: sortMode('artist') }) }" :class="sortModeClassFor('artist')">Artista</router-link>
          </th>
          <th class="archive-table__cell--album">
            <router-link :to="{ query: filter({ sortCriteria: 'album', sortMode: sortMode('album') }) }" :class="sortModeClassFor('album')">Álbum</router-link>
          </th>
          <th class="archive-table__cell--year">
            <router-link :to="{ query: filter({ sortCriteria: 'year', sortMode: sortMode('year') }) }" :class="sortModeClassFor('year')">Año</router-link>
          </th>
          <th class="archive-table__cell--author">
            <router-link :to="{ query: filter({ sortCriteria: 'authorName', sortMode: sortMode('authorName') }) }" :class="sortModeClassFor('authorName')">Autor</router-link>
          </th>
        </tr>
      </thead>
      <tbody v-if="isLoading">
        <tr>
          <td colspan="7" class="archive-loading">Un segundín…</td>
        </tr>
      </tbody>
      <tbody v-if="!isLoading">
        <tr v-for="post in archive" :key="post.id">
          <td class="archive-table__cell--published-at">{{ formattedDate(post.published_at) }}</td>
          <td class="archive-table__cell--title"><router-link :to="`/archivo/${post.id}`" target="_blank">{{ post.title }} »</router-link></td>
          <td class="archive-table__cell--song">{{ post.metadata_song }}</td>
          <td class="archive-table__cell--artist">
            <router-link :to="{ query: filter({ artist: post.metadata_artist }) }">{{ post.metadata_artist }}</router-link>
            <router-link v-if="artistFilter" :to="{ query: filter({ artist: null }) }" class="archive-table__remove-filter"></router-link>
          </td>
          <td class="archive-table__cell--album">
            <router-link :to="{ query: filter({ album: post.metadata_album }) }">{{ post.metadata_album }}</router-link>
            <router-link v-if="albumFilter" :to="{ query: filter({ album: null }) }" class="archive-table__remove-filter"></router-link>
          </td>
          <td class="archive-table__cell--year">
            <router-link :to="{ query: filter({ year: post.metadata_year }) }">{{ post.metadata_year }}</router-link>
            <router-link v-if="yearFilter" :to="{ query: filter({ year: null }) }" class="archive-table__remove-filter"></router-link>
          </td>
          <td class="archive-table__cell--author">
            <router-link :to="{ query: filter({ authorName: post.author_name }) }">{{ post.author_name }}</router-link>
            <router-link v-if="authorNameFilter" :to="{ query: filter({ authorName: null }) }" class="archive-table__remove-filter"></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../api"
import parseISO from "date-fns/parseISO"
import { format } from "date-fns"

export default {
  data() {
    return {
      posts: [],
      isLoading: true
    }
  },

  async created() {
    this.$emit("set-page-name", "archive")
    await this.fetchArchive()
  },

  computed: {
    archive() {
      return this.sortPosts(this.filterPosts(this.posts))
    },

    artistFilter() {
      return this.$route.query.artist
    },

    albumFilter() {
      return this.$route.query.album
    },

    yearFilter() {
      return this.$route.query.year
    },

    authorNameFilter() {
      return this.$route.query.authorName
    },

    sortCriteriaFromRoute() {
      return this.$route.query.sortCriteria
    },

    sortModeFromRoute() {
      return this.$route.query.sortMode
    }
  },

  methods: {
    fetchArchive: async function() {
      await api.fetchArchive()
        .then(response => {
          this.posts = response.data
          this.isLoading = false
        })
    },

    filterPosts(posts) {
      return posts.filter(post => {
        if (!this.anyFilterApplied) { return true }

        if (!this.matchesArtist(post.metadata_artist)) { return false }
        if (!this.matchesAlbum(post.metadata_album)) { return false }
        if (!this.matchesYear(post.metadata_year)) { return false }
        if (!this.matchesAuthorName(post.author_name)) { return false }

        return true
      })
    },

    sortPosts(posts) {
      return posts.sort((a, b) => {
        if (!this.sortCriteriaFromRoute) { return 1 }

        if (this.sortModeFromRoute === "desc") { [a, b] = [b, a] }

        if (this.sortCriteriaFromRoute === "publishedAt") { return this.spaceshipOperator(a.published_at, b.published_at) }
        if (this.sortCriteriaFromRoute === "song") { return this.spaceshipOperator(a.metadata_song, b.metadata_song) }
        if (this.sortCriteriaFromRoute === "album") { return this.spaceshipOperator(a.metadata_album, b.metadata_album) }
        if (this.sortCriteriaFromRoute === "artist") { return this.spaceshipOperator(a.metadata_artist, b.metadata_artist) }
        if (this.sortCriteriaFromRoute === "year") { return this.spaceshipOperator(a.metadata_year, b.metadata_year) }
        if (this.sortCriteriaFromRoute === "authorName") { return this.spaceshipOperator(a.author_name, b.author_name) }
      })
    },

    filter(newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      }
    },

    anyFilterApplied() {
      return !!this.artistFilter ||
        !!this.albumFilter ||
        !!this.yearFilter ||
        !!this.authorNameFilter
    },

    matchesArtist(artist) {
      if (!this.artistFilter) return true
      return this.artistFilter === artist
    },

    matchesAlbum(album) {
      if (!this.albumFilter) return true
      return this.albumFilter === album
    },

    matchesYear(year) {
      if (!this.yearFilter) return true
      return this.yearFilter === year
    },

    matchesAuthorName(authorName) {
      if (!this.authorNameFilter) return true
      return this.authorNameFilter === authorName
    },

    sortMode(criteria) {
      if (criteria === this.$route.query.sortCriteria) {
        return (this.sortModeFromRoute === "asc") ? "desc" : "asc"
      }

      return "asc"
    },

    sortModeClassFor(criteria) {
      return (criteria === this.sortCriteriaFromRoute)
        ? `archive-table__sort--${this.sortModeFromRoute}`
        : "archive-table__sort--undefined"
    },

    formattedDate(isoDate) {
      return format(parseISO(isoDate), "dd/MM/yyyy")
    },

    spaceshipOperator(a, b) {
      if ((a === null || b === null) || (typeof a != typeof b)) {
        return null
      }

      if (typeof a === "string") {
        return a.localeCompare(b)
      } else {
        if (a > b) {
          return 1
        } else if (a < b) {
          return -1
        }

        return 0
      }
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/About.scss";
</style>

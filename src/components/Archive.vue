<template>
  <div class="archive">
    <h2 class="page-title">Archivo</h2>

    <p v-if="isLoading">Cargando el archivo…</p>

    <div v-if="!isLoading" class="archive-table-wrapper">
      <table class="archive-table">
        <thead>
          <tr>
            <th class="archive-table__cell--published-at">Fecha</th>
            <th class="archive-table__cell--title">Publicación</th>
            <th class="archive-table__cell--song">Canción</th>
            <th class="archive-table__cell--artist">Artista</th>
            <th class="archive-table__cell--album">Álbum</th>
            <th class="archive-table__cell--year">Año</th>
            <th class="archive-table__cell--author">Autor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in filteredArchive" :key="post.id">
            <td class="archive-table__cell--published-at">{{ formattedDate(post.published_at) }}</td>
            <td class="archive-table__cell--title"><router-link :to="`/archivo/${post.id}`" target="_blank">{{ post.title }}</router-link></td>
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
  </div>
</template>

<script>
import api from "../api"
import parseISO from 'date-fns/parseISO'
import { format } from 'date-fns'

export default {
  data() {
    return {
      postsArchive: [],
      isLoading: true
    }
  },

  async created() {
    this.$emit('set-page-name', 'archive')
    await this.fetchArchive()
  },

  computed: {
    filteredArchive() {
      return this.postsArchive.filter(post => {
        if (!this.filtersApplied) {
          return true
        }

        let matchesCriteria = true

        if ((this.artistFilter) && !(this.artistFilter === post.metadata_artist)) {
          matchesCriteria = false
        }

        if ((this.albumFilter) && !(this.albumFilter === post.metadata_album)) {
          matchesCriteria = false
        }

        if ((this.yearFilter) && !(this.yearFilter === post.metadata_year)) {
          matchesCriteria = false
        }

        if ((this.authorNameFilter) && !(this.authorNameFilter === post.author_name)) {
          matchesCriteria = false
        }

        return matchesCriteria
      })
    },

    filtersApplied() {
      return !!this.artistFilter ||
        !!this.albumFilter ||
        !!this.yearFilter ||
        !!this.authorNameFilter
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
    }
  },

  methods: {
    fetchArchive: async function() {
      await api.fetchArchive()
        .then(response => {
          this.postsArchive = response.data
          this.isLoading = false
        })
    },

    formattedDate(isoDate) {
      return format(parseISO(isoDate), "dd/MM/yyyy")
    },

    filter(newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      }
    },

    resetFilters() {
      this.$router.push(this.$route.path)
    }
  }
}
</script>

<style lang="scss">
@import "../styles/components/About.scss";
</style>

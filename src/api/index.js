import axios from "axios";

const DATA_BASE_URL = '/data'

export default {
  fetchIndex() {
    return axios.get(`${DATA_BASE_URL}/index.json`)
  },

  fetchArchive() {
    return axios.get(`${DATA_BASE_URL}/archive.json`)
  },

  fetchPost(id) {
    return axios.get(`${DATA_BASE_URL}/${id}.json`)
  }
}

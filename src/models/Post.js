import Author from "./Author"
import Comment from "./Comment"
import MarkdownIt from "markdown-it"
import parseISO from 'date-fns/parseISO'
import { format } from 'date-fns'

const IMAGE_BASE_URL = "http://dsong.skuark.com/wp-content/uploads"

export default class Post {
  constructor(attributes = {}) {
    this._id = attributes.id
    this._publishedAt = attributes.published_at !== undefined
      ? parseISO(attributes.published_at)
      : this._publishedAt = null
    this._title = attributes.title
    this._imagePath = attributes.image_path
    this._content = attributes.content || ""
    this._author = new Author(attributes.author)
    this._comments = new Comment.array(attributes.comments)
    this._metadata = attributes.metadata
  }

  get id() {
    return this._id
  }

  get publishedAt() {
    if (!this._publishedAt) { return "" }
    return format(this._publishedAt, "dd/MM/yyyy")
  }

  get title() {
    return this._title
  }

  get imagePath() {
    return this._imagePath
  }

  get imageUrl() {
    return `${IMAGE_BASE_URL}/${this.imagePath}`
  }

  get content() {
    return this._content
  }

  get contentAsHtml() {
    const md = new MarkdownIt({ html: true })
    return md.render(this.content)
  }

  get author() {
    return this._author
  }

  get comments() {
    return this._comments
  }

  get metadata() {
    return this._metadata
  }

  get authorName() {
    return this._author.name
  }

  get authorUrl() {
    return this._author.url
  }

  authorGravatarUrl(size = 80) {
    return `${this._author.gravatarUrl}?s=${size}`
  }
}

Post.array = (posts) => {
  if (!posts) return []
  return posts.map(data => new Post(data))
}

import Author from './Author'
import parseISO from 'date-fns/parseISO'
import { format } from 'date-fns'

export default class Comment {
  constructor(attributes = {}) {
    this._id = attributes.id
    this._parent = attributes.parent
    this._publishedAt = attributes.published_at !== undefined
      ? parseISO(attributes.published_at)
      : this._publishedAt = null
    this._content = attributes.content
    this._author = new Author(attributes.author)
  }

  get id() {
    return this._id
  }

  get parent() {
    return this._parent
  }

  get publishedAt() {
    if (!this._publishedAt) { return "" }
    return format(this._publishedAt, "dd/MM/yyyy hh:mm")
  }

  get content() {
    return this._content
  }

  get author() {
    return this._author
  }

  get authorName() {
    return this.author.name
  }

  get authorUrl() {
    return this.author.url
  }
}

Comment.array = (posts) => {
  if (!posts) return []
  return posts.map(data => new Comment(data))
}

import Author from './Author'

export default class Comment {
  constructor(attributes = {}) {
    this._id = attributes.id
    this._parent = attributes.parent
    this._publishedAt = attributes.published_at
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
    return this._publishedAt
  }

  get content() {
    return this._content
  }

  get author() {
    return this._author
  }
}

Comment.array = (posts) => {
  if (!posts) return []
  return posts.map(data => new Comment(data))
}

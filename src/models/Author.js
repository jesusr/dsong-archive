export default class Author {
  constructor(attributes = {}) {
    this._name = attributes.name
    this._url = attributes.url
    this._gravatarUrl = attributes.gravatar_url
  }

  get name() {
    return this._name
  }

  get url() {
    return this._url
  }

  get gravatarUrl() {
    return this._gravatarUrl
  }
}

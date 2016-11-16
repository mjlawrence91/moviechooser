class MovieList extends HTMLElement {
  constructor () {
    super()
    this._doc = document.currentScript.ownerDocument
    const tmpl = this._doc.querySelector('#movie-list-tmpl')

    this._root = this.attachShadow({mode: 'open'})
    this._root.appendChild(tmpl.content.cloneNode(true))

    this._url = this.getAttribute('url')
    this._request = new MovieRequest(this.url)
    this._movies = []
  }

  get url () {
    return this._url
  }

  connectedCallback () {
    this._request.get().then(data => {
      this._movies = data
      this._loadMovies(data)
    })
  }

  attributeChangedCallback (name, oldValue, newValue) {

  }

  _loadMovies (movies) {
    movies.forEach(movie => {
      const listItem = this._createMovieItem(movie)
      const itemWrapper = document.createElement('li')
      itemWrapper.classList.add('movie')
      itemWrapper.appendChild(listItem)

      const list = this._root.querySelector('ul')
      list.appendChild(itemWrapper)
    })
  }

  _createMovieItem (movie) {
    const listItem = document.createElement('movie-list-item')
    listItem.id = movie._id
    listItem.name = movie.name
    listItem.colour = movie.who.toLowerCase()
    listItem.who = movie.who
    return listItem
  }

  showSpinner () {
    this.setAttribute('loading', 'true')
  }

  hideSpinner () {
    this.removeAttribute('loading')
  }
}

window.customElements.define('movie-list', MovieList)

'use strict'

class MovieList extends HTMLElement {
  static get observedAttributes () {
    return ['url']
  }

  constructor () {
    super()

    console.log('in MovieList constructor')

    const doc = document.currentScript.ownerDocument
    this._tmpl = doc.querySelector('#movie-list-tmpl')
    this._root = this.attachShadow({mode: 'open'})
    this._root.appendChild(this._tmpl.content.cloneNode(true))

    this._url = ''
    this._request = null
  }

  get url () {
    if (!this._url) {
      console.error('No URL to request.')
      return
    }

    return this._url
  }

  set url (_url) {
    if (!_url) {
      console.error('This isn\'t a valid URL.')
      return
    }

    this.setAttribute('url', _url)
  }

  connectedCallback () {
    this._url = this.getAttribute('url')
    this._request = new MovieRequest(this.url)

    this._request.get()
      .then(data => this._loadMovies(data))
      .catch(error => console.error(error))
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'url' && oldValue !== newValue) {
      this.url = newValue
    }
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

  chooseRandom (activeFilter) {
    const movies = this._root.querySelectorAll('movie-list-item')
    const movieDisplay = this._root.querySelector('.display')
    const movieArr = Array.from(movies)
    let filteredMovies = null

    if (activeFilter) {
      filteredMovies = movieArr.filter(movie => activeFilter === movie.getAttribute('who'))
    }

    const rand = Math.floor(Math.random() * filteredMovies.length)
    const randomMovie = filteredMovies[rand]

    if (randomMovie) {
      movieDisplay.textContent = randomMovie.getAttribute('name') || 'No movies.'
    } else {
      movieDisplay.textContent = 'No movies.'
    }
  }

  showSpinner () {
    this.setAttribute('loading', 'true')
  }

  hideSpinner () {
    this.removeAttribute('loading')
  }
}

if ('customElements' in window) {
  window.customElements.define('movie-list', MovieList)
} else {
  window.addEventListener('WebComponentsReady', _ => {
    window.customElements.define('movie-list', MovieList)
  })
}

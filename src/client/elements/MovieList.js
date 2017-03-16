'use strict'

import MovieRequest from '../MovieRequest'
import './MovieListItem'

class MovieList extends HTMLElement {
  static get observedAttributes () {
    return ['url']
  }

  constructor () {
    super()

    this._tmpl = null
    this._url = ''
    this._request = null

    this.chooseRandom = this.chooseRandom.bind(this)
  }

  get url () {
    if (!this._url) {
      return console.error('No URL to request.')
    }

    return this._url
  }

  set url (_url) {
    if (!_url) {
      return console.error('This isn\'t a valid URL.')
    }

    this.setAttribute('url', _url)
  }

  get request () {
    return this._request
  }

  connectedCallback () {
    this._stampTemplate()
    this._url = this.getAttribute('url')
    this._request = new MovieRequest(this.url)

    this._request.get()
      .then(data => {
        this._loadMovies(data)
        document.querySelector('.preload').remove('active')
      })
      .catch(error => console.error(error))
  }

  _stampTemplate () {
    const link = document.querySelector('link[rel=import][href*="movie-list"]')
    this._tmpl = link.import.querySelector('#movie-list-tmpl')
    this.innerHTML = this._tmpl.innerHTML + this.innerHTML
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'url' && oldValue !== newValue) {
      this._url = newValue
    }
  }

  _loadMovies (movies) {
    const fragment = document.createDocumentFragment()

    movies.forEach(movie => {
      const listItem = this._createMovieItem(movie)
      fragment.appendChild(listItem)
    })

    this.appendChild(fragment)
  }

  _createMovieItem (movie) {
    const listItem = document.createElement('movie-list-item')
    listItem.id = movie._id
    listItem.name = movie.name
    listItem.who = movie.who
    return listItem
  }

  chooseRandom (activeFilter) {
    const movies = this.querySelectorAll('movie-list-item')
    const movieDisplay = this.querySelector('.display')
    const movieArr = Array.from(movies)

    const filteredMovies = (activeFilter)
      ? movieArr.filter(movie => activeFilter === movie.getAttribute('who'))
      : movieArr

    const rand = Math.floor(Math.random() * filteredMovies.length)
    const randomMovie = filteredMovies[rand]

    if (randomMovie) {
      // Fix for Safari: have to access through shadow root. Because Safari.
      const movieText = randomMovie._root.querySelector('.movie-name').textContent
      movieDisplay.textContent = movieText || 'No movies.'
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

window.customElements.define('movie-list', MovieList)

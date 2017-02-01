'use strict'

class MovieList extends Polymer.Element {
  static get observedAttributes () {
    return ['url']
  }

  static get is () {
    return 'movie-list'
  }

  static get config () {
    return {
      properties: {
        url: {type: String}
      }
    }
  }

  constructor () {
    super()

    // console.log('in MovieList constructor')

    // const doc = document.currentScript.ownerDocument
    // this._tmpl = doc.querySelector('#movie-list-tmpl')
    // this._root = this.attachShadow({mode: 'open'})
    // this._root.appendChild(this._tmpl.content.cloneNode(true))

    this._url = ''
    this._request = null
    this._root = null
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
    super.connectedCallback()
    console.log('connected MovieList element')

    this._root = this.shadowRoot
    this._url = this.getAttribute('url')
    // this._request = new MovieRequest(this.url)

    // this._request.get()
    //   .then(data => this._loadMovies(data))
    //   .catch(error => console.error(error))
  }

  // attributeChangedCallback (name, oldValue, newValue) {
  //   super.attributeChangedCallback()

  //   if (name === 'url' && oldValue !== newValue) {
  //     this.url = newValue
  //   }
  // }

  _loadMovies (movies) {
    const docFragment = document.createDocumentFragment()
    // movies.forEach(movie => {
    movies.forEach(movie => {
      const listItem = this._createMovieItem(movie)
      docFragment.appendChild(listItem)
      // console.log(listItem)
      // const itemWrapper = document.createElement('li')
      // itemWrapper.classList.add('movie')
      // itemWrapper.appendChild(listItem)

      // const list = this._root.querySelector('[name=list-items]')
      // list.appendChild(itemWrapper)
    })
    this.appendChild(docFragment)
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

window.customElements.define(MovieList.is, MovieList)

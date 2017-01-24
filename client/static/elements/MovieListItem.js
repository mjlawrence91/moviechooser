'use strict'

class MovieListItem extends HTMLElement {
  constructor () {
    super()

    console.log('in MovieListItem constructor')

    const link = document.querySelector('link[rel=import][href*="movie-list-item"]')
    this._tmpl = link.import.querySelector('#movie-list-item-tmpl')

    this._root = this.attachShadow({mode: 'open'})
    this._root.appendChild(this._tmpl.content.cloneNode(true))

    this.removeMovie = this.removeMovie.bind(this)
  }

  connectedCallback () {
    const removeLink = this._root.querySelector('.remove')
    removeLink.addEventListener('click', this.removeMovie)
  }

  disconnectedCallback () {
    const removeLink = this._root.querySelector('.remove')
    removeLink.removeEventListener('click', this.removeMovie)
  }

  set id (_id) {
    if (!_id) {
      console.error('No ID given.')
      return
    }

    const removeLink = this._root.querySelector('.remove')
    removeLink.setAttribute('remove', _id)
  }

  set name (_name) {
    const movieName = this._root.querySelector('.movie-name')
    movieName.textContent = _name
    this.setAttribute('name', _name)
  }

  set who (_who) {
    const label = this._root.querySelector('.label')
    label.textContent = `${_who}:`
    this.setAttribute('who', _who)
  }

  set colour (_colour) {
    const label = this._root.querySelector('.label')
    label.classList.add(_colour)
    this.setAttribute('colour', _colour)
  }

  removeMovie (evt) {
    if (evt) evt.preventDefault()
    const removeLink = this._root.querySelector('.remove')
    const movieToDelete = removeLink.getAttribute('remove')

    const request = new MovieRequest(`/api/movies/${movieToDelete}`)

    request.delete()
      .then(_ => {
        this.parentElement.remove()
        this.remove()
      })
      .catch(_ => this._errorHandler('This movie doesn\'t exist. Oops.'))
  }

  _errorHandler (message) {
    console.error(message)
    alert(message)
  }
}

if ('customElements' in window) {
  window.customElements.define('movie-list-item', MovieListItem)
} else {
  window.addEventListener('WebComponentsReady', _ => {
    console.log('WebComponentsReady in MovieListItem.js')
    window.customElements.define('movie-list-item', MovieListItem)
  })
}


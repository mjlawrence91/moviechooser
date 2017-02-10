'use strict'

class MovieListItem extends HTMLElement {
  static get observedAttributes () {
    return ['who']
  }

  constructor () {
    super()

    this._tmpl = null
    this._root = null

    this._createShadowRoot()
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

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'who') {
      const label = this._root.querySelector('.label')
      label.classList.add(newValue.toLowerCase())
      label.innerText = newValue
    }
  }

  _createShadowRoot () {
    const link = document.querySelector('link[rel=import][href*="movie-list-item"]')
    this._tmpl = link.import.querySelector('#movie-list-item-tmpl')

    this._root = this.attachShadow({mode: 'open'})
    this._root.appendChild(this._tmpl.content.cloneNode(true))
  }

  set id (_id) {
    if (!_id) {
      return console.error('No ID given.')
    }

    const removeLink = this._root.querySelector('.remove')
    removeLink.setAttribute('remove', _id)
  }

  set name (_name) {
    const movieName = this._root.querySelector('.movie-name')
    movieName.innerText = _name
    this.innerText = _name
  }

  set who (_who) {
    this.setAttribute('who', _who)
  }

  removeMovie (evt) {
    if (evt) evt.preventDefault()
    const removeLink = this._root.querySelector('.remove')
    const movieToDelete = removeLink.getAttribute('remove')

    const request = this.parentElement.request

    request.delete(movieToDelete)
      .then(_ => this.remove())
      .catch(_ => this._errorHandler('This movie doesn\'t exist. Oops.'))
  }

  _errorHandler (message) {
    console.error(message)
    alert(message)
  }
}

window.customElements.define('movie-list-item', MovieListItem)

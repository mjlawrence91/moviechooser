'use strict'

class MovieListItem extends Polymer.Element {
  static get observedAttributes () {
    return ['id', 'name', 'who', 'colour']
  }

  static get is () {
    return 'movie-list-item'
  }

  static get config () {
    return {
      properties: {
        id: {type: String},
        name: {type: String},
        who: {type: String},
        colour: {type: String}
      }
    }
  }

  constructor () {
    super()
    this._root = null
    this.removeMovie = this.removeMovie.bind(this)
  }

  connectedCallback () {
    super.connectedCallback()
    this._root = this.shadowRoot

    const removeLink = this.shadowRoot.querySelector('.remove')
    // const removeLink = this.querySelector('.remove')
    removeLink.addEventListener('click', this.removeMovie)
  }

  disconnectedCallback () {
    super.disconnectedCallback()

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

window.customElements.define(MovieListItem.is, MovieListItem)

class MovieListItem extends HTMLElement {
  static get observedAttributes () {
    return ['name', 'colour', 'who']
  }

  constructor (_doc) {
    super()
    const link = document.querySelector('link[rel=import][href*="movie-list-item"]')
    const tmpl = link.import.querySelector('#movie-list-item-tmpl')

    this._root = this.attachShadow({mode: 'open'})
    this._root.appendChild(tmpl.content.cloneNode(true))

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
    switch (name) {
      case 'colour':
        break

      default:
        break
    }
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

window.customElements.define('movie-list-item', MovieListItem)

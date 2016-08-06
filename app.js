// @flow
const App = (function ($, _) {
  'use strict'

  const WHOS = {
    'Alex': 'info',
    'Matt': 'primary',
    'Rob': 'danger'
  }

  const selectContainer = document.querySelector('#selection')
  const listHtml = document.querySelector('#list').innerHTML
  const titleHtml = document.querySelector('#title').innerHTML
  const whosHtml = document.querySelector('#whos').innerHTML

  function init () {
    _firstRender()
    _addHandlers()
  }

  function render (movies, selection) {
    const selected = selection || 'Click Choose to select random idea...'
    const renderSelectView = _.template(listHtml)
    const html = renderSelectView({selected, movies, colours: WHOS})
    selectContainer.innerHTML = html

    if (movies.length) {
      document.querySelector('#choose').addEventListener('click', chooseRandom)

      const removes = document.querySelectorAll('a.remove')
      removes.forEach(remove => remove.addEventListener('click', removeMovie))
    }
  }

  function renderTitle () {
    const title = localStorage.getItem('title') || 'Movie Chooser'
    const renderTitleView = _.template(titleHtml)
    const newTitle = renderTitleView({title})

    const titleElement = document.createElement('div')
    titleElement.innerHTML = newTitle

    const container = document.querySelector('.container')
    container.insertBefore(titleElement, container.firstChild)
  }

  function renderWhos () {
    const renderWhosView = _.template(whosHtml)
    const whosSelect = document.querySelector('select')
    let options = whosSelect.innerHTML

    Object.keys(WHOS).forEach(who => {
      let whoElement = renderWhosView({who})
      options += whoElement
    })

    whosSelect.innerHTML = options
  }

  function fetchMovies () {
    const moviesString = localStorage.getItem('movies')
    return JSON.parse(moviesString) || []
  }

  function savetoStore (newMovie) {
    const movieList = fetchMovies()
    const isUnique = movieList.filter(movie => movie.name === newMovie.name).length === 0

    if (isUnique) {
      movieList.push(newMovie)

      const moviesString = JSON.stringify(movieList)
      localStorage.setItem('movies', moviesString)
    }
  }

  function addMovie (evt) {
    if (evt) evt.preventDefault()

    const formData = new FormData(evt.target)
    const movieName = formData.get('movie')
    const who = formData.get('who')

    if (movieName && who) {
      const newModel = {name: movieName, who}
      savetoStore(newModel)

      render(fetchMovies())
      _clearFormValues()

      // Re-focus name field for new entry
      document.querySelector('input[name=movie]').focus()
    }
  }

  function chooseRandom (evt) {
    if (evt) evt.preventDefault()

    const movies = fetchMovies()
    const rand = Math.floor(Math.random() * movies.length)
    const {name} = movies[rand]

    render(movies, name)
  }

  function removeMovie (evt) {
    if (evt) evt.preventDefault()

    const movieToDelete = evt.target.parentNode.getAttribute('data-remove')
    removeFromStore(movieToDelete)
    render(fetchMovies())
  }

  function removeFromStore (movieToDelete) {
    const movies = fetchMovies()
    const moviesWithoutRemoved = movies.filter(movie => movie.name !== movieToDelete)
    const moviesString = JSON.stringify(moviesWithoutRemoved)
    localStorage.setItem('movies', moviesString)
  }

  function _firstRender () {
    // Load movies and title, then render
    const movies = fetchMovies()
    render(movies)

    // Load stored title if one present
    renderTitle()

    // Load options for who suggested a movie
    renderWhos()
  }

  function _addHandlers () {
    const form = document.querySelector('form')
    const title = document.querySelector('.title')

    // Add handler to submit form
    form.addEventListener('submit', addMovie)

    // Add handler for editing title
    title.addEventListener('dblclick', evt => {
      // Make title editable and select all text
      evt.target.setAttribute('contenteditable', 'true')
      evt.target.focus()
      _selectText(evt.target)

      // Add handlers for Enter key to save title
      document.addEventListener('keypress', _saveTitleOnEnter)

      // Add handler to save title when you click/tap off title
      title.addEventListener('blur', _saveTitleOnBlur)
    })

    // Add doubletap handler for mobile
    $(title).on('doubletap', evt => {
      evt.preventDefault()
      evt.target.dispatchEvent(new MouseEvent('dblclick'))
    })
  }

  function _saveTitleOnEnter (evt) {
    if (evt.keyCode === 13) { // Enter
      evt.preventDefault()

      const focussed = document.querySelector(':focus')

      if (focussed === evt.target) {
        evt.target.blur()
      }
    }
  }

  function _saveTitleOnBlur (evt) {
    const newTitle = evt.target.innerText
    const storedTitle = localStorage.getItem('title') || 'Movie Chooser'

    if (newTitle) {
      if (newTitle !== storedTitle) {
        localStorage.setItem('title', newTitle)
      }
    } else {
      evt.target.innerText = storedTitle
    }

    evt.target.removeAttribute('contenteditable')

    // Remove save title handlers
    document.removeEventListener('keypress', _saveTitleOnEnter)
    document.querySelector('.title').removeEventListener('blur', _saveTitleOnBlur)
  }

  function _clearFormValues () {
    document.querySelector('input[name=movie]').value = ''
    document.querySelector('select[name=who]').value = ''
  }

  // Adapted StackOverflow answer from user Tom Oakley:
  // http://stackoverflow.com/a/12244703
  function _selectText (element) {
    let range = null
    if (document.body.createTextRange) {
      range = document.body.createTextRange()
      range.moveToElementText(element)
      range.select()
    } else if (window.getSelection) {
      const selection = window.getSelection()
      range = document.createRange()
      range.selectNodeContents(element)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  /*eslint-disable */

  /*
   * jQuery Double Tap
   * Developer: Sergey Margaritov (sergey@margaritov.net)
   * Date: 22.10.2013
   * Based on jquery documentation http://learn.jquery.com/events/event-extensions/
   */
  ;(function($){

    $.event.special.doubletap = {
      bindType: 'touchend',
      delegateType: 'touchend',

      handle: function(event) {
        var handleObj   = event.handleObj,
            targetData  = jQuery.data(event.target),
            now         = new Date().getTime(),
            delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
            delay       = delay == null ? 300 : delay;

        if (delta < delay && delta > 30) {
          targetData.lastTouch = null;
          event.type = handleObj.origType;
          ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
            event[property] = event.originalEvent.changedTouches[0][property];
          })

          // let jQuery handle the triggering of "doubletap" event handlers
          handleObj.handler.apply(this, arguments);
        } else {
          targetData.lastTouch = now;
        }
      }
    };

  })($);

  /*eslint-enable */

  return {
    init,
    fetchMovies,
    render,
    renderTitle,
    renderWhos,
    savetoStore,
    removeFromStore,
    chooseRandom
  }
})(window.$, window._)

window.$(document).ready(App.init)

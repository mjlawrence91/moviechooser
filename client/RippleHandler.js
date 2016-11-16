class RippleHandler {
  constructor () {
    this._selector = 'button.ripple'
  }

  init () {
    this._els = document.querySelectorAll(this._selector)

    Array.from(this._els).forEach(el => {
      el.addEventListener('click', this.onClick)
    })
  }

  get selector () {
    return this._selector || 'button.ripple'
  }

  set selector (sel) {
    if (!sel) {
      console.error(`The selector ${sel} is not valid. Please choose another.`)
      return
    }

    this._selector = sel
  }

  onClick (evt) {
    // Get element position
    const elem = evt.target

    // Create ripple element
    const ripple = document.createElement('div')
    elem.appendChild(ripple)

    ripple.classList.add('ripple-effect')
    ripple.style.width = elem.clientWidth
    ripple.style.height = elem.clientHeight
    ripple.style.left = `${evt.offsetX - (elem.clientWidth / 2)}px`
    ripple.style.top = `${evt.offsetY - (elem.clientHeight / 2)}px`

    // Remove ripple element after animation
    ripple.addEventListener('animationend', _ => {
      requestAnimationFrame(_ => ripple.remove())
    })
  }
}

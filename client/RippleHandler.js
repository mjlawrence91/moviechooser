class RippleHandler {
  constructor () {
    this._selector = 'button.ripple'
  }

  init () {
    this._els = document.querySelectorAll(this._selector)
    this._elementProxies = Array.from(this._els).map(el => {
      return {
        elem: el,
        clientWidth: el.clientWidth,
        offsetWidth: el.offsetWidth,
        clientHeight: el.clientHeight,
        offsetHeight: el.offsetHeight
      }
    })

    Array.from(this._els).forEach(el => {
      const proxy = this._elementProxies.find(proxy => proxy.elem === el)
      el.addEventListener('click', evt => this.onClick(evt, proxy))
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

  onClick (evt, proxy) {
    const {offsetX, offsetY} = evt

    requestAnimationFrame(_ => {
      // Get element position
      const {clientWidth, clientHeight, elem} = proxy

      // Create ripple element
      const ripple = document.createElement('div')
      elem.appendChild(ripple)

      ripple.classList.add('ripple-effect')
      ripple.style.width = clientWidth
      ripple.style.height = clientHeight
      ripple.style.left = `${offsetX - (clientWidth / 2)}px`
      ripple.style.top = `${offsetY - (clientHeight / 2)}px`

      // Remove ripple element after animation
      ripple.addEventListener('animationend', _ => {
        requestAnimationFrame(_ => ripple.remove())
      })
    })
  }
}

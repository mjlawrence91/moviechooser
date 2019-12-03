export default class MovieRequest {
  constructor (path) {
    if (!path) {
      return new Error('No path defined.')
    }

    this._path = path
    this._xhr = new XMLHttpRequest()
  }

  set path (_path) {
    if (!_path) {
      return new Error('No path defined.')
    }

    this._path = _path
  }

  get path () {
    return this._path
  }

  _send (method, body) {
    return new Promise((resolve, reject) => {
      this._xhr.open(method, this._path)

      this._handleResponse = _ => {
        if (this._xhr.status >= 200 && this._xhr.status < 300) {
          const movies = JSON.parse(this._xhr.response)
          resolve(movies)
        } else {
          this._handleError(reject, this._xhr.status, this._xhr.statusText)
        }
      }

      this._handleError = (reject, status, statusText) => {
        reject({ status, statusText })
      }

      this._xhr.onload = this._handleResponse
      this._xhr.onerror = this._handleError

      this._xhr.setRequestHeader('Content-Type', 'application/json')

      const bodyString = JSON.stringify(body)
      this._xhr.send(bodyString)
    })
  }

  get () {
    return this._send('GET')
  }

  post (requestBody) {
    if (!requestBody) {
      return new Error('No request body found.')
    }
    return this._send('POST', requestBody)
  }

  delete () {
    return this._send('DELETE')
  }
}

import {db} from 'config'
import {MongoClient} from 'mongodb'

let _instance = null

function _resolveURL () {
  const creds = (db.username && db.password) ? `${db.username}:${db.password}@` : ''
  return `mongodb://${creds}${db.host}:${db.port}/${db.name}`
}

const connect = async _ => {
  if (!_instance) {
    const url = _resolveURL()
    _instance = await MongoClient.connect(url)
  }
}

export { _instance as db, connect }

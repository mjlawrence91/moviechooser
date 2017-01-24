import {db} from 'config'
import {MongoClient} from 'mongodb'

let _instance = null

function _resolveURL () {
  return `mongodb://${db.host}:${db.port}/${db.name}`
}

const connect = async _ => {
  if (!_instance) {
    const url = _resolveURL()
    _instance = await MongoClient.connect(url)
  }
}

export { _instance as db, connect }

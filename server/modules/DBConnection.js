import {MongoClient} from 'mongodb'
import {db} from 'config'

let _instance = null

function _resolveURL () {
  return `mongodb://${db.host}:${db.port}/${db.name}`
}

const connect = async () => {
  if (!_instance) {
    const url = _resolveURL()
    _instance = await MongoClient.connect(url)
  }
}

export { _instance as db, connect }

import {ObjectId} from 'mongodb'
import {db} from '../modules/DBConnection'

export default {
  async read (req, res) {
    const collection = db.collection('whos')
    const query = (req.params.id) ? {_id: ObjectId(req.params.id)} : {}
    const whos = await collection.find(query).toArray()
    res.status(200).send(whos)
  }
}

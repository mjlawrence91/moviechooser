import {ObjectId} from 'mongodb'
import {db} from '../modules/DBConnection'

export default {
  async read (req, res) {
    const collection = db.collection('movies')
    const query = (req.params.id) ? {_id: ObjectId(req.params.id)} : {}
    const movies = await collection.find(query).toArray()
    res.status(200).send(movies)
  },

  async create (req, res) {
    const body = (Object.keys(req.body).length) ? req.body : null

    if (body) {
      const collection = db.collection('movies')
      const movie = await collection.insert(req.body)
      const [inserted] = movie.ops
      res.status(201).json(inserted)
    } else {
      res.status(400).json({message: 'No body sent.'})
    }
  },

  async delete (req, res) {
    const collection = db.collection('movies')

    try {
      await collection.deleteOne({_id: ObjectId(req.params.id)})
      res.status(200).json({deleted: req.params.id})
    } catch (error) {
      res.status(400).json({message: error.toString()})
    }
  }
}

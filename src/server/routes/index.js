import db from '../modules/DBConnection'

export default {
  async read (req, res) {
    const movies = await db.ref('/').once('value')
      .then(snapshot => snapshot.val())

    res.status(200).send(movies)
  },

  async create (req, res) {
    const body = (Object.keys(req.body).length) ? req.body : null

    if (body) {
      const newKey = db.ref().push().key
      const inserted = { _id: newKey, ...body }
      await db.ref('/').update({ ['/' + newKey]: inserted })

      res.status(201).json(inserted)
    } else {
      res.status(400).json({ message: 'No body sent.' })
    }
  },

  async delete (req, res) {
    const keyToDelete = req.params.id

    try {
      await db.ref(`/${keyToDelete}`).remove()
      res.status(200).json({ deleted: keyToDelete })
    } catch (error) {
      res.status(400).json({ message: error.toString() })
    }
  }
}

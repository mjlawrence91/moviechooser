import * as functions from 'firebase-functions'
import app from './server/app'

exports.api = functions.https.onRequest(app)

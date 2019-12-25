import * as firebase from 'firebase/app'
import 'firebase/database'

import config from '../utils/config'

firebase.initializeApp({
  apiKey: config.get('FIREBASE_APIKEY'),
  authDomain: config.get('FIREBASE_AUTHDOMAIN'),
  databaseURL: config.get('FIREBASE_DATABASEURL'),
  projectId: config.get('FIREBASE_PROJECTID'),
  storageBucket: config.get('FIREBASE_STORAGEBUCKET'),
  messagingSenderId: config.get('FIREBASE_MESSAGINGSENDERID'),
  appId: config.get('FIREBASE_APPID'),
  measurementId: config.get('FIREBASE_MEASUREMENTID')
})

export default firebase.database()

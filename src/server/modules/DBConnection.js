import config from 'config'
import * as firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = config.get('firebase')
firebase.initializeApp(firebaseConfig)

export default firebase.database()

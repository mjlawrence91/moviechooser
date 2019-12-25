# moviechooser

**moviechooser** is an app for choosing a random movie night idea from a predefined list.

## Setup

The following environment variables must be setup to run the app. To do this, a `.env` file must be created in the project root (see example `.sample-env` file).

```
SERVER_PORT=
FIREBASE_APIKEY=api-key
FIREBASE_AUTHDOMAIN=project-id.firebaseapp.com
FIREBASE_DATABASEURL=https://project-id.firebaseio.com
FIREBASE_PROJECTID=project-id
FIREBASE_STORAGEBUCKET=project-id.appspot.com
FIREBASE_MESSAGINGSENDERID=sender-id
FIREBASE_APPID=app-id
FIREBASE_MEASUREMENTID=G-measurement-id
```

## Technology

### Frontend

- Now built using Custom Elements v1. Elements bundled using [Rollup](https://rollupjs.org/).

### Backend

- Application hosted on a [DigitalOcean](https://www.digitalocean.com/) droplet. Data held in [Firebase](https://firebase.google.com/).

### Credits

- Double tap event handler function comes from [this StackOverflow answer](http://stackoverflow.com/a/32761323) by user [Anulal S](http://stackoverflow.com/users/3951761/anulal-s).
- `selectText` function is adapted from jQuery plugin given in [this StackOverflow answer](http://stackoverflow.com/a/12244703) by user [Tom Oakley](http://stackoverflow.com/users/1125251/tom-oakley).

## Contact

#### MJ Lawrence

- Twitter: [@mjlawrence](https://twitter.com/mjlawrence "mjlawrence on twitter")

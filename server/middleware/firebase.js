const { initializeApp } = reqiure('firebase/app')
const { getStorage } = require('firebase/storage')
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

module.exports = storage
const admin = require("firebase-admin")

var serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialape-34cf0.firebaseio.com",
  storageBucket: "socialape-34cf0.appspot.com"
})

const db = admin.firestore()

module.exports = { admin, db }

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require("../fireConfig.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
// const storage = getStorage();
module.exports = {
  db,
  // storage,
};

// db.collection("users")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error getting documents: ", error);
//   });

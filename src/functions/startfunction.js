const { db } = require("../fbase");

function startfunction(interaction) {
  let data1 = "not changed";
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        if (doc.id === "aturing") {
          data1 = doc.data().middle;
          console.log(`3 injection ${data1}`);
        }
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });

  interaction.reply(data1);
}

module.exports = startfunction;

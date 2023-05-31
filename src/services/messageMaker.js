const { db } = require("../fbase");
const farmImageMaker = require("./farmImageMaker");
const rowMaker = require("./rowMaker");

async function messageMaker(interaction, functionName, type) {
  let user;
  let imageUrl;
  switch (type) {
    case "author":
      user = interaction.author;
      imageUrl = "attachment://myFarm.png";
      break;
    case "user":
      user = interaction.user;
      imageUrl = "attachment://myFarm.png";
      break;
  }
  const id = user.id;
  const userRef = db.collection("users").doc(id);
  const userData = (await userRef.get()).data();
  const cropRef = userRef.collection("myFarm").doc("crop1");
  const cropData = (await cropRef.get()).data();
  const time = cropData.createAt._seconds;
  const type = cropData.type;
  const title = `${user.username}'s ${functionName}`;
  const content = `💰 ${userData.gold}`;

  const attachment = await farmImageMaker(type, time);
  const rows = rowMaker("farm");
  const message = {
    content: "",
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: imageUrl,
        },
      },
    ],
    files: [attachment],
    components: rows,
  };

  return message;
}

module.exports = messageMaker;

const { db } = require(__dirname + "/../fbase");
const farmImageMaker = require(__dirname + "/farmImageMaker");
const inventoryImageMaker = require(__dirname + "/inventoryImageMaker");
const rowMaker = require(__dirname + "/rowMaker");
const { shopBaseUrl } = require(__dirname + "/../assets/bases");

async function farmMessageMaker(interaction, type, systemMessage) {
  // console.log(interaction);
  let user;
  if (type === "main") {
    user = interaction.author;
  } else if (type === "refresh") {
    user = interaction.user;
  }

  // if (interaction.author) {
  //   console.log(1);
  //   user = interaction.author;
  // } else if (interaction.user) {
  //   console.log(2);
  //   user = interaction.user;
  // }

  // if (messageType === "author") {
  //   user = interaction.author;
  //   if (harvestedCrop1Number === 0 || harvestedCrop2Number === 0) {
  //     systemMessage = `nothing to harvest`;
  //   } else if (harvestedCrop1Number !== 0 || harvestedCrop2Number === 0) {
  //     systemMessage = `${harvestedCrop1Number} carrots harvested`;
  //   } else if (harvestedCrop1Number === 0 || harvestedCrop2Number !== 0) {
  //     systemMessage = `${harvestedCrop2Number} pumpkins harvested`;
  //   } else {
  //     systemMessage = `${harvestedCrop1Number} carrots, ${harvestedCrop2Number} pumpkins harvested`;
  //   }
  // } else if (messageType === "user") {
  //   user = interaction.user;
  //   if (harvestedCrop1Number === 0 || harvestedCrop2Number === 0) {
  //     systemMessage = `nothing to harvest`;
  //   } else if (harvestedCrop1Number !== 0 || harvestedCrop2Number === 0) {
  //     systemMessage = `${harvestedCrop1Number} carrots harvested`;
  //   } else if (harvestedCrop1Number === 0 || harvestedCrop2Number !== 0) {
  //     systemMessage = `${harvestedCrop2Number} pumpkins harvested`;
  //   } else {
  //     systemMessage = `${harvestedCrop1Number} carrots, ${harvestedCrop2Number} pumpkins harvested`;
  //   }
  // } else if (messageType === "first") {
  //   user = interaction.author;
  //   systemMessage = "";
  // } else if (messageType === "refresh") {
  //   user = interaction.user;
  //   systemMessage = "";
  // }

  const cropNames = [
    "crop1",
    "crop2",
    "crop3",
    "crop4",
    "crop5",
    "crop6",
    "crop7",
    "crop8",
    "crop9",
  ];
  let cropDataArray = [];

  for (cropName of cropNames) {
    const collection = db
      .collection("users")
      .doc(user.id)
      .collection("farm")
      .doc(cropName);
    const snapshot = await collection.get();
    const data = snapshot.data();
    if (data.type && data.createdAt) {
      cropDataArray.push({
        name: snapshot.id,
        type: data.type,
        time: new Date().getTime() / 1000 - data.createdAt._seconds,
      });
    } else {
      cropDataArray.push({
        name: cropName,
        type: 0,
      });
    }
  }
  console.log(cropDataArray);

  const userRef = db.collection("users").doc(user.id);
  const userData = (await userRef.get()).data();
  const title = `${user.username}'s farm`;
  const content = `💰 ${userData.gold}`;

  const attachment = await farmImageMaker(cropDataArray);
  const rows = rowMaker("farm");
  const message = {
    content: "",
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: "attachment://myFarm.png",
        },
        footer: {
          text: systemMessage,
        },
      },
    ],
    files: [attachment],
    components: rows,
  };

  return message;
}

async function shopMessageMaker(interaction, systemMessage) {
  const imageUrl = shopBaseUrl;
  console.log(`shopMessageMaker's system message is ${systemMessage}`);
  const user = interaction.user;
  const id = user.id;
  const userRef = db.collection("users").doc(id);
  const userData = (await userRef.get()).data();
  const title = `${user.username}'s shop`;
  const content = `💰 ${userData.gold}`;

  const rows = rowMaker("shop");
  const message = {
    content: "",
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: imageUrl,
        },
        footer: {
          text: systemMessage,
        },
      },
    ],
    files: [],
    components: rows,
  };

  return message;
}

async function inventoryMessageMaker(interaction, systemMessage) {
  const user = interaction.user;
  const id = user.id;
  const userRef = db.collection("users").doc(id);
  const userData = (await userRef.get()).data();
  const title = `${user.username}'s inventory`;
  const content = `💰 ${userData.gold}`;
  const seed1Ref = userRef.collection("inventory").doc("seed1");
  const seed1Number = (await seed1Ref.get()).data().number;
  const seed2Ref = userRef.collection("inventory").doc("seed2");
  const seed2Number = (await seed2Ref.get()).data().number;
  const harvested1Ref = userRef.collection("inventory").doc("harvested1");
  const harvested1Number = (await harvested1Ref.get()).data().number;
  const harvested2Ref = userRef.collection("inventory").doc("harvested2");
  const harvested2Number = (await harvested2Ref.get()).data().number;
  const dishRef = userRef.collection("inventory").doc("dish");
  const dishNumber = (await dishRef.get()).data().number;
  const attachment = await inventoryImageMaker(
    seed1Number,
    seed2Number,
    harvested1Number,
    harvested2Number,
    dishNumber
  );

  const rows = rowMaker("inventory");
  const message = {
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: "attachment://myInventory.png",
        },
        footer: {
          text: systemMessage,
        },
      },
    ],
    files: [attachment],
    components: rows,
  };

  return message;
}
module.exports = { farmMessageMaker, shopMessageMaker, inventoryMessageMaker };

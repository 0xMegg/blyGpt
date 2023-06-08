const { db } = require(__dirname + "/../fbase");
const farmImageMaker = require(__dirname + "/farmImageMaker");
const inventoryImageMaker = require(__dirname + "/inventoryImageMaker");
const rowMaker = require(__dirname + "/rowMaker");
const { shopBaseUrl } = require(__dirname + "/../assets/bases");

async function farmMessageMaker(interaction, userType) {
  let user;
  if (userType === "author") {
    user = interaction.author;
  } else if (userType === "user") {
    user = interaction.user;
  }
  const id = user.id;
  const userRef = db.collection("users").doc(user.id);
  const userData = (await userRef.get()).data();
  const cropRef = userRef.collection("myFarm").doc("crop1");
  const cropData = (await cropRef.get()).data();
  const time = cropData?.createAt?._seconds;
  const type = cropData?.type;
  const title = `${user.username}'s farm`;
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
          url: "attachment://myFarm.png",
        },
      },
    ],
    files: [attachment],
    components: rows,
  };

  return message;
}

async function shopMessageMaker(interaction) {
  const imageUrl = shopBaseUrl;

  const user = interaction.user;
  const id = user.id;
  const userRef = db.collection("users").doc(id);
  const userData = (await userRef.get()).data();
  const title = `${user.username}'s shop`;
  const content = `💰 ${userData.gold}`;

  const rows = rowMaker("shop");
  const message = {
    content: "shop",
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: imageUrl,
        },
      },
    ],
    files: [],
    components: rows,
  };

  return message;
}

async function inventoryMessageMaker(interaction) {
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
  const attachment = await inventoryImageMaker(
    seed1Number,
    seed2Number,
    harvested1Number,
    harvested2Number
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
      },
    ],
    files: [attachment],
    components: rows,
  };

  return message;
}
module.exports = { farmMessageMaker, shopMessageMaker, inventoryMessageMaker };

const { db } = require("../fbase");
const invenfunction = require("../functions/invenfunction");
const getTime = require("../services/utility");

async function sellCrop(interaction, cropType) {
  let systemMessage;
  const userRef = db.collection("users").doc(interaction.user.id);
  const harvestedRef = userRef.collection("inventory").doc(cropType);
  const harvestedData = (await harvestedRef.get()).data();
  const harvestedNumber = harvestedData.number;
  if (harvestedNumber > 0) {
    if (cropType === "harvested1") {
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      harvestedRef.update({ number: harvestedNumber - 1 });
      userRef.update({ gold: userGold + 1 });
      systemMessage = `${getTime()} You sell a Carrot by 1 Gold`;
    } else if (cropType === "harvested2") {
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      harvestedRef.update({ number: harvestedNumber - 1 });
      userRef.update({ gold: userGold + 2 });
      systemMessage = `${getTime()} You sell a Pumpkin by 2 Gold`;
    }
  } else {
    systemMessage = `${getTime} no crops to sell`;
  }
  invenfunction(interaction, "editReply", systemMessage);
}

module.exports = sellCrop;

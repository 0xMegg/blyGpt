const { db } = require("../fbase");
const invenfunction = require("../functions/invenfunction");
const getTime = require("../services/utility");

const {
  crop1Name,
  crop1SellingCost,
  crop2Name,
  crop2SellingCost,
} = require("../config");

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
      userRef.update({ gold: userGold + crop1SellingCost });
      systemMessage = `${getTime()} You sell a ${crop1Name} by ${crop1SellingCost} Gold`;
    } else if (cropType === "harvested2") {
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      harvestedRef.update({ number: harvestedNumber - 1 });
      userRef.update({ gold: userGold + crop2SellingCost });
      systemMessage = `${getTime()} You sell a ${crop2Name} by ${crop2SellingCost} Gold`;
    }
  } else {
    systemMessage = `${getTime} no crops to sell`;
  }
  invenfunction(interaction, "editReply", systemMessage);
}

module.exports = sellCrop;

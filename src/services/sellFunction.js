const { db } = require("../fbase");
const invenfunction = require("../functions/invenfunction");
const getTime = require("../services/utility");

const {
  currencyName,
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
      systemMessage = `${getTime()} ${crop1SellingCost}${currencyName}를 받고 ${crop1Name}을 팔았습니다`;
    } else if (cropType === "harvested2") {
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      harvestedRef.update({ number: harvestedNumber - 1 });
      userRef.update({ gold: userGold + crop2SellingCost });
      systemMessage = `${getTime()} ${crop2SellingCost}${currencyName}를 받고 ${crop2Name}을 팔았습니다`;
    }
  } else {
    systemMessage = `${getTime} 팔 수 있는 작물이 없습니다 :(`;
  }
  invenfunction(interaction, "update", systemMessage);
}

module.exports = sellCrop;

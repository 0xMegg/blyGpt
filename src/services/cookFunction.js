const { db } = require("../fbase");
const invenfunction = require("../functions/invenfunction");
const getTime = require("../services/utility");
const {
  crop1Name,
  crop2Name,
  crop1NeededNumber,
  crop2NeededNumber,
  dishName,
} = require("../config");

async function cook(interaction) {
  let systemMessage = `${getTime()} ${crop1Name} ${crop1NeededNumber}개, ${crop2Name} ${crop2NeededNumber}개가 필요합니다.`;
  const userRef = db.collection("users").doc(interaction.user.id);
  const harvested1Ref = userRef.collection("inventory").doc("harvested1");
  const harvested2Ref = userRef.collection("inventory").doc("harvested2");
  const dishRef = userRef.collection("inventory").doc("dish");
  const harvested1Data = (await harvested1Ref.get()).data();
  const harvested2Data = (await harvested2Ref.get()).data();
  const dishData = (await dishRef.get()).data();
  const harvested1Number = harvested1Data.number;
  const harvested2Number = harvested2Data.number;
  const dishNumber = dishData.number;
  if (
    harvested1Number >= crop1NeededNumber &&
    harvested2Number >= crop2NeededNumber
  ) {
    harvested1Ref.update({ number: harvested1Number - crop1NeededNumber });
    harvested2Ref.update({ number: harvested2Number - crop2NeededNumber });
    dishRef.update({ number: dishNumber + 1 });
    systemMessage = `${getTime()} ${dishName}가 완성되었습니다.`;
  }
  invenfunction(interaction, "update", systemMessage);
}

module.exports = cook;

const { db } = require("../fbase");
const invenfunction = require("../functions/invenfunction");
const getTime = require("../services/utility");

async function cook(interaction) {
  let systemMessage = `not enough to cook`;
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
  if (harvested1Number > 2 && harvested2Number > 1) {
    harvested1Ref.update({ number: harvested1Number - 2 });
    harvested2Ref.update({ number: harvested2Number - 1 });
    dishRef.update({ number: dishNumber + 1 });
    systemMessage = `${getTime()} 1dish is completed`;
  }
  invenfunction(interaction, "editReply", systemMessage);
}

module.exports = cook;

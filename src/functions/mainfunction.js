const { db } = require("../fbase");

const farmfunction = require("./farmfunction");
const shopfunction = require("./shopfunction");
const invenfunction = require("./invenfunction");
const getTime = require("../services/utility");
const sellCrop = require("../services/sellFunction");
const cook = require("../services/cookFunction");

const {
  gameName,
  currencyName,
  crop1Name,
  crop1buyingCost,
  crop2Name,
  crop2buyingCost,
  startGold,
  crop1SproutTime,
  crop2SproutTime,
} = require("../config");

async function mainfunction(interaction) {
  const userDoc = db.collection("users").doc(interaction.author.id);
  const snapshot = await userDoc.get();
  if (!snapshot.exists) {
    const userDoc = db.collection("users").doc(interaction.author.id);
    const crop1Doc = userDoc.collection("farm").doc("crop1");
    const crop2Doc = userDoc.collection("farm").doc("crop2");
    const crop3Doc = userDoc.collection("farm").doc("crop3");
    const crop4Doc = userDoc.collection("farm").doc("crop4");
    const crop5Doc = userDoc.collection("farm").doc("crop5");
    const crop6Doc = userDoc.collection("farm").doc("crop6");
    const crop7Doc = userDoc.collection("farm").doc("crop7");
    const crop8Doc = userDoc.collection("farm").doc("crop8");
    const crop9Doc = userDoc.collection("farm").doc("crop9");
    const seed1Doc = userDoc.collection("inventory").doc("seed1");
    const seed2Doc = userDoc.collection("inventory").doc("seed2");
    const harvested1Doc = userDoc.collection("inventory").doc("harvested1");
    const harvested2Doc = userDoc.collection("inventory").doc("harvested2");
    const dishDoc = userDoc.collection("inventory").doc("dish");
    await userDoc.set({
      discordId: interaction.author.id,
      lastLogin: new Date(),
      gold: startGold,
    });
    await crop1Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop2Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop3Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop4Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop5Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop6Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop7Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop8Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop9Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await seed1Doc.set({
      number: 0,
    });
    await seed2Doc.set({
      number: 0,
    });
    await harvested1Doc.set({
      number: 0,
    });
    await harvested2Doc.set({
      number: 0,
    });
    await dishDoc.set({
      number: 0,
    });
  }
  farmfunction(interaction, "main");

  const collector = interaction.channel.createMessageComponentCollector({});

  collector.on("collect", async (interaction) => {
    if (interaction.customId === "location") {
      if (interaction.values[0] === "farm") {
        farmfunction(interaction, "refresh");
      } else if (interaction.values[0] === "shop") {
        shopfunction(interaction, "update");
      } else if (interaction.values[0] === "inventory") {
        invenfunction(interaction, "update");
      }
    } else if (interaction.customId === "seed1") {
      let systemMessage;
      const userRef = db.collection("users").doc(interaction.user.id);
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      if (userGold < crop1buyingCost) {
        systemMessage = `${getTime()} ${currencyName}가 부족합니다.`;
      } else {
        userRef.update({ gold: userGold - 1 });
        const seed1Ref = userRef.collection("inventory").doc("seed1");
        const seedNumber = (await seed1Ref.get()).data().number;
        seed1Ref.set({
          number: seedNumber + 1,
        });
        systemMessage = `${getTime()} ${crop1buyingCost}${currencyName}로 ${crop1Name}을 구매하셨습니다`;
      }
      shopfunction(interaction, "update", systemMessage);
    } else if (interaction.customId === "seed2") {
      let systemMessage;
      const userRef = db.collection("users").doc(interaction.user.id);
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      if (userGold < crop2buyingCost) {
        systemMessage = `${getTime()} ${currencyName}가 부족합니다.`;
      } else {
        userRef.update({ gold: userGold - 2 });
        const seed2Ref = userRef.collection("inventory").doc("seed2");
        const seedNumber = (await seed2Ref.get()).data().number;
        seed2Ref.set({
          number: seedNumber + 1,
        });
        systemMessage = `${getTime()} ${crop2buyingCost}${currencyName}로 ${crop2Name}을 구매하셨습니다`;
      }
      shopfunction(interaction, "update", systemMessage);
    } else if (interaction.customId === "refresh") {
      farmfunction(interaction, "refresh");
    } else if (interaction.customId === "harvest") {
      let harvestedCrop1Number = 0;
      let harvestedCrop2Number = 0;
      let systemMessage;
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
      for (cropName of cropNames) {
        const collection = db
          .collection("users")
          .doc(interaction.user.id)
          .collection("farm")
          .doc(cropName);
        const snapshot = await collection.get();
        const data = snapshot.data();
        if (data.type && data.createdAt) {
          const time = new Date().getTime() / 1000 - data.createdAt._seconds;
          if (data.type === 1) {
            if (time > crop1SproutTime) {
              // console.log(`${cropName} / ${data.type} / ${time} / ready`);
              collection.update({ type: 0 });
              const harvested1Ref = db
                .collection("users")
                .doc(interaction.user.id)
                .collection("inventory")
                .doc("harvested1");
              const harvested1Number = (await harvested1Ref.get()).data()
                .number;
              harvested1Ref.update({ number: harvested1Number + 1 });
              harvestedCrop1Number++;
            }
            // else {
            //   console.log(`${cropName} / ${data.type} / ${time} / not ready`);
            // }
          } else if (data.type === 2) {
            if (time > crop2SproutTime) {
              // console.log(`${cropName} / ${data.type} / ${time} / ready`);
              collection.update({ type: 0 });
              const harvested2Ref = db
                .collection("users")
                .doc(interaction.user.id)
                .collection("inventory")
                .doc("harvested2");
              const harvested2Number = (await harvested2Ref.get()).data()
                .number;
              harvested2Ref.update({ number: harvested2Number + 1 });
              harvestedCrop2Number++;
            }
            // else {
            //   console.log(`${cropName} / ${data.type} / ${time} / not ready`);
            // }
          }
        }
      }
      if (harvestedCrop1Number !== 0 && harvestedCrop2Number !== 0) {
        systemMessage = `${getTime()} ${crop1Name} ${harvestedCrop1Number}개 , ${crop2Name} ${harvestedCrop2Number}개 수확했어요!`;
      } else if (harvestedCrop1Number === 0 && harvestedCrop2Number !== 0) {
        systemMessage = `${getTime()} ${crop2Name} ${harvestedCrop2Number}개 수확했어요!`;
      } else if (harvestedCrop1Number !== 0 && harvestedCrop2Number === 0) {
        systemMessage = `${getTime()} ${crop1Name} ${harvestedCrop1Number}개 수확했어요!`;
      } else {
        systemMessage = `${getTime()} 수확할게 없어요 :(`;
      }
      // console.log(
      //   `${harvestedCrop1Number}, ${harvestedCrop2Number}, ${systemMessage}`
      // );
      farmfunction(interaction, "refresh", systemMessage);
    } else if (interaction.customId === "plant1") {
      let systemMessage;
      const userRef = db.collection("users").doc(interaction.user.id);
      const seed1Ref = userRef.collection("inventory").doc("seed1");
      const seed1Number = (await seed1Ref.get()).data().number;
      const crop1Ref = userRef.collection("farm").doc("crop1");
      const crop1Type = (await crop1Ref.get()).data().type;
      const crop2Ref = userRef.collection("farm").doc("crop2");
      const crop2Type = (await crop2Ref.get()).data().type;
      const crop3Ref = userRef.collection("farm").doc("crop3");
      const crop3Type = (await crop3Ref.get()).data().type;
      const crop4Ref = userRef.collection("farm").doc("crop4");
      const crop4Type = (await crop4Ref.get()).data().type;
      const crop5Ref = userRef.collection("farm").doc("crop5");
      const crop5Type = (await crop5Ref.get()).data().type;
      const crop6Ref = userRef.collection("farm").doc("crop6");
      const crop6Type = (await crop6Ref.get()).data().type;
      const crop7Ref = userRef.collection("farm").doc("crop7");
      const crop7Type = (await crop7Ref.get()).data().type;
      const crop8Ref = userRef.collection("farm").doc("crop8");
      const crop8Type = (await crop8Ref.get()).data().type;
      const crop9Ref = userRef.collection("farm").doc("crop9");
      const crop9Type = (await crop9Ref.get()).data().type;
      if (seed1Number > 0) {
        if (crop1Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop1Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 1번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop2Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop2Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 2번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop3Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop3Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 3번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop4Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop4Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 4번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop5Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop5Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 5번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop6Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop6Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 6번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop7Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop7Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 7번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop8Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop8Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 8번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop9Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop9Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 9번 자리에 ${crop1Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else {
          systemMessage = `${getTime()} 밭에 씨앗을 심을 장소가 없어요!`;
          invenfunction(interaction, "update", systemMessage);
        }
      } else {
        systemMessage = `${getTime()} 심을 씨앗이 없어요 :(`;
        invenfunction(interaction, "update", systemMessage);
      }
    } else if (interaction.customId === "plant2") {
      let systemMessage;
      const userRef = db.collection("users").doc(interaction.user.id);
      const seed2Ref = userRef.collection("inventory").doc("seed2");
      const seed2Number = (await seed2Ref.get()).data().number;
      const crop1Ref = userRef.collection("farm").doc("crop1");
      const crop1Type = (await crop1Ref.get()).data().type;
      const crop2Ref = userRef.collection("farm").doc("crop2");
      const crop2Type = (await crop2Ref.get()).data().type;
      const crop3Ref = userRef.collection("farm").doc("crop3");
      const crop3Type = (await crop3Ref.get()).data().type;
      const crop4Ref = userRef.collection("farm").doc("crop4");
      const crop4Type = (await crop4Ref.get()).data().type;
      const crop5Ref = userRef.collection("farm").doc("crop5");
      const crop5Type = (await crop5Ref.get()).data().type;
      const crop6Ref = userRef.collection("farm").doc("crop6");
      const crop6Type = (await crop6Ref.get()).data().type;
      const crop7Ref = userRef.collection("farm").doc("crop7");
      const crop7Type = (await crop7Ref.get()).data().type;
      const crop8Ref = userRef.collection("farm").doc("crop8");
      const crop8Type = (await crop8Ref.get()).data().type;
      const crop9Ref = userRef.collection("farm").doc("crop9");
      const crop9Type = (await crop9Ref.get()).data().type;
      if (seed2Number > 0) {
        if (crop1Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop1Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 1번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop2Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop2Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 2번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop3Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop3Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 3번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop4Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop4Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 4번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop5Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop5Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 5번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop6Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop6Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 6번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop7Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop7Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 7번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop8Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop8Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 8번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else if (crop9Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop9Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} 9번 자리에 ${crop2Name}을 심으셨습니다`;
          invenfunction(interaction, "update", systemMessage);
        } else {
          systemMessage = `${getTime()} 밭에 씨앗을 심을 장소가 없어요!`;
          invenfunction(interaction, "update", systemMessage);
        }
      } else {
        systemMessage = `${getTime()} 심을 씨앗이 없어요 :(`;
        invenfunction(interaction, "update", systemMessage);
      }
    } else if (interaction.customId === "sell1") {
      sellCrop(interaction, "harvested1");
    } else if (interaction.customId === "sell2") {
      sellCrop(interaction, "harvested2");
    } else if (interaction.customId === "cook") {
      cook(interaction);
    } else {
      interaction.channel.send(`${interaction.customId} 미구현 기능입니다`);
    }
  });
}

module.exports = mainfunction;

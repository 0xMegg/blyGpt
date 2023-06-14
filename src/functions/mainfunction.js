const { db } = require(__dirname + "/../fbase");

const farmfunction = require(__dirname + "/farmfunction");
const shopfunction = require(__dirname + "/shopfunction");
const invenfunction = require(__dirname + "/invenfunction");
const getTime = require(__dirname + "/../services/utility");
const sellCrop = require(__dirname + "/../services/sellFunction");

async function mainfunction(interaction) {
  farmfunction(interaction, "main");

  const collector = interaction.channel.createMessageComponentCollector({});

  collector.on("collect", async (interaction) => {
    await interaction.deferUpdate();
    if (interaction.customId === "location") {
      if (interaction.values[0] === "farm") {
        farmfunction(interaction, "refresh");
      } else if (interaction.values[0] === "shop") {
        shopfunction(interaction, "editReply");
      } else if (interaction.values[0] === "inventory") {
        invenfunction(interaction, "editReply");
      }
    } else if (interaction.customId === "seed1") {
      let systemMessage;
      const userRef = db.collection("users").doc(interaction.user.id);
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      if (userGold < 1) {
        console.log("not enough gold");
      } else {
        console.log("-----before-----");
        console.log(userGold);
        userRef.update({ gold: userGold - 1 });
        const seed1Ref = userRef.collection("inventory").doc("seed1");
        const seedNumber = (await seed1Ref.get()).data().number;
        seed1Ref.set({
          number: seedNumber + 1,
        });
        systemMessage = `${getTime()} You got Carrot seed with 1 gold`;
        setTimeout(async () => {
          const newUserRef = db.collection("users").doc(interaction.user.id);
          const newUserData = (await newUserRef.get()).data();
          console.log("-----after-----");
          console.log(newUserData.gold);
        }, 1000);
      }
      shopfunction(interaction, "editReply", systemMessage);
    } else if (interaction.customId === "seed2") {
      let systemMessage;
      const userRef = db.collection("users").doc(interaction.user.id);
      const userData = (await userRef.get()).data();
      const userGold = userData.gold;
      if (userGold < 2) {
        console.log("not enough gold");
      } else {
        console.log("-----before-----");
        console.log(userGold);
        userRef.update({ gold: userGold - 2 });
        const seed2Ref = userRef.collection("inventory").doc("seed2");
        const seedNumber = (await seed2Ref.get()).data().number;
        seed2Ref.set({
          number: seedNumber + 1,
        });
        systemMessage = `${getTime()} You got Pumpkin seed with 2 gold`;
        setTimeout(async () => {
          const newUserRef = db.collection("users").doc(interaction.user.id);
          const newUserData = (await newUserRef.get()).data();
          console.log("-----after-----");
          console.log(newUserData.gold);
        }, 1000);
      }
      shopfunction(interaction, "editReply", systemMessage);
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
            if (time > 10) {
              console.log(`${cropName} / ${data.type} / ${time} / ready`);
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
            } else {
              console.log(`${cropName} / ${data.type} / ${time} / not ready`);
            }
          } else if (data.type === 2) {
            if (time > 20) {
              console.log(`${cropName} / ${data.type} / ${time} / ready`);
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
            } else {
              console.log(`${cropName} / ${data.type} / ${time} / not ready`);
            }
          }
        }
      }
      if (harvestedCrop1Number !== 0 && harvestedCrop2Number !== 0) {
        systemMessage = `${harvestedCrop1Number} carrots, ${harvestedCrop2Number} pumpkins harvested`;
      } else if (harvestedCrop1Number === 0 && harvestedCrop2Number !== 0) {
        systemMessage = `${harvestedCrop2Number} pumpkins harvested`;
      } else if (harvestedCrop1Number !== 0 && harvestedCrop2Number === 0) {
        systemMessage = `${harvestedCrop1Number} carrots harvested`;
      } else {
        systemMessage = `nothing to harvest :(`;
      }
      console.log(
        `${harvestedCrop1Number}, ${harvestedCrop2Number}, ${systemMessage}`
      );
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
          systemMessage = `${getTime()} Carrot is planted at 1`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop2Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop2Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 2`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop3Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop3Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 3`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop4Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop4Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 4`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop5Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop5Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 5`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop6Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop6Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 6`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop7Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop7Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 7`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop8Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop8Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 8`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop9Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop9Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Carrot is planted at 9`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else {
          console.log("no place to plant");
        }
      } else {
        console.log("no seed to plant");
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
          systemMessage = `${getTime()} Pumpkin is planted at 1`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop2Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop2Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 2`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop3Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop3Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 3`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop4Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop4Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 4`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop5Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop5Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 5`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop6Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop6Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 6`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop7Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop7Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 7`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop8Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop8Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 8`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else if (crop9Type === 0) {
          seed2Ref.update({
            number: seed2Number - 1,
          });
          crop9Ref.update({
            type: 2,
            createdAt: new Date(),
          });
          systemMessage = `${getTime()} Pumpkin is planted at 9`;
          setTimeout(
            () => invenfunction(interaction, "editReply", systemMessage),
            1000
          );
        } else {
          console.log("no place to plant");
        }
      } else {
        console.log("no seed to plant");
      }
    } else if (interaction.customId === "sell1") {
      sellCrop(interaction, "harvested1");
    } else if (interaction.customId === "sell2") {
      sellCrop(interaction, "harvested2");
    } else {
      interaction.channel.send(`${interaction.customId} 미구현 기능입니다`);
    }
  });
}

module.exports = mainfunction;

const { db } = require(__dirname + "/../fbase");

const { farmMessageMaker } = require(__dirname + "/../services/messageMaker");
const shopfunction = require(__dirname + "/shopfunction");
const invenfunction = require(__dirname + "/invenfunction");

async function farmfunction(interaction) {
  try {
    const message = await farmMessageMaker(interaction, "author");
    interaction.reply(message);
  } catch (e) {
    console.log(e);
    interaction.channel.send(e);
  }

  const collector = interaction.channel.createMessageComponentCollector({});

  async function refreshFarm(interaction) {
    const message = await farmMessageMaker(interaction, "user");
    interaction.editReply(message);
  }

  collector.on("collect", async (interaction) => {
    await interaction.deferUpdate();
    if (interaction.customId === "location") {
      if (interaction.values[0] === "farm") {
        refreshFarm(interaction);
      } else if (interaction.values[0] === "shop") {
        shopfunction(interaction, "editReply");
      } else if (interaction.values[0] === "inventory") {
        invenfunction(interaction, "editReply");
      }
    } else if (interaction.customId === "seed1") {
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
        setTimeout(async () => {
          const newUserRef = db.collection("users").doc(interaction.user.id);
          const newUserData = (await newUserRef.get()).data();
          console.log("-----after-----");
          console.log(newUserData.gold);
        }, 1000);
      }
      shopfunction(interaction, "editReply");
    } else if (interaction.customId === "seed2") {
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
        setTimeout(async () => {
          const newUserRef = db.collection("users").doc(interaction.user.id);
          const newUserData = (await newUserRef.get()).data();
          console.log("-----after-----");
          console.log(newUserData.gold);
        }, 1000);
      }
      shopfunction(interaction, "editReply");
    } else if (interaction.customId === "refresh") {
      refreshFarm(interaction);
    } else if (interaction.customId === "harvest") {
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
      // const userRef = db.collection("users").doc(interaction.user.id);
      // const cropRef = userRef.collection("farm").doc("crop1");
      // const cropDoc = await cropRef.get();
      // const cropData = cropDoc.data();
      // const invenRef = userRef.collection("myInven").doc("inven1");
      // const invenDoc = await invenRef.get();
      // const invenData = invenDoc.data();
      // const time = cropData?.createAt?._seconds;
      // const type = cropData?.type;

      // const now = new Date().getTime() / 1000;
      // const gap = now - time;
      // if (gap > 20) {
      //   console.log("ready to harvest");
      //   cropRef.delete();
      //   const cropNumber = invenData.number;
      //   if (cropRef.exists) {
      //     invenRef.update({
      //       type: "plant1",
      //       number: cropNumber + 1,
      //     });
      //   } else {
      //     invenRef.set({
      //       type: "plant1",
      //       number: cropNumber + 1,
      //     });
      //   }
      //   console.log("harvested");
      // } else {
      //   console.log("not ready");
      // }
      // setTimeout(() => refreshFarm(interaction), 1000);
    } else if (interaction.customId === "plant1") {
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
          invenfunction(interaction, "editReply");
        } else if (crop2Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop2Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else if (crop3Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop3Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else if (crop4Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop4Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else if (crop5Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop5Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else if (crop6Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop6Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else if (crop7Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop7Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else if (crop8Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop8Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else if (crop9Type === 0) {
          seed1Ref.update({
            number: seed1Number - 1,
          });
          crop9Ref.update({
            type: 1,
            createdAt: new Date(),
          });
          invenfunction(interaction, "editReply");
        } else {
          console.log("no place to plant");
        }
      } else {
        console.log("no seed to plant");
      }
    } else {
      interaction.channel.send(`${interaction.customId} 미구현 기능입니다`);
    }
  });
}

module.exports = farmfunction;

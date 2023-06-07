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
    switch (interaction.customId) {
      case "location":
        if (interaction.values[0] === "farm") {
          refreshFarm(interaction);
        } else if (interaction.values[0] === "shop") {
          shopfunction(interaction, "editReply");
        } else if (interaction.values[0] === "inventory") {
          invenfunction(interaction, "editReply");
        }
        break;
      case "seed1":
        const userRef1 = db.collection("users").doc(interaction.user.id);
        const userData1 = (await userRef1.get()).data();
        const userGold1 = userData1.gold;
        if (userGold1 < 1) {
          console.log("not enough gold");
        } else {
          console.log("-----before-----");
          console.log(userGold1);
          userRef1.update({ gold: userGold1 - 1 });
          const seed1Ref = userRef1.collection("inventory").doc("seed1");
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
        break;
      case "seed2":
        const userRef2 = db.collection("users").doc(interaction.user.id);
        const userData2 = (await userRef2.get()).data();
        const userGold3 = userData2.gold;
        if (userGold3 < 2) {
          console.log("not enough gold");
        } else {
          console.log("-----before-----");
          console.log(userGold3);
          userRef2.update({ gold: userGold3 - 2 });
          const seed2Ref = userRef2.collection("inventory").doc("seed2");
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
        break;
      case "refresh":
        refreshFarm(interaction);
        break;
      case "harvest":
        const userRef3 = db.collection("users").doc(interaction.user.id);
        const cropRef = userRef3.collection("myFarm").doc("crop1");
        const cropDoc = await cropRef.get();
        const cropData = cropDoc.data();
        const invenRef = userRef3.collection("myInven").doc("inven1");
        const invenDoc = await invenRef.get();
        const invenData = invenDoc.data();
        const time = cropData?.createAt?._seconds;
        const type = cropData?.type;

        const now = new Date().getTime() / 1000;
        const gap = now - time;
        if (gap > 20) {
          console.log("ready to harvest");
          cropRef.delete();
          const cropNumber = invenData.number;
          if (cropRef.exists) {
            invenRef.update({
              type: "plant1",
              number: cropNumber + 1,
            });
          } else {
            invenRef.set({
              type: "plant1",
              number: cropNumber + 1,
            });
          }
          console.log("harvested");
        } else {
          console.log("not ready");
        }
        setTimeout(() => refreshFarm(interaction), 1000);

        break;
      default:
        interaction.channel.send(`${interaction.customId} 미구현 기능입니다`);
    }
  });
}

module.exports = farmfunction;

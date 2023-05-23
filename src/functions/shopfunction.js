const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ComponentType,
} = require("discord.js");

async function startfunction(interaction) {
  const imageUrl1 =
    "https://firebasestorage.googleapis.com/v0/b/fir-study-1c95a.appspot.com/o/Q_80%2C0.jpeg?alt=media&token=9c015d0e-158e-4d8a-9705-5d3800ee7369";

  const embed1 = new EmbedBuilder().setImage(imageUrl1);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("item1").setLabel("Item 1").setStyle(1),
    new ButtonBuilder().setCustomId("item2").setLabel("Item 2").setStyle(1),
    new ButtonBuilder().setCustomId("item3").setLabel("Item 3").setStyle(1),
    new ButtonBuilder().setCustomId("item4").setLabel("Item 4").setStyle(1)
  );

  const collector = interaction.channel.createMessageComponentCollector({
    componentType: ComponentType.Button,
    // time: 60000,
  });

  collector.on("collect", async (i) => {
    if (i.user.id === interaction.user.id) {
      const docRef = db.collection("users").doc(i.user.id);
      const doc = await docRef.get();
      const docData = doc.data();
      console.log(doc.data().gold);

      i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
      switch (i.customId) {
        case "item1":
          docRef.update({ gold: docData.gold - 1 });
          const newCollectionRef = docRef.collection("myFarm");
          const newDocRef = newCollectionRef.doc("crop1");
          docRef.update({ exp: 1 });
          // Add data to the new document
          await newDocRef.set({
            type: 1,
            createAt: new Date(),
          });
          interaction.channel.send("item1 button acted");
          break;

        default:
          interaction.channel.send("not item1");
          break;
      }
    } else {
      i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    }
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} interactions.`);
  });
  // let data1 = "not changed";

  // const docRef = db.collection("users").doc("1016972120330358807");
  // const doc = await docRef.get();
  // data1 = doc.data().exp;
  // console.log(typeof data1);
  // console.log(data1);

  interaction.reply({ embeds: [embed1], components: [row] });
}

module.exports = startfunction;

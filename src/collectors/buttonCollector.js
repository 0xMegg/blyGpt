// const collector = interaction.channel.createMessageComponentCollector({
//     componentType: ComponentType.Button,
//     // time: 60000,
//   });

//   collector.on("collect", async (i) => {
//     if (i.user.id === interaction.user.id) {
//       const docRef = db.collection("users").doc(i.user.id);
//       const doc = await docRef.get();
//       const docData = doc.data();
//       console.log(doc.data().gold);

//       i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
//       switch (i.customId) {
//         case "item1":
//           docRef.update({ gold: docData.gold - 1 });
//           const newCollectionRef = docRef.collection("myFarm");
//           const newDocRef = newCollectionRef.doc("crop1");
//           docRef.update({ exp: 1 });
//           // Add data to the new document
//           await newDocRef.set({
//             type: 1,
//             createAt: new Date(),
//           });
//           interaction.channel.send("item1 button acted");
//           break;

//         default:
//           interaction.channel.send("not item1");
//           break;
//       }
//     } else {
//       i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
//     }
//   });

//   collector.on("end", (collected) => {
//     console.log(`Collected ${collected.size} interactions.`);
//   });

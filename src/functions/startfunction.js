const { db, storage } = require("../fbase");
const { EmbedBuilder } = require("discord.js");

async function startfunction(interaction) {
  const userDocRef = db.collection("users").doc(interaction.user.id);

  // Try to get the user's document
  const doc = await userDocRef.get();

  // If it exists, return a message
  // if (doc.exists) {
  //   interaction.reply("u r already here");
  // } else {
  // Get the current index from the database
  const indexDocRef = db.collection("meta").doc("index");
  let indexDoc = await indexDocRef.get();
  let currentIndex;

  if (!indexDoc.exists) {
    currentIndex = 0; // Set initial value if it doesn't exist
    await indexDocRef.set({ currentIndex: currentIndex });
  } else {
    currentIndex = indexDoc.data().currentIndex;
  }

  // Increment the index for the next user
  await indexDocRef.update({
    currentIndex: currentIndex + 1,
  });

  // Set the user's data with the new index
  await userDocRef.set({
    index: currentIndex,
    discordId: interaction.user.id,
    lastLogin: new Date(),
    exp: 0,
    gold: 0,
  });

  // Return a greeting message for the new user
  const imageUrl =
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80";
  // Create a new embed
  const embed = new EmbedBuilder().setTitle("Welcome").setImage(imageUrl);

  // Send the embed
  interaction.reply({ embeds: [embed] });
  // }
}

module.exports = startfunction;

const {
  Collection,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionsBitField,
} = require('discord.js');
const checkPerms = require('@functions/msgCrt/checkPerms.js'); // Adjust the path as needed

module.exports = {
  name: "mention",
  run: async (client, message, args, emoji) => {
    try {
      // Check permissions
      const hasPerms = await checkPerms(
        message,
        {
          name: "mention",
          userPerms: [],
          botPerms: ["SendMessages", "EmbedLinks"],
        },
        client
      );
      if (!hasPerms) return; // Exit if the bot or user lacks required permissions

      // Button components
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Invite Me")
          .setStyle(ButtonStyle.Link)
          .setURL(`${client.invite.admin}`),
        new ButtonBuilder()
          .setLabel("Support Srv")
          .setStyle(ButtonStyle.Link)
          .setURL(`${client.support}`),
          new ButtonBuilder()
          .setLabel("Vote Me")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://top.gg/bot/1089504577734311976?s=0ad05d3d518ba`)
      );

      // Fetch the voice region
      const voiceRegion =
        message.guild.preferredLocale ||
        (message.guild.voiceAdapterCreator ? message.guild.voiceAdapterCreator : "N/A");

      // Embed design
      const embed = new EmbedBuilder()
        .setColor("#2f3136") // Darker color similar to Discord's theme
        .setDescription(
          `**Welcome to ${message.guild.name}!**\n\n` +
          `My prefix here is \`!\`\n` +
          `Voice Region: \`${voiceRegion}\`\n` +
          `Server Id: \`${message.guild.id}\`\n` +
          "You can play music by joining a voice channel and typing `!play`.\n" +
          "Type `!help` to access the commands help menu.\n"
        )
        .setFooter({
          text: `Developed with ❤️ by krypton_.</>`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      // Send the embed
      await message.channel.send({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error("An error occurred while running the 'mention' command:", error);

      // Send error message to the user
      const errorEmbed = new EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(
          "An error occurred while processing your request. Please try again later."
        );

      try {
        await message.channel.send({ embeds: [errorEmbed] });
      } catch (sendError) {
        console.error("Failed to send error message:", sendError);
      }
    }
  },
};

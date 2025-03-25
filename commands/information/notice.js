/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "notice",
  aliases: [],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows message from devs",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    let emb = new client.embed()
      .desc(
        `## Notice from developers\n\n` +
          `**Changelogs**\n` +
          `ㅤ${emoji.yes}  Added prefix system \n` +
          `ㅤ${emoji.yes}  Added coin system **(Beta)**\n` +
          `ㅤ${emoji.yes}  Added ignore system **(Beta)**\n` +
          `ㅤ${emoji.yes}  Added playEmbed presets **(Beta)**\n` +
          `ㅤ${emoji.yes}  Premium will now include no-prefix\n\n` +
          `**Commands Added**\n` +
          `ㅤ${emoji.yes} **${client.prefix}rejoin **(rejoin a vc)\n` +
          `ㅤ${emoji.yes} **${client.prefix}prefix **(re/set prefix)\n` +
          `ㅤ${emoji.yes} **${client.prefix}ignore **(re/set ignored chnls)\n` +
          `ㅤ${emoji.yes} **${client.prefix}similar **(add similar songs)\n` +
          `ㅤ${emoji.yes} **${client.prefix}optimize **(+ sound quality)\n` +
          `ㅤ${emoji.yes} **${client.prefix}enhance **(++ sound quality)\n` +
          `ㅤ${emoji.yes} **${client.prefix}bal **(see total coins)\n` +
          `ㅤ${emoji.yes} **${client.prefix}buy **(redeem coins for premium),\n` +
          `ㅤ${emoji.yes} **${client.prefix}config **(view your server configs)\n` +
          `ㅤ${emoji.yes} **${client.prefix}profile **(see your badges/pr)\n\n` +
          `ㅤ${emoji.yes} **${client.prefix}join **(join your server vc reaction emojis)\n` +
          `ㅤ${emoji.yes} **${client.prefix}gen user/guild **premium code generate your server configs**(Beta)**\n` +
          `ㅤ${emoji.yes} **${client.prefix}help **(view help menu changes)\n` +
          `**Bugs and reports**\n` +
          `ㅤ${emoji.bug}  Report bugs using \`${client.prefix}report\`\n`,
      )

    await message.reply({ embeds: [emb] }).catch(() => {});
  },
};

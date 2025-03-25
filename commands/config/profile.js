/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */
const axios = require("axios");
const { ActionRowBuilder } = require("discord.js")

module.exports = {
  name: "profile",
  aliases: ["pr"],
  cooldown: "",
  category: "config",
  usage: "",
  description: "See server configs",
  args: false,
  vote: false,
  new: true,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
      
      const id = message.mentions.users.first()?.id || args[0] || message.member.id;
    const user = await client.users.fetch(id).catch(() => null);
      
      if (!user) {
      return await message.reply({
        embeds: [
          new client.embed().desc(`${emoji.no} **Invalid/No User provided**`),
        ],
      });
    }
      
    let [pfx, premiumUser, dev, admin, badges] = await Promise.all([
      await client.db.pfx.get(`${client.user.id}_${user.id}`),
      await client.db.premium.get(`${client.user.id}_${user.id}`),
      await client.owners.find((x) => x !== "692617937512562729" && x === user.id),
      await client.admins.find((x) => x === user.id),
      await client.db.badges.get(`${client.user.id}_${user.id}`) || []
    ]);
      
      

    let premium =
      premiumUser == true
        ? "Lifetime"
        : premiumUser
          ? `Expiring <t:${`${premiumUser}`?.slice(0, -3)}:R>`
          : `\`Not Activated\``;
      
      let vote = false;
      
      let res = await axios.get(
        `https://top.gg/api/bots/${client.user.id}/check?userId=${user.id}/`, {
            method: 'GET',
            headers: {
                Authorization: client.config.topgg.key
            }
        });
    
    let data = res.data;
    if (res.status == 200 && data.voted) vote = true;
      
      
      let bdg = {
          "dev": "<a:verifydev:1309224044649775135> Development Team",
          "owner": "<:zz_os:1309224051117654026> Owner",
          "staff": "<:BadgeDiscordStaff:1309224046067449857> Staff Team",
          "vip": "<:vip:1309234164993888338> Vip", 
          "friend": "<:Friendship:1309224049229955104> Owner's Friend",
          "partner": "<a:DcPartner:1309224043152539649> Partner",
          "contributor": "<:contibuters:1309234166252179507> Contributor",
          "earlysupporter": "<a:early_supporter:1309234163127422976> Early Supporter",
          "beta": "<:Beta:1309224048017932338> Beta Tester"
      }
      
      let show = ""
      
      if (dev) show += `<:red_crown:1248529771780898826> [${user.displayName}](https://discord.com/users/${user.id})\n`
      
      badges.size > 0 ? badges.forEach((x) => {
          show += `${bdg[x]}\n`
      }) : show += "<:users:1308857157554409525> Hydrogen Users"
    await message
      .reply({
        embeds: [
          new client.embed()

            .setAuthor({
              name: `${user.displayName} Profile`,
              iconURL: client.user.displayAvatarURL(),
            })
            .addFields([
                {
                    name: `Badges [ ${badges.size > 0 ? badges.size : `1`} ]`,
                    value: `**${show}**`
                },
                {
                    name: `Privilages`,
                    value: `**${premiumUser ? `${emoji.prime} Premium` : ""}\n${vote ? `${emoji.vote} Vote Commands Access` : ""}**`
                }
            ])
            

            .thumb(message.member.displayAvatarURL())
            .setFooter({
              text: `Requested by ${message.author.displayName}`,
                iconURL: message.author.displayAvatarURL()
            }),
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new client.button().link("Free Privilage", `https://top.gg/bot/${client.user.id}/vote/`)
            )
        ]
      })
      .catch(() => {});
  },
};

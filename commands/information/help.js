const genCommandList = require("@gen/commandList.js");
const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { config } = require("dotenv");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's help menu",
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
    let categories = await client.categories.filter((c) => c != "owner");
    categories = categories.sort((b, a) => b.length - a.length);
    let cat = categories
      // .map(
      //   (c) =>
      //     `> **${emoji[c]} • ${
      //       c.charAt(0).toUpperCase() + c.slice(1)
      //     } Commands**]\n`,
      // )
      // .join("");

    const embed = new client.embed()
      .setAuthor({
        name: message.author.displayName,
        iconURL: message.author.displayAvatarURL({dynamic:true}),
      })
      .desc(`<:stolen_emoji:1309245442789216287> Hey ${message.author.toString()}, I'm ${client.user.username}\n<:stolen_emoji:1309245442789216287> My global prefix is ${client.prefix}\n<:stolen_emoji:1309245442789216287> Choose a module from the below modules`)
      .thumb(client.user.displayAvatarURL())
      .setImage("https://cdn.discordapp.com/attachments/1248049344389845086/1309538947986358292/IMG-20241122-WA0006-removebg-preview.png?ex=6741f2af&is=6740a12f&hm=460ff522ffed2766f4deffc563189e690de22d86f702208bdfc693da0f3ef897&")
      .setFooter({text: `$Use (cmd -h) for command info`, iconURL: client.user.displayAvatarURL()})
      /*.addFields([
          {
        name: `<:aurastats:1248187077820944446> Modules`,
        value:`> ${emoji.music} • **[Music Commands](${client.config.links.support})**\n> ${emoji.config} • **[Config Commands](${client.config.links.support})**\n> ${emoji.filter} • **[Filter Commands](${client.config.links.support})**\n> ${emoji.information} • **[Information](${client.config.links.support})**\n`
      }
])*/
      

    let arr = [];
    for (cat of categories) {
      let cmnds = client.commands.filter((c) => c.category == cat);
      arr.push(cmnds.map((c) => `\`${c.name}\``));
    }
    let allCmds = await categories.map(
      (cat, i) =>
        `<:emoji_43:1309245778275078355> **${cat.charAt(0).toUpperCase() + cat.slice(1)}\n ${arr[i].join(", ")}**`,
    );
    desc = allCmds.join("\n\n");

    const all = new client.embed().desc(desc).setFooter({
      text: `Developed By ━● 1hp-Servicesㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
    });

    let menu = new StringSelectMenuBuilder()
      .setCustomId("menu")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("Select a category")
      .addOptions([
        {
          label: "Go to homepage",
          value: "home",
          emoji: `${emoji.home}`,
        },
      ]);
    const selectMenu = new ActionRowBuilder().addComponents(menu);

    categories.forEach((category) => {
      menu.addOptions({
        label:
          category.charAt(0).toUpperCase() + category.slice(1) + ` commands`,
        value: category,
        emoji: `${emoji[category]}`,
      });
    });

    menu.addOptions([
      {
        label: "Show all commands",
        value: "all",
        emoji: `${emoji.all}`,
      },
    ]);

    const btnmenu = new ActionRowBuilder()
    .addComponents(
      new client.button().secondary(`home`, ``, client.emoji.home),
      new client.button().secondary(`delete`, ``, client.emoji.delete),
      new client.button().secondary(`all`, `All Commands`, client.emoji.list)

    )

    const m = await message.reply({
      embeds: [embed],
      components: [btnmenu, selectMenu],
    });

    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction.message.edit({
        components: [btnmenu, selectMenu],
      });
      await interaction
        .reply({
          embeds: [
            new client.embed().desc(
              `${emoji.no} Only **${message.author.tag}** can use this`,
            ),
          ],
          ephemeral: true,
        })
        .catch(() => {});
      return false;
    };
    const collector = m?.createMessageComponentCollector({
      filter: filter,
      time: 60000,
      idle: 60000 / 2,
    });

    collector?.on("collect", async (interaction) => {
      if (!interaction.deferred) await interaction.deferUpdate();

      if (interaction.isStringSelectMenu()) {
      const category = interaction.values[0];
      switch (category) {
        case "home":
          await m
            .edit({
              embeds: [embed],
            })
            .catch(() => {});
          break;

        case "all":
          await m
            .edit({
              embeds: [all],
            })
            .catch(() => {});
          break;

        default:
          await m
            .edit({
              embeds: [
                new client.embed()
                  .desc(await genCommandList(client, category))
                  .title(
                    `<:emoji_43:1309245778275078355> ${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    } Commands`,
                  )
                  .setFooter({
                    text: `Developed By ━● 1hp-Serviceㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
                  }),
              ],
            })
            .catch(() => {});
          break;
      }
    }

    if (interaction.isButton()) {
      const id = interaction.customId;
      switch (id) {
        case "home":
          await m
            .edit({
              embeds: [embed],
            })
            .catch(() => {});
          break;

        case "all":
          await m
            .edit({
              embeds: [all],
            })
            .catch(() => {});
          break;
        
        case "delete":
          await m?.delete()
          .catch(() => {});

        default:
          await m
            .edit({
              embeds: [
                new client.embed()
                  .desc(await genCommandList(client, category))
                  .title(
                    `<:emoji_43:1309245778275078355> ${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    } Commands`,
                  )
                  .setFooter({
                    text: `Developed By ━● 1hp-Serviceㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
                  }),
              ],
            })
            .catch(() => {});
          break;
      }
    }
    });

    collector?.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
  },
};

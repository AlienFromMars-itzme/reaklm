/** @format */

import { Command } from "../../../classes/abstract/command.js";
import { randomNekoImage } from "../helpers/randomNekoImage.js";

import type { Context } from "../../../classes/context.js";
import type { Flare } from "../../../classes/client.js";

export default class extends Command {
  override slash = false;
  description = "smile at someone";
  examples = [`${this.name} @flame`];
  override usage = `${this.name} [member]`;

  async execute(client: Flare, ctx: Context) {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .description(
            `${ctx.author} smiled at ${ctx.mentions.users?.first() || "some random weirdo"}`
          )
          .image(await randomNekoImage(client, this.name))
      ]
    });
  }
}

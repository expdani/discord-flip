import { EmbedBuilder, TextChannel } from "discord.js";
import { BIN_CHANNEL, TypeAuction } from "./types";
import {
  empty,
  findIcon,
  getStarIcons,
  getTierColor,
  getTierEmoji,
  numberWithCommas,
} from "./helpers";
import { client } from "../..";
import { getActiveBins } from "../../apollo/flipper";
import { settings } from "../../../assets/settings.json";

const flipAuctions: string[] = [];

export const flipperSettings = settings;

/**
 * Fetch all active auctions.
 */
export async function fetchBins(): Promise<void> {
  const bins = await getActiveBins(50);

  const channel = await client.channels.fetch(BIN_CHANNEL);

  if (flipAuctions.length < 1) {
    bins.forEach((a: TypeAuction) => {
      flipAuctions.push(a.uuid);
    });
  }

  if (bins) {
    bins.forEach((a: TypeAuction) => {
      if (flipAuctions.includes(a.uuid)) return;
      if (a.estimated_profit < settings.minProfit) return;

      const embed = new EmbedBuilder()
        .setTitle(
          `[${getTierEmoji(a.tier)}] ${a.item_name}${getStarIcons(a.stars)}`
        )
        .setThumbnail(findIcon(a.stripped_item_name))
        .addFields([
          {
            name: "Cost",
            value: `${numberWithCommas(a.starting_bid)} coins`,
            inline: false,
          },
          {
            name: "Estimated profit",
            value: `${numberWithCommas(a.estimated_profit)} coins`,
            inline: false,
          },
          {
            name: `Lowest BIN (from ${a.scanned_auctions} BINs)`,
            value: `${numberWithCommas(a.lowest_bin)} coins`,
            inline: false,
          },
        ])
        // .addField("Second lowest BIN", `${numberWithCommas(a.starting_bid)} coins`, false)
        .setDescription(`\`/viewauction ${a.uuid}\``)
        .setColor(getTierColor(a.tier));

      (channel as TextChannel).send({ content: null, embeds: [embed] });

      flipAuctions.push(a.uuid);
      if (flipAuctions.length > 100) empty(flipAuctions);
    });
  } else {
    (channel as TextChannel).send("API is down.");
  }
}

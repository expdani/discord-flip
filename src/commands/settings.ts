import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { BaseCommand, IBaseCommand } from "../classes/BaseCommand";
import { flipperSettings } from "../controllers/flipper/bin";
import { numberWithCommas } from "../controllers/flipper/helpers";
import { settings } from "../../assets/settings.json";

/*
    This is an example interaction command that echoes your message.
   */
export class Command extends BaseCommand implements IBaseCommand {
  execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const commandGroup = interaction.options.getSubcommandGroup();
    const subCommand = interaction.options.getSubcommand();

    if (commandGroup === "set") {
      const minProfit = interaction.options.getInteger("amount");

      if (minProfit) {
        flipperSettings.minProfit = minProfit;
        settings.minProfit = minProfit;
        return interaction.reply(
          `Minimum profit set to ${numberWithCommas(minProfit)}.`
        );
      }
    } else {
      if (subCommand === "minprofit") {
        return interaction.reply(
          `Minimum profit is ${numberWithCommas(
            flipperSettings.minProfit
          )} coins.`
        );
      }
    }
  }

  data = new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Settings for the flipper bot.")
    .addSubcommandGroup((group) =>
      group
        .setName("set")
        .setDescription("Update settings for the flipper bot.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("minprofit")
            .setDescription("Update the minimum profit for the flipper bot.")
            .addIntegerOption((option) =>
              option
                .setName("amount")
                .setDescription("The minimum profit for the flipper bot.")
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("get")
        .setDescription("Get settings for the flipper bot.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("minprofit")
            .setDescription("Get the minimum profit for the flipper bot.")
        )
    );
}

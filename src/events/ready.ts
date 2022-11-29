import { readdirSync } from "fs";
import { BaseCommand } from "../classes/BaseCommand";
import { DiscordClient } from "../classes/discord";
import { fetchAuctions } from "../controllers/flipper/auction";
import { fetchBins } from "../controllers/flipper/bin";

/**
 * Should only fire once!
 */
export const once = true;
/*
  This is an event that gets triggered on ready.
 */
export const execute = (client: DiscordClient) => {
  const { commands, application } = client;

  const commandFiles = readdirSync("./src/commands").filter(
    (file: any) => file.endsWith(".ts") || file.endsWith(".js")
  );
  for (const file of commandFiles) {
    const commandInteraction: BaseCommand =
      new (require(`../commands/${file}`).Command)();
    commands.set(commandInteraction.data.name, commandInteraction);
  }

  const commandData = commands.map((i) => i.data);

  fetchBins();
  fetchAuctions();
  setInterval(function () {
    fetchBins();
    fetchAuctions();
  }, 200);

  // @ts-ignore
  return application.commands?.set(commandData);
};

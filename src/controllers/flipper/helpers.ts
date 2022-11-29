import { ColorResolvable } from "discord.js";
import { reforges } from "../../../assets/reforges.json";

/**
 * Empty an array.
 */
export const empty = (arr: any[]) => (arr.length = 0);

/**
 * Returns the first word of a string.
 */
export function getTierEmoji(tier: string): string {
  switch (tier.toLocaleLowerCase()) {
    case "common":
      return "<:common:885451395518570508>";
    case "uncommon":
      return "<:uncommon:885451395732475904>";
    case "rare":
      return "<:rare:885459142284820510>";
    case "epic":
      return "<:epic:885451395745058866>";
    case "legendary":
      return "<:legendary:885451395778617364>";
    case "mythic":
      return "<:mythic:885451395778625547>";
    case "supreme":
      return "<:supreme:885451395833163856>";
    case "special":
      return "<:special:885451395736694795>";
    case "very special":
      return "<:veryspecial:885451395774427157>";
    default:
      return "";
  }
}

/**
 * Returns the first word of a string.
 */
export function getTierColor(tier: string): ColorResolvable {
  switch (tier.toLocaleLowerCase()) {
    case "common":
      return "White";
    case "uncommon":
      return "Green";
    case "rare":
      return "Blue";
    case "epic":
      return "Purple";
    case "legendary":
      return "Gold";
    case "mythic":
      return "LuminousVividPink";
    case "divine":
      return "Aqua";
    case "supreme":
      return "Red";
    case "special":
      return "Red";
    case "very special":
      return "Red";
    default:
      return "White";
  }
}

/**
 * Adds dots to big numbers.
 */
export function numberWithCommas(x?: number) {
  if (!x) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Rips the icon from a site.
 */
export function findIcon(item: string): string {
  const url =
    "https://sky.lea.moe/item/" +
    item.replace(/ /g, "_").toUpperCase().replaceAll("'", "");
  return url;
}

/**
 * Strip name from reforges and upgrades.
 */
export function stripItemName(name: string): string {
  let strippedName = name.toLowerCase();

  strippedName = stripNameIcons(strippedName);
  strippedName = strippedName.replace(/\s*$/, "").replace(/ *\[[^\]]*]/, "");

  if (
    reforges.double.includes(
      `${getWord(strippedName, 0)} ${getWord(strippedName, 1)} `
    )
  ) {
    strippedName = strippedName.substr(strippedName.indexOf(" ") + 1);
    strippedName = strippedName.substr(strippedName.indexOf(" ") + 1);
  }

  if (reforges.single.includes(`${getWord(strippedName, 0)} `)) {
    strippedName = strippedName.substr(strippedName.indexOf(" ") + 1);
  }

  return strippedName
    .replace(/[.*]/, "") // remove level
    .replace(/\s{2,}/g, " ") // remove double spaces
    .trim();
}

/**
 * Returns the first word of a string.
 */
export function getWord(text: string, position: number) {
  return text.split(" ")[position];
}

/**
 * Returns the first word of a string.
 */
export function firstWord(text: string) {
  return text.split(" ", 1)[0];
}

/**
 * Strip icons from an item name.
 */
export function stripNameIcons(name: string): string {
  const replaceReg = /✪/gi;
  const strippedName = name
    .replace("⚚", "")
    .replace("◆", "")
    .replace("✦", "")
    .replace(replaceReg, "");

  return strippedName;
}

/**
 * Returns the first word of a string.
 */
export function getStarIcons(stars: number): string {
  let str = "";
  for (let index = 0; index < stars; index++) {
    if (index === 0) str += " ";
    str += "✪";
  }
  return str;
}

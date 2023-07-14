import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Sends a ping message!");

export const execute = async (interaction: CommandInteraction) => {
  return interaction.reply("Hello!");
};
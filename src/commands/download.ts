import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { DownloadController } from "../controller/download.controller";

export const data = new SlashCommandBuilder()
  .setName("download")
  .addStringOption(option =>
    option
      .setName('file-url')
      .setDescription('URL to file you want to return;')
      .setRequired(true)
  )
  .setDescription("Download a file from url and returns it.");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();
  
  const URL = <string>interaction.options.get("file-url")!.value;
  const downloadController = new DownloadController();
  const response = (await downloadController.handle(URL))!;
  
  interaction.editReply(response);
}
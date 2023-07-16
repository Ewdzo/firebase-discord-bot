import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { DownloadController } from "../controller/download.controller";

export const data = new SlashCommandBuilder()
  .setName("download")
  .addStringOption(option =>
    option
      .setName('file-url')
      .setDescription('Return all data from firebase;')
      .setRequired(true)
      .addChoices({name: "Images", value:"images"}, {name:"Documents", value:"documents"}, {name:"Else", value:"else"})
  )
  .setDescription("Download a file from url and returns it.");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply({ephemeral: true});
  
  const collection = <string>interaction.options.get("collection")!.value;
  const downloadController = new DownloadController();
  const response = (await downloadController.handle(collection))!;
  
  
  interaction.editReply(response);
}
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { UploadController } from "../controller/upload.controller";

export const data = new SlashCommandBuilder()
  .setName("upload")
  .addStringOption(option =>
    option
      .setName('file-url')
      .setDescription('URL to file you want to upload;')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('collection')
      .setDescription('Firestore Collection to store the file;')
      .setRequired(true)
      .addChoices({name: "Images", value:"images"}, {name:"Documents", value:"documents"}, {name:"Else", value:"else"})
  )
  .setDescription("Download a file from url and uploads it to a Firestore Collection. ( Limit: 1Mib )");

export const execute = async (interaction: CommandInteraction) => {
    await interaction.deferReply({ephemeral: true});

    const URL = <string>interaction.options.get("file-url")!.value;
    const collection = <string>interaction.options.get("collection")!.value;

    const uploadController = new UploadController();
    const response = (await uploadController.handle(URL, collection))!;

    interaction.editReply(response);
}
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { RemoveController } from "../controller/remove.controller";

export const data = new SlashCommandBuilder()
  .setName("remove")
  .addStringOption(option =>
    option
      .setName('hash')
      .setDescription('Hash of file you want to remove;')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('collection')
      .setDescription('Firestore Collection where file is currently stored;')
      .setRequired(true)
      .addChoices({name: "Images", value:"images"}, {name:"Documents", value:"documents"}, {name:"Else", value:"else"})
  )
  .setDescription("Download a file from url and uploads it to a Firestore Collection. ( Limit: 1Mib )");

export const execute = async (interaction: CommandInteraction) => {
    await interaction.deferReply({ephemeral: true});

    const hash = <string>interaction.options.get("hash")!.value;
    const collection = <string>interaction.options.get("collection")!.value;

    const removeController = new RemoveController();
    const response = (await removeController.handle(hash, collection))!;

    interaction.editReply(response);
}
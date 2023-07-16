import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fileTypeFromBuffer } from "file-type";
import axios from "axios";

export const data = new SlashCommandBuilder()
  .setName("download-file")
  .addStringOption(option =>
    option
      .setName('file-url')
      .setDescription('URL to file you want to return;')
      .setRequired(true)
  )
  .setDescription("Download a file from url and returns it.");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();
  
  try {
    const URL = <string>interaction.options.get("file-url")?.value;
    const response = await axios.get(URL, {responseType: 'arraybuffer'});
    
    const buffer = Buffer.from(response.data);
    const file = buffer.toString('base64');

    const fileType = await fileTypeFromBuffer(buffer);
    
    const data = Buffer.from(file, "base64");
    
    await interaction.editReply({
      content: "Hello!",  
      files:[{attachment: (data), name: "file." + fileType?.ext }],
    });
  } catch (err: any) { 
    interaction.editReply({content: "Invalid or Broken URL"});
  } 
}
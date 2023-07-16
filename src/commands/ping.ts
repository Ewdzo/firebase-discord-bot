import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fileTypeFromBuffer } from "file-type";
import axios from "axios";

export const data = new SlashCommandBuilder()
  .setName("ping-file")
  .addStringOption(option =>
    option
      .setName('file-url')
      .setDescription('URL to file you want to show;')
      .setRequired(true)
  )
  .setDescription("Sends a ping message!");

export const execute = async (interaction: CommandInteraction) => {
  try {
    const URL = <string>interaction.options.get("file-url")?.value;

    const response = await axios.get(URL, {responseType: 'arraybuffer'});
    const buffer = Buffer.from(response.data);
    const file = buffer.toString('base64');
    console.log(file.slice(0,20))

    const fileType = await fileTypeFromBuffer(buffer);

    return interaction.reply(
      {
        content: "Hello!",  
        files:[{attachment: (Buffer.from(file, "base64")), name: "file." + fileType?.ext }],
      }
    );
  } catch (err: any) { 
    return interaction.reply({content: "Invalid or Broken URL"});
  } 
}
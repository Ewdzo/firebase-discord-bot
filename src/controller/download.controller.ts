import { Embed } from "../classes";
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import DownloadService from "../services/download.services";

export class DownloadController {
  public async handle(data: string) {
    const downloadService = new DownloadService();

    try {
      const file = await downloadService.download(data);

      return { 
        files: [{attachment: (file.data), name: "file." + file.type}]
      };
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        return { 
          embeds: [ new Embed("❌ Error - "+error.code, error.message, "9F2727") ]
        };
      }
    }
  }
}
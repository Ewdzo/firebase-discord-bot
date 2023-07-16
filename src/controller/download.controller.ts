import { Embed } from "../classes";
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import DownloadService from "../services/download.services";

export class DownloadController {
  public async handle(collection: string) {
    const downloadService = new DownloadService();

    try {
      const files = await downloadService.download(collection);
      
      return { files: files }
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        return { embeds: [ new Embed("❌ Error - " + error.code, error.message, "9F2727") ] };
      }
    }
  }
}
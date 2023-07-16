import { Embed } from "../classes";
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import UploadService from "../services/upload.services";

export class UploadController {
  public async handle(data: string, collection: string) {
    const uploadService = new UploadService();

    try {
      const response = await uploadService.upload(data, collection);

      return { 
        embeds: [ new Embed("✅ - Success", response.data + " was added to " + response.collection, "279732")]
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
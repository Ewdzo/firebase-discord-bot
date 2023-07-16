import { Embed } from "../classes";
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import RemoveService from "../services/remove.services";

export class RemoveController {
  public async handle(hash: string, collection: string) {
    const uploadService = new RemoveService();

    try {
      const response = await uploadService.remove(hash, collection);

      return { 
        embeds: [ new Embed("🗑️ - Remotion Completed", response.data + " was removed from " + response.collection, "DEA534")]
      };
    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        return { 
          embeds: [ new Embed("❌ Error - " + error.code, error.message, "9F2727") ]
        };
      }
    }
  }
}
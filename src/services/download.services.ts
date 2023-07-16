import Axios from "axios";
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import { fileTypeFromBuffer } from "file-type";

export default class DownloadService {
    public async download(url: string) {
        try {
            const response = await Axios.get(url, {responseType: 'arraybuffer'});
                    
            if(response.headers["content-length"] > 26214400){
                throw new ValidationExceptionError(413, "File over 25MiB");
            }

            const base64File = Buffer.from(response.data).toString('base64');
            const data = Buffer.from(base64File, "base64");
            const fileType = await fileTypeFromBuffer(data).then(response => response!.ext);
            
            return {
                data: data, 
                type: fileType
            };
        } catch(err) { 
            if(err instanceof ValidationExceptionError) throw err;

            throw new ValidationExceptionError(400, "Invalid or Broken URL"); 
        }
    }
}
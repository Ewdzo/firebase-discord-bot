import { fileTypeFromBuffer } from "file-type";
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import { firebaseDB } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default class DownloadService {
    public async download(name: string) {
        try {
            const collectionRef = collection(firebaseDB, name);
            const data = await getDocs(collectionRef);
            const results = data.docs.map((doc) => (doc.data()));
            const files = await Promise.all(results.map(async (file) => { 
                const attachment = Buffer.from(file.base64File, "base64");
                const type = await fileTypeFromBuffer(attachment).then(response => response!.ext);
                
                return { attachment: attachment, name: file.hashFile + "." + type };
            }));

            if(!files.length) throw new ValidationExceptionError(404, "No files found"); 

            return files;
        } catch(err) { 
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 

            throw new ValidationExceptionError(400, err); 
        }
    }
}
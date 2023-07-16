import Axios from "axios";
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import { firebaseDB } from "../firebaseConfig";
import { md5 } from "../helper/createHashMD5";
import { doc, setDoc } from "firebase/firestore";

export default class UploadService {
    public async upload(url: string, collection: string) {
        try {
            const response = await Axios.get(url, {responseType: 'arraybuffer'});
            
            if(response.headers["content-length"] > 1048576){
                throw new ValidationExceptionError(413, "File over 1MiB");
            }
            
            const base64File = Buffer.from(response.data).toString('base64');
            const hashFile = md5(base64File);
            const collectionDocRef = doc(firebaseDB, collection, hashFile);

            await setDoc(collectionDocRef, { 
                base64File, 
                hashFile 
            });
            
            return {
                data: hashFile,
                collection: collection
            };
        } catch(err) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 

            throw new ValidationExceptionError(400, err); 
        }
    }
}
import { ValidationExceptionError } from "../exceptions/ValidationExceptionError";
import { firebaseDB } from "../firebaseConfig";
import { deleteDoc, doc, getDoc} from "firebase/firestore";

export default class RemoveService {
    public async remove(hash: string, collection: string) {
        try {
            const docRef = doc(firebaseDB, collection, hash);
            const snap = await getDoc(docRef);

            if(!snap.exists()) throw new ValidationExceptionError(404, hash + " - File not found"); 
            await deleteDoc(docRef);
            
            return {
                data: hash,
                collection: collection
            };
        } catch(err) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 

            throw new ValidationExceptionError(400, err); 
        }
    }
}
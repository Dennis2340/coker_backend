import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../configs/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';



const storage = getStorage(app);

const uploadFileToFirebase = async function(originalname, buffer) {
    const uuid = uuidv4();
    const fileName = uuid + "-" + originalname;
  
    // Create a storage reference
    const storageRef = ref(storage, fileName);
  
    // Upload the file
    try {
      await uploadBytes(storageRef, buffer);
      
      // Get the download URL
      const url = await getDownloadURL(storageRef);
  
      return url;
    } catch (error) {
      throw new Error(`Failed to upload file ${fileName}: ${error.message}`);
    }
  };
  
  export default uploadFileToFirebase;
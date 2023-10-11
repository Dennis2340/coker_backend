import { getStorage, ref, uploadBytes,deleteObject, getDownloadURL, listAll } from "firebase/storage";
import app from "../configs/firebaseConfig.js";
import { v4 as uuidv4 } from 'uuid';



const storage = getStorage(app);

export async function getAllFilesInFirebase () {
  try {
    // Create a storage reference for the root of the storage bucket
    const storageRef = ref(storage);

    // List all items (files and subdirectories) in the root of the storage bucket
    const result = await listAll(storageRef);

    // Extract file names from the result
    const fileNames = result.items.map((item) => item.name);

    return fileNames;
  } catch (error) {
    throw new Error(`Failed to get all files from Firebase Storage: ${error.message}`);
  }
};

export async function uploadFileToFirebase (originalname, buffer) {
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
  
export async function updateFileInFirebase (existingFileName, buffer) {
  // Generate a new unique file name
  const uuid = uuidv4();
  const newFileName = uuid + "-" + existingFileName;

  // Create a storage reference for the existing file
  const existingFileRef = ref(storage, existingFileName);

  // Create a storage reference for the new file
  const newFileRef = ref(storage, newFileName);

  // Upload the updated file to the same storage reference
  try {
    await uploadBytes(newFileRef, buffer);

    // Delete the existing file
    await deleteObject(existingFileRef);

    // Get the download URL for the updated file
    const url = await getDownloadURL(newFileRef);

    return {
      fileName: newFileName,
      url: url,
    };
  } catch (error) {
    throw new Error(`Failed to update file ${existingFileName}: ${error.message}`);
  }
};

export async function deleteFileFromFirebase (fileName) {
  try {
    // Create a storage reference for the file
    const fileRef = ref(storage, fileName);

    // Delete the file
    await deleteObject(fileRef);

    return { message: `File ${fileName} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete file ${fileName}: ${error.message}`);
  }
};


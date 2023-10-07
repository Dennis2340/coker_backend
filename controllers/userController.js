import User from "../models/User.js";


export async function AddUser(req, res){
  try {
    const { username, email } = req?.body;
    const user = await User.create({
        username,
        email,
    
    })
    res.status(201).json({message: "User added successfully", user})
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occured when adding user", error: error})
  }
}

export async function GetAllUsers(req, res){
    try {
        const users = await User.find({})
        res.status(200).json({users}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured when getting all users", error: error})
    }
}
export async function UpdateUser(req, res){
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured when updating users", error: error}) 
  }
}
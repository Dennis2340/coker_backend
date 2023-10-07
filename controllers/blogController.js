import BlogPost from "../models/Blog.js";
import User from "../models/User.js";
import uploadFileToFirebase from "../helperfunctions/imagehelper.js"

export async function CreateBlogPost(req, res){
 try {
    const { email, title, content, tags} = req?.body;
    const user = await User.findOne({email : email})
    if(!user) return res.status(404).json({message: "User not found"});

    console.log(user)
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { role: 'admin' },
        { new: true } // This ensures that the updated user is returned
      );
     let url = ""
        if(req.file){
        const { originalname, buffer } = req?.file;
        console.log(originalname)

         url = await uploadFileToFirebase(originalname, buffer)
      }
    const blog = await BlogPost.create({
        title,
        content,
        author: {
            userId: user._id,
            username: user.username
        },
        tags,
        pictureUrl: url
    })
    res.status(201).json({message: "blog post created successfully", blog})
 } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error occurred when creating a blog post", error: error});
 }
}


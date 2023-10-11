import BlogPost from "../models/Blog.js";
import User from "../models/User.js";
import { uploadFileToFirebase, deleteFileFromFirebase } from "../helperfunctions/imagehelper.js"
import Comment from "../models/Comment.js"

export async function GetAllBlogs(req, res) {
   try {
      const blogs = await BlogPost.find({});
      let blogDetails;

      // Correct usage of Promise.all with map
      blogDetails = await Promise.all(
         blogs.map(async (blog) => {
            const comments = await Comment.find({ _id: { $in: blog.comments } });

            return {
               ...blog.toObject(),
               comments: comments
            };
         })
      );

      return res.status(200).json({ blogs: blogDetails });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "error occurred when getting all the blogs", error: error.message });
   }
}

export async function GetSinlgeBlog(req, res){
   try {
      const { id } = req?.params
      const sinlgeBlog = await BlogPost.findById(id)

   } catch (error) {
      console.log(error)
      res.status(500).json({message: "error occured whilst fetching a singleblog", error: error})
   }
}
export async function CreateBlogPost(req, res){
 try {
    const { email, title, content, tags, } = req?.body;
    const user = await User.findOne({email : email})
    if(!user) return res.status(404).json({message: "User not found"});

    
    if(user.role !== "admin"){
      await User.findByIdAndUpdate(
         user._id,
         { role: 'admin' },
         { new: true } // This ensures that the updated user is returned
       );
    } 
     let url = ""
        if(req?.file){
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

export async function UpdateBlogPost(req, res) {
   try {
      console.log(req.body)
     const { blogId, title, content, tags } = req?.body;
 
     // Check if the blogId is provided
     if (!blogId) {
       return res.status(400).json({ message: "Blog ID is required for the update." });
     }
 
     // Find the blog post by ID
     const blog = await BlogPost.findById(blogId);
 
     // Check if the blog post exists
     if (!blog) {
       return res.status(404).json({ message: "Blog post not found." });
     }
 
     // Update the blog post fields
     if (title) {
       blog.title = title;
     }
     if (content) {
       blog.content = content;
     }
     if (tags) {
       blog.tags = tags;
     }
 
     // Update pictureUrl if a new file is provided
     if (req?.file) {
       const { originalname, buffer } = req.file;
       const newUrl = await uploadFileToFirebase(originalname, buffer);
       blog.pictureUrl = newUrl;
       console.log('saved picture')
     }
 
     // Save the updated blog post
     await blog.save();
 
     res.status(200).json({ message: "Blog post updated successfully", updatedBlog: blog });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Error occurred when updating the blog post", error: error.message });
   }
 }
 
export async function DeleteBlogPost(req, res){
   try {
      const { id } = req?.params;

      // Find the blog to be deleted
      const blogToDelete = await BlogPost.findById(id);

      if (!blogToDelete) {
         return res.status(404).json({ message: "Blog not found" });
      }

      // Delete all associated comments
      await Comment.deleteMany({ _id: { $in: blogToDelete.comments } });

      // Delete the blog
      await BlogPost.findByIdAndDelete(id);

      const url = new URL(blogToDelete?.pictureUrl);
      const pathComponents = url.pathname.split('/');
      const fileName = pathComponents[pathComponents.length - 1];
      /// delete the image
      await deleteFileFromFirebase(fileName)
      return res.status(200).json({ message: "Blog and associated comments deleted successfully" });
   } catch (error) {
      console.log(error)
      return res.status(500).json({messgae: 'error occured whilst deleting the blog', error: error})
   }
} 
// export async function UpdateBlog(req, res){
//    try {
//       const { id } = req?.params
//       const update
//    } catch (error) {
//       console.log(error)
//       return res.status(500).json({message: "error occured whilst updataing", error: error})
//    }
// }
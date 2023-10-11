import Comment from "../models/Comment.js";
import BlogPost from "../models/Blog.js";
import User from "../models/User.js";
import Like from "../models/Like.js";

export async function AddLike(req,res){
    try {
        const { userId, blogPostId } = req?.body
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({message: "User not found"})
        }
        const { username } = user
        // Check if a like already exists for the user and blog post
        const existingLike = await Like.findOne({ userId, blogPostId });

        if (existingLike) {
            
            await Like.findByIdAndDelete(existingLike._id);
          
            // Decrement the like count in the BlogPost model
            await BlogPost.findByIdAndUpdate(blogPostId, { $inc: { likes: -1 } });
            return res.status(201).json({message: "unliked"})
        } else {
        // If the like doesn't exist, create a new like
         await Like.create({
            userId,
            blogPostId,
            username,
        });
        
         await BlogPost.findByIdAndUpdate(blogPostId, { $inc: { likes: 1 } });
        }

        return res.status(201).json({message: "liked"})

    } catch (error) {
       console.log(error) 
       res.status(500).json({message: "Error occured when adding likes", error: error})
    }
}
export async function AddComment(req, res) {
    try {
        // in the frontend i will pass the userId not the email
        const { blogPostId, userId, content } = req?.body
        if(!userId){
            return res.status(422).json({message: 'no email found'})
        }
        const user = await User.findById(userId)
        if(!user){
           return res.status(404).json({message: "User not found"})
        }
        const  username  = user?.username
        const commentAdded = await Comment.create({
            userId,
            username,
            blogPostId,
            content
        })
        // Update the BlogPost model to push the new comment ID into the comments array
        await BlogPost.findByIdAndUpdate(blogPostId, {
            $push: { comments: commentAdded._id }
        });
        res.status(201).json({message: "comment added successfully", commentAdded})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error occured when adding comments", error: error})
    }
}
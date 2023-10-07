import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: String,
  content: String,
  author: {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    username: String,
  },

  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  tags: [String],
  
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
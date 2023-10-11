import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
  {
    title: String,
    content: String,
    author: {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      username: String,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type:Number, default: 0},
    tags: [String],
    pictureUrl: String,
  },
  {
    timestamps: true, // This option adds the createdAt and updatedAt fields
  }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  blogPostId: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
  username: String,
  content: String,
 
},
{
  timestamps: true
}
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

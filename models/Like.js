import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  blogPostId: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
  username: String, 
  
},
{
  timestamps:true
}
);

const Like = mongoose.model('Like', likeSchema);

export default Like;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  
});

const Like = mongoose.model('Like', likeSchema);

export default Like;

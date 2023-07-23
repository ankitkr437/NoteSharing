import mongoose from 'mongoose'
 
const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    noteId:{
      type: String,
    },
    text:{
        type:String,
    },
    likes: {
      type: Array,
      default: [],
    },
      
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
 export default  Comment;

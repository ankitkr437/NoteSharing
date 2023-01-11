import mongoose from 'mongoose'
 
const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price:{
      type:Number
    },
    notename:{
        type: String,
        max:15,
    },
    desc: {
      type: String,
      max: 500,
    },
    thumbnailfilename:{
      type:String,
    },
    notefilename:{
      type:String,
    },
    likes: {
      type: Array,
      default: [],
    },
      buy: {
        type: Array,
        default: [],
      },
      // comments :{
      //   type: Array,
      //   default: [],
      //  } ,
     
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
 export default  Note;

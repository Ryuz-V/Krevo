import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({

  name:{
    type:String,
    required:true,
    unique:true
  },

  slug:{
    type:String,
    required:true,
    unique:true
  },

  image:{
    url:String,
    public_id:String
  }


})

export default mongoose.models.Category ||
mongoose.model("Category",CategorySchema)
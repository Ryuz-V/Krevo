import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String
  },

  logo: {
    type: String
  },

  banner: {
    type: String
  },

  address: {
    type: String
  },

  city: {
    type: String
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  storeStatus: {
    type: String,
    default: "active"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);
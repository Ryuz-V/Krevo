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
    url: String,
    public_id: String
  },

  banner: {
    url: String,
    public_id: String
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
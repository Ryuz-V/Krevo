import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    mainImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },


    galleryImages: [
        {
            url:String,
            public_id:String
        }
    ],

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)
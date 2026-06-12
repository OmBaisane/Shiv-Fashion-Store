import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model("Product", productSchema);

export default Product;

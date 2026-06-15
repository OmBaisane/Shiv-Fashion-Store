import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const Order = models.Order || model("Order", orderSchema);

export default Order;

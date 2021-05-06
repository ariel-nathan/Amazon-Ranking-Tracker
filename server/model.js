import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const itemSchema = new mongoose.Schema({
  parent_sku: String,
  parent_asin: String,
  child_asin: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  rank: [
    {
      rank: {
        type: Number,
        default: null,
      },
      category: {
        type: String,
        default: null,
      },
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Item = mongoose.model("item", itemSchema);

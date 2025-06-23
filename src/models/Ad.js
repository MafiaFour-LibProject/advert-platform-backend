const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    media: [{ type: String }], // array of URLs
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendorName: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
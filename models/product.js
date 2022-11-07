const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: Object,
		},
		status: {
			type: String,
			default: "pending",
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

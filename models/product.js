const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		desc: String,
		img: {
			data: Buffer,
			contentType: String,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

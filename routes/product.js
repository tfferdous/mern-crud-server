const router = require("express").Router();
const { json } = require("express");
const Product = require("../models/product");

//add product
router.post("/", async (req, res) => {
	let { title, desc, price } = req.body;
	try {
		let newProduct = await Product.create({ title, desc, price });
		res.status(200).json({
			product: newProduct,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//get products
router.get("/", async (req, res) => {
	try {
		let products = await Product.find({});
		res.status(200).json({ products });
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

//get  single product
router.get("/:id", async (req, res) => {
	let { id } = req.params;
	try {
		let product = await Product.findById(id);
		res.status(200).json({ product });
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

//update product
router.patch("/:id", async (req, res) => {
	let { id } = req.params;
	let body = req.body;
	try {
		let updatedProduct = await Product.findOneAndUpdate({ _id: id }, body, {
			new: true,
		});
		res.status(200).json({ updatedProduct });
	} catch (error) {}
});

//delete  multiple products
router.delete("/", async (req, res) => {
	let { selectedProducts } = req.body;
	try {
		let deletedProducts = await Product.deleteMany({
			_id: { $in: selectedProducts },
		});
		res.status(200).json({
			deletedProducts,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

//delete product
router.delete("/:id", async (req, res) => {
	let { id } = req.params;

	try {
		let deletedProduct = await Product.findByIdAndDelete(id);
		res.status(200).json({
			deletedProduct,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

module.exports = router;

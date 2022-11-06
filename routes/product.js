const router = require("express").Router();
const Product = require("../models/product");
const path = require("path");
const upload = require("../middlewares/multer");
const fs = require("fs");

//add product
router.post("/", upload.single("img"), async (req, res) => {
	let { title, desc, price } = req.body;
	if (!req.file) return res.status(500).json({ message: "file not selected" });
	let body = {
		title,
		desc,
		price,
		img: {
			data: fs.readFileSync(
				path.join(__dirname, "../uploads/" + req.file.filename)
			),
			contentType: "image/png",
		},
	};

	try {
		let newProduct = await Product.create(body);
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
	console.log(req.body);
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

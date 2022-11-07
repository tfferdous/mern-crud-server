const router = require("express").Router();
const Product = require("../models/product");
const path = require("path");
const upload = require("../middlewares/multer");

//add product
router.post("/", upload.single("img"), async (req, res) => {
	const newImage = req.file.buffer.toString(`base64`);

	const image = {
		contentType: req.file.mimetype,
		size: req.file.size,
		img: Buffer.from(newImage, "base64"),
	};

	try {
		let product = Product({ ...req.body, img: image });
		let newProduct = await product.save();
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

//update multiple
router.put("/", async (req, res) => {
	const draftStatusChanges = req.body;
	const updateQueries = draftStatusChanges.map((item) => ({
		updateOne: {
			filter: {
				_id: item.id,
			},
			update: {
				status: item.status,
			},
		},
	}));

	try {
		await Product.bulkWrite(updateQueries);
		res.status(200).json({
			message: "updated successful",
		});
	} catch (error) {
		console.log(error.message);
	}
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

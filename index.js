//external imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//internal imports
const Product = require("./models/product");
const productRouter = require("./routes/product");

//initialize-app
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connect mongodb
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to database");
	})
	.catch((err) => {
		console.log("Error connecting to the database", err);
	});

//product router
app.use("/products", productRouter);

//listening server
let port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

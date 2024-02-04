const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  } = req.body;

  if (!name || !category || !brand || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  //crate Product
  const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  });
  res.status(201).json(product);
});

//get products
const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find().sort("-createdAt");
  res.status(200).json(product);
});
//get single
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found.");
  }
  res.status(200).json(product);
});

//Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found.");
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "product Delete." });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
};

const express = require('express');
const slugify = require('slugify');
const productModel = require('../models/products');
const categoryModel = require('../models/category');
const { where } = require('../models/products');


const fetchProduct = (products, _id=null) => {
  const productList = []
  let product;
  products.map(prod => {
    productList.push({
      name: prod.name,
      price: prod.price,
      category: categoryModel.findOne({_id: prod.category[0]})
      .exec((error, cat)=> {
        return cat.name
      })
    })
  })
  return productList
}

exports.addProducts = (req, res) => {
  let productPictures = [];
  if(req.files.length > 0){
    productPictures = req.files.map(file => {
      return {img: file.filename}
    })
  }

  const {name, price, description, category, quantity } = req.body;

  const productObject = {
    name,
    slug: slugify(req.body.name),
    price,
    description,
    productPictures: productPictures,
    quantity,
    category,
    createdBy: req.user._id
  }

  const product = new productModel(productObject);
  product.save((error, product)=>{
    error? res.status(400).json({error: error})
    : res.status(201).json({ product})
  })
  // res.status(201).json({ file: req.files, body: req.body})
}

exports.getProducts = (req, res) => {
  productModel.find({})
  .exec((error, products) => {
    if(products){
      const productList = fetchProduct(products, products[0].category);
      res.status(200).json({productList})
    }
  })
}
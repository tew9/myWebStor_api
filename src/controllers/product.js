const express = require('express');
const shortid = require('shortid');

exports.addProducts = (req, res) => {
  // const productObject = {
  //   name: req.body.name,
  //   slug: slugify(req.body.name),
  //   price: req.body.price,
  //   decription: req.body.description,
  //   offers: req.body.offers,
  //   productPicture: req.body.productPicture,
  //   review: req.body.review,
  //   createdBy: req.body.createdBy,
  //   updatedBy: req.body.updatedBy,
  //   category: req.body.updatedBy,
  //   seller: req.body.seller
  // }

  // const product = new productModel(productObject);
  // product.save((error, cat)=>{
  //   error? res.status(400).json({error: error})
  //   : res.status(201).json({ product})
  // })
  res.status(201).json({ file: req.file, body: req.body})
}

exports.getProducts = (req, res) => {
  res.status(200).json({products});
}
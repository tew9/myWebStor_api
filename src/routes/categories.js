const express = require('express');
const CategoryModel = require('../models/category');
const slugify = require('slugify');

const router = express.Router();

router.post('/categories', (req, res) => {
  const categoryObject = {
    name: req.body.name,
    slug: slugify(req.body.name)
  }

  if(req.body.parentId){
    categoryObject.parentId = req.body.parentId
  }

  const category = new CategoryModel(categoryObject);

  category.save((error, cat)=>{
    error? res.status(400).json({error: error})
    : res.status(201).json({ category})
  })
})

module.exports = router;
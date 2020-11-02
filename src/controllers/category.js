const categoryModel =  require('../models/category');
const slugify = require('slugify');

/**
* @author
* @function Category
**/

module.exports.addCategory = (req, res) => {
    const categoryObject = {
      name: req.body.name,
      slug: slugify(req.body.name)
    }
    if(req.body.parentId){
      categoryObject.parentId = req.body.parentId
    }
    const category = new categoryModel(categoryObject);
    category.save((error, cat)=>{
      error? res.status(400).json({error: error})
      : res.status(201).json({ category})
    })
 }
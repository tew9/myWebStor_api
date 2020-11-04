const categoryModel =  require('../models/category');
const slugify = require('slugify');

/**
* @author
* @function Category
**/

const createSubCategories = (categories, parentId=null) => {
  const categoryList = [];
  let category;
  if(parentId === null){
    category = categories.filter(cat => cat.parentId === undefined)
  }
  else{
    category = categories.filter(cat => cat.parentId === parentId)
  }

  for(let cat of category){
    categoryList.push({
      _id: cat._id,
      slug: cat.slug,
      name: cat.name,
      children: createSubCategories(categories, cat._id)
    })
  }
  return categoryList;
}

exports.addCategories = (req, res) => {
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

 exports.getCategories = (req, res) => {
    categoryModel.find({})
    .exec((error, categories) => {
      if(categories){
        const categoryList = createSubCategories(categories);
        res.status(200).json({categoryList})
      }
    })
 }
const express = require('express');
const multer = require('multer');
const { requireSignin, adminMiddleware } = require('../common-ware'); 
const router = express.Router();
const { addProducts, getProducts } = require('../controllers/product');
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() +' '+file.originalname)
  }
})
 
var upload = multer({ storage: storage })

router.post('/products/create', requireSignin, adminMiddleware, upload.array('productPicture'), addProducts);
router.get('/products/get', getProducts)

module.exports = router;
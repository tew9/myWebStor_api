const express = require('express');
const multer = require('multer');
const { requireSignin, adminMiddleware } = require('../common-ware'); 
const router = express.Router();
const { addProducts, getProducts } = require('../controllers/product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

router.post('/products/create', requireSignin, adminMiddleware, upload.single('productPicture'), addProducts);
router.get('/products/get', getProducts)

module.exports = router;
const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-ware'); 
const router = express.Router();
const { addCategories, getCategories } = require('../controllers/category')

router.post('/categories/create', requireSignin, adminMiddleware, addCategories);
router.get('/categories/get', getCategories)

module.exports = router;
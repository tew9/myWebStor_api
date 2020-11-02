const express = require('express');
const router = express.Router();
const { addCategory } = require('../controllers/category')

router.post('/categories/create', addCategory);

module.exports = router;
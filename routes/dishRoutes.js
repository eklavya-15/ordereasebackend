const express = require('express');
const { addDish, getAllCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/add-dish', addDish);
router.get('/categories', getAllCategories);

module.exports = router;

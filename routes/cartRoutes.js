const express = require('express');
const { addToCart,getCart,incrementCartItem,decrementCartItem,removeCartItem } = require('../controllers/cartController');

const router = express.Router();

router.post('/:userId', addToCart);
router.get('/:userId', getCart);
router.put('/:userId/increment', incrementCartItem);
router.put('/:userId/decrement', decrementCartItem);
router.delete('/:userId/:name', removeCartItem);

module.exports = router;

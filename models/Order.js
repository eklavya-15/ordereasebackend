
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,
  amount: Number,
  food: String,
  orderId: String,
  paymentId: String,
  status: String, // 'success' or 'failed'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);

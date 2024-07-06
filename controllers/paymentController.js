require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, currency, receipt, userId, userEmail, food } = req.body;

  try {
    const options = {
      amount: amount, 
      currency: currency,
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);
    console.log(order);

    const newOrder = new Order({
      userId,
      userEmail,
      amount,
      food,
      orderId: order.id,
      status: 'pending',
    });

    await newOrder.save();

    res.json({ orderId: order.id, amount: order.amount, razorpayKey: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).send('Error creating order');
  }
};

exports.verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature, userId, userEmail, amount, food } = req.body;

  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const status = generatedSignature === signature ? 'success' : 'failed';

  try {
    await Order.findOneAndUpdate(
      { orderId },
      {
        paymentId,
        status,
      },
      { new: true }
    );

    res.json({ verified: status === 'success' });
  } catch (error) {
    res.status(500).send('Error verifying payment');
  }
};

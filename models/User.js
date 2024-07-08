const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AddressSchema = new mongoose.Schema({
  id: { type:  mongoose.Schema.Types.ObjectId, required: true }, 
  houseNumber: { type: String, required: true },
  Area: { type: String, required: true },
  City: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  name: { type: String },
  address: { type: [String] },
  number: { type: String },
  orders: { type: [ mongoose.Schema.Types.Mixed] },
  selectedOption: { type: String },
  tableNo: { type: String },
  selectedAddress: { type: String },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

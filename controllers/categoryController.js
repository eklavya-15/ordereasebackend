const { Dish, Category } = require('../models/Category'); 

const addDish = async (req, res) => {
  const { categoryId, id, name, price, image, description, nutrients } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newDish = new Dish({ id, name, price, image, description, nutrients });
    category.dishes.push(newDish);
    await category.save();

    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('dishes');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDish, getAllCategories };

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import Order from '../models/orderModel.js';
import connectDB from '../utils/db.js';

dotenv.config();

connectDB();

const categories = [
  { name: 'Organic Henna Cones', slug: 'organic-henna-cones', description: '100% natural, chemical-free henna cones' },
  { name: 'Henna Powder', slug: 'henna-powder', description: 'Premium triple-sifted Rajasthani henna powder' },
  { name: 'Essential Oils', slug: 'essential-oils', description: 'Pure essential oils for henna mixing' },
  { name: 'Henna Practice Kits', slug: 'henna-practice-kits', description: 'Everything you need to practice your henna art' },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@hibah.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
      { name: 'Test User', email: 'user@hibah.com', password: await bcrypt.hash('user123', 10), role: 'user' },
    ]);

    const adminUser = createdUsers[0]._id;

    const createdCategories = await Category.insertMany(categories);
    const conesCategory = createdCategories.find(c => c.slug === 'organic-henna-cones')._id;

    const sampleProducts = [
      {
        name: 'Bridal Henna Cone Set',
        slug: 'bridal-henna-cone-set',
        category: conesCategory,
        price: 399,
        compareAtPrice: 499,
        images: [{ url: 'https://placehold.co/600x600/f2d9c4/924a28?text=Bridal+Cones' }],
        description: 'Premium bridal henna cones for dark stains. Includes 5 large cones.',
        shortDescription: '5x Premium bridal henna cones',
        stock: 50,
        isFeatured: true,
      },
      {
        name: 'Basic Practice Cones',
        slug: 'basic-practice-cones',
        category: conesCategory,
        price: 199,
        images: [{ url: 'https://placehold.co/600x600/f2d9c4/924a28?text=Practice+Cones' }],
        description: 'Perfect for beginners to practice their lines and shapes. Set of 3.',
        shortDescription: '3x Practice henna cones',
        stock: 100,
        isBestSeller: true,
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Banner from '../models/Banner.js';

dotenv.config();

const categories = [
  { name: 'Mehendi Cones', slug: 'mehendi-cones', description: 'Fresh organic chemical-free henna cones.' },
  { name: 'Henna Products', slug: 'henna-products', description: 'Essential henna tools and supplies.' },
  { name: 'After Care Products', slug: 'after-care-products', description: 'Oils, balms and sprays to protect your mehendi stain.' },
  { name: 'Practice Kits', slug: 'practice-kits', description: 'Everything a beginner needs to learn mehendi art.' },
];

const sampleProducts = (catMap) => [
  { name: 'Organic Bridal Henna Cone', slug: 'organic-bridal-henna-cone', description: 'Premium triple-sifted Rajasthani henna with eucalyptus and tea tree oils. Rich dark bridal stain.', price: 150, discountedPrice: 120, category: catMap['Mehendi Cones'], images: [{ public_id: 'sample1', secure_url: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=600' }], stock: 50, isFeatured: true, isBestSeller: true },
  { name: 'Regular Henna Cone', slug: 'regular-henna-cone', description: 'Everyday use henna cone with smooth flow tip. Perfect for simple designs.', price: 80, discountedPrice: 65, category: catMap['Mehendi Cones'], images: [{ public_id: 'sample2', secure_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600' }], stock: 100, isNewArrival: true },
  { name: 'Henna Powder 100g', slug: 'henna-powder-100g', description: 'Triple-sifted pure Sojat henna powder. No chemicals, no additives. Deep natural stain.', price: 199, discountedPrice: 159, category: catMap['Henna Products'], images: [{ public_id: 'sample3', secure_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }], stock: 80, isFeatured: true },
  { name: 'Henna Oil', slug: 'henna-oil', description: 'Eucalyptus and tea tree blend oil for mixing henna paste for better stain results.', price: 149, discountedPrice: 119, category: catMap['Henna Products'], images: [{ public_id: 'sample4', secure_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600' }], stock: 60 },
  { name: 'Mehendi Spatula', slug: 'mehendi-spatula', description: 'Stainless steel spatula for mixing henna paste smoothly without lumps.', price: 49, discountedPrice: 39, category: catMap['Henna Products'], images: [{ public_id: 'sample5', secure_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600' }], stock: 120 },
  { name: 'Henna Filter Cloth', slug: 'henna-filter-cloth', description: 'Fine mesh filter cloth to strain henna paste and remove lumps before filling cones.', price: 35, category: catMap['Henna Products'], images: [{ public_id: 'sample6', secure_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600' }], stock: 200 },
  { name: 'Mixing Container', slug: 'mixing-container', description: 'Food-grade plastic container with lid for mixing and storing henna paste.', price: 59, category: catMap['Henna Products'], images: [{ public_id: 'sample7', secure_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600' }], stock: 90 },
  { name: 'Piping Bag Pack of 10', slug: 'piping-bag-pack-10', description: 'Disposable clear piping bags for filling and applying henna. Easy to use and hygienic.', price: 79, discountedPrice: 59, category: catMap['Henna Products'], images: [{ public_id: 'sample8', secure_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600' }], stock: 150 },
  { name: 'Spray Bottle', slug: 'spray-bottle', description: 'Fine mist spray bottle for sealing henna designs with sugar-lemon mix.', price: 69, category: catMap['Henna Products'], images: [{ public_id: 'sample9', secure_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600' }], stock: 75 },
  { name: 'Cellophane Sheet Pack of 20', slug: 'cellophane-sheet-pack-20', description: 'Transparent cellophane sheets to wrap henna designs and retain heat for darker stains.', price: 89, discountedPrice: 69, category: catMap['Henna Products'], images: [{ public_id: 'sample10', secure_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600' }], stock: 100 },
  { name: 'Roller Bottle', slug: 'roller-bottle', description: 'Glass roller bottle for applying essential oils precisely on henna designs.', price: 99, discountedPrice: 79, category: catMap['Henna Products'], images: [{ public_id: 'sample11', secure_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600' }], stock: 55 },
  { name: 'After Care Oil', slug: 'after-care-oil', description: 'Tea tree, eucalyptus and clove blend. Apply on dry mehendi before peeling for rich dark stain.', price: 250, discountedPrice: 199, category: catMap['After Care Products'], images: [{ public_id: 'sample12', secure_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600' }], stock: 45, isFeatured: true, isBestSeller: true },
  { name: 'After Care Balm', slug: 'after-care-balm', description: 'Nourishing balm with natural beeswax and essential oils. Moisturises while protecting henna stain.', price: 220, discountedPrice: 179, category: catMap['After Care Products'], images: [{ public_id: 'sample13', secure_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600' }], stock: 40 },
  { name: 'Sealant Spray', slug: 'sealant-spray', description: 'Sugar and lemon sealant spray. Keeps henna moist for longer to boost colour depth.', price: 180, discountedPrice: 149, category: catMap['After Care Products'], images: [{ public_id: 'sample14', secure_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600' }], stock: 60, isNewArrival: true },
  { name: 'Henna Practice Kit', slug: 'henna-practice-kit', description: 'Complete beginner kit with practice sheets, empty cones, henna powder sample and tips booklet.', price: 599, discountedPrice: 499, category: catMap['Practice Kits'], images: [{ public_id: 'sample15', secure_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }], stock: 30, isFeatured: true },
  { name: 'Pre-Cut Cellophane Sheet Pack of 50', slug: 'pre-cut-cellophane-sheet-pack-50', description: 'Ready-to-use pre-cut cellophane sheets sized for hand wrapping. Great for practice and professional use.', price: 149, discountedPrice: 119, category: catMap['Practice Kits'], images: [{ public_id: 'sample16', secure_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600' }], stock: 80 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas...');

    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Existing data cleared.');

    const seededCats = await Category.insertMany(categories);
    const catMap = {};
    seededCats.forEach((c) => { catMap[c.name] = c._id; });
    console.log('✅ 4 categories seeded: Mehendi Cones, Henna Products, After Care Products, Practice Kits');

    await Product.insertMany(sampleProducts(catMap));
    console.log('✅ 16 products seeded across 4 categories');

    // Passwords are plain text here — User model pre-save hook hashes them automatically
    await User.create([
      { name: 'Admin User', email: 'admin@hibah.com', password: 'admin123', mobile: '9999999999', role: 'Admin' },
      { name: 'Test Customer', email: 'customer@hibah.com', password: 'customer123', mobile: '9876543210', role: 'User' },
    ]);
    console.log('✅ Admin and Customer accounts seeded');

    await Banner.deleteMany({});
    await Banner.create({ textBanner: { enabled: false, message: '', color: 'green', startDate: null, endDate: null }, posterBanner: { enabled: false, imageUrl: '', publicId: '', linkTo: '/shop' } });
    console.log('✅ Default banner created');
    console.log('\n🎉 Database seeding completed!');
    console.log('   Admin   → admin@hibah.com / admin123');
    console.log('   Customer→ customer@hibah.com / customer123');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seed error:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDB();

import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, discountedPrice, categoryId, stock, imagesJson, isFeatured, isBestSeller, isNewArrival } = req.body;
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({ message: 'name, description, price and categoryId are required' });
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ message: 'Invalid category' });

    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        images.push(result);
      }
    }
    if (images.length === 0 && imagesJson) {
      try {
        const parsed = JSON.parse(imagesJson);
        images = parsed.map((img) => ({
          public_id: img.publicId || img.public_id || '',
          secure_url: img.url || img.secure_url,
        }));
      } catch {}
    }

    const product = await Product.create({
      name, slug, description,
      price: Number(price),
      discountedPrice: discountedPrice ? Number(discountedPrice) : 0,
      category: categoryId, images,
      stock: stock ? Number(stock) : 0,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      isBestSeller: isBestSeller === 'true' || isBestSeller === true,
      isNewArrival: isNewArrival === 'true' || isNewArrival === true,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, discountedPrice, categoryId, stock, imagesJson, isFeatured, isBestSeller, isNewArrival } = req.body;

    if (name) { product.name = name; product.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); }
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (discountedPrice !== undefined) product.discountedPrice = Number(discountedPrice);
    if (stock !== undefined) product.stock = Number(stock);
    if (isFeatured !== undefined) product.isFeatured = isFeatured === 'true' || isFeatured === true;
    if (isBestSeller !== undefined) product.isBestSeller = isBestSeller === 'true' || isBestSeller === true;
    if (isNewArrival !== undefined) product.isNewArrival = isNewArrival === 'true' || isNewArrival === true;

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) return res.status(400).json({ message: 'Invalid category' });
      product.category = categoryId;
    }

    if (req.files && req.files.length > 0) {
      for (const img of product.images) {
        if (img.public_id) await deleteFromCloudinary(img.public_id);
      }
      product.images = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        product.images.push(result);
      }
    } else if (imagesJson) {
      try {
        const parsed = JSON.parse(imagesJson);
        product.images = parsed.map((img) => ({
          public_id: img.publicId || img.public_id || '',
          secure_url: img.url || img.secure_url,
        }));
      } catch {}
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      for (const img of product.images) {
        if (img.public_id) await deleteFromCloudinary(img.public_id);
      }
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

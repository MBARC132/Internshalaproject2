import Product from '../models/Product.js';

// GET /products - fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// GET /products/:id - fetch product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID', error });
  }
};

// POST /products - add new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, image } = req.body;

    if (!name || !price || !description || !stock || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = new Product({
      name,
      price,
      description,
      stock,
      image // image should be a URL
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// PUT /products/:id - update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, image } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Invalid data or ID', error: error.message });
  }
};

// DELETE /products/:id - delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID or deletion failed', error });
  }
};


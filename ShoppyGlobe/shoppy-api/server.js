import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import productRoutes from './routes/Product.js';
import cartRoutes from './routes/Cart.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connection Successful");
});

db.on("error", (error) => {
  console.error("Connection is not Successful", error);
});

app.get('/', (req, res) => {
  res.send('Welcome to ShoppyGlobe API!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

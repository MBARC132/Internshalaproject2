import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true},
    description: String,
    stockQuantity: { type: Number, required: true, default: 0 },
    image: String 
});
export default mongoose.model('Product', productSchema);

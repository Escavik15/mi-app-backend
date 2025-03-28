import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  userId : { type: String, require:true },
  image : { type:String},
  createdAt: { type: Date, default: Date.now }
});

export const Products = mongoose.model('Product', productSchema);


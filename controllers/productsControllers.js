import {Products} from "../models/productsModel.js";

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = new Products({
    name,
    description,
    price,
    category,
    stock,
    userId: id,

  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock } = req.body;
  if(!id){
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const product = await Products.findById(id);

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Eliminar un producto

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
    if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
    }
  try {
    await Products.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const findOneProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required  " });
  }
  try {
    const product = await Products.findById(id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const findProducts = async (req, res) => {
  const { name } = req.body;
  if(!name){
    return res.status(400).json({ message: "Name is required"});
  }
  try {
   //buscar por nombre
    const products = await Products.find({ name: { $regex: name, $options: "i" } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const findProductsByUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const products = await Products.find({ userId: id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
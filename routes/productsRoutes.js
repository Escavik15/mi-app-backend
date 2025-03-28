import express from 'express'
const router = express.Router();
import {getAllProducts, createProduct, deleteProduct, updateProduct, findProducts} from '../controllers/productsControllers.js'

// Ruta para obtener todos los productos
router.get('/', getAllProducts);

// Ruta para crear un producto
router.get('/', getAllProducts);
router.post('/:id', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/', findProducts);


export default router

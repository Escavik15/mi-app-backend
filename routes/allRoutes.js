import express from 'express';
const router = express.Router();

// Definir las rutas de usuarios
import usersRoutes from './usersRoutes.js'; // Asegúrate de que este archivo exista
import productRoutes from './productsRoutes.js'; // Asegúrate de que este archivo exista

// Usar las rutas
router.use('/users', usersRoutes);  // Ruta para /users
router.use('/products', productRoutes);  // Ruta para /products

export default router;
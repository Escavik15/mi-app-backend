import express from 'express'
import {connectDB} from './config/database.js'
import router from './routes/allRoutes.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

import express from 'express'
const router = express.Router();
import { userCreate,userDelete, userUpdate,  searchOneUser, getAllUsers, userLogin } from '../controllers/usersControllers.js';



// Ruta para crear un producto
router.post('/register', userCreate);
router.post('/login', userLogin);
router.get('/allusers', getAllUsers);
router.get('/:id', searchOneUser);
router.patch('/:id', userUpdate);
router.delete('/:id', userDelete);



export default router
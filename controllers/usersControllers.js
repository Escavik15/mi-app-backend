import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Users } from '../models/usersModel.js';


dotenv.config();

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
}

export const userCreate = async (req, res) => {
  const { name, email, password, birthDate, address, mobilePhone, dni } = req.body;

  try {
    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !password || !birthDate || !address || !mobilePhone || !dni) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
   // Validar si birthDate es un string con formato YYYY-MM-DD
   if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    return res.status(400).json({ message: 'Formato de fecha inválido, usa YYYY-MM-DD' });
  }

  // Convertir birthDate a un objeto Date
  const parsedBirthDate = new Date(birthDate);
  if (isNaN(parsedBirthDate.getTime())) {
    return res.status(400).json({ message: 'La fecha de nacimiento no es válida' });
  }

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Generar un token JWT para el usuario
    const tokenGenerate = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    



    // Crear el nuevo usuario
    const newUser = new Users({
      name,
      email,
      password: passwordHash, // Guardar la contraseña encriptada
      birthDate : parsedBirthDate,
      address,
      mobilePhone,
      dni,
      token: tokenGenerate,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    
    res.status(201).json({ message: 'Usuario creado correctamente' });

  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};


export const searchOneUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
}

export const userLogin = async (req, res) => {
  try{
    const { email, password } = req.body;
    // Validar que todos los campos requeridos estén presentes
    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    // Verificar si el usuario existe en la base de datos
    const existingUser = await Users.findOne({ email });
    
    if (!existingUser) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }
    // Verificar si la contraseña es correcta
    console.log(existingUser );
    const passwordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    // Generar un token JWT para el usuario
    const verifyToken = jwt.verify(existingUser.token, process.env.JWT_SECRET);
    if(verifyToken){
      return res.status(400).json({ message: 'El usuario ya esta logueado' });
    }
    if(verifyToken.exp < Date.now() / 1000){
     return res.status(400).json({ message: 'El token ha expirado', tokenGenerate });
    }
    const tokenGenerate = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Guardar el token en la base de datos
    existingUser.token = tokenGenerate;
    await existingUser.save();
    res.status(200).json({ message: 'Usuario logueado correctamente',  existingUser });
    


  }catch(error){
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
}

export const userLogout = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    user.token = '';
    await user.save();
    res.status(200).json({ message: 'Usuario deslogueado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al desloguear al usuario', error: error.message });
  }
}

export const userUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, email, password, birthDate, address, mobilePhone, dni } = req.body;
    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !password || !birthDate || !address || !mobilePhone || !dni) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    // Validar si birthDate es un string con formato YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      return res.status(400).json({ message: 'Formato de fecha inválido, usa YYYY-MM-DD' });
    }
    // Convertir birthDate a un objeto Date
    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
      return res.status(400).json({ message: 'La fecha de nacimiento no es válida' });
    }
    
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    // Actualizar el usuario
    console.log(id)
    const user = await Users.findById(id);
    user.name = name;
    user.email = email;
    user.password = passwordHash;
    user.birthDate = parsedBirthDate;
    user.address = address;
    user.mobilePhone = mobilePhone;
    user.dni = dni;
    
    await user.save();
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
}

export const userDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
}


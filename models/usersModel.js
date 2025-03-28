import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'],
    trim: true, // Elimina espacios al principio y al final
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
  },
  email: { 
    type: String, 
    required: [true, 'El correo electrónico es obligatorio'], 
    unique: true, 
    match: [/^([\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7})$/, 'Por favor ingresa un correo electrónico válido']
  },
  password: { 
    type: String, 
    required: [true, 'La contraseña es obligatoria'], 
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    
  },
  avatar: { 
    type: String,
    default: null // Permitir que sea nulo si el usuario no sube avatar
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Se asigna automáticamente la fecha de creación
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  birthDate: { 
    type: Date, 
    required: [true, 'La fecha de nacimiento es obligatoria'] 
  },
  address: { 
    type: String, 
    required: [true, 'La dirección es obligatoria'],
    trim: true, 
  },
  mobilePhone: { 
    type: String, 
    required: [true, 'El teléfono móvil es obligatorio'],
    match: [/^\+?(\d{1,3})?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'El teléfono móvil no es válido'] // Validación simple para formato de teléfono
  },
  dni: { 
    type: Number, 
    required: [true, 'El DNI es obligatorio'], 
    unique: true,
    match: [/^\d{8}[A-Za-z]$/, 'El DNI no es válido'] // Validación simple para DNI español (8 números + letra)
  },
  token: { 
    type: String,
    default: null, 
  }
});

export const Users = mongoose.model('User', userSchema);


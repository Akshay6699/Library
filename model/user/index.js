import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true
  },
  email: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: Number,
    enum: [0, 2],
    default: 0
  }
}, { timestamps: true })

export const UserModel = mongoose.model('user', userSchema)

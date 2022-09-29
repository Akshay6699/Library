import mongoose from 'mongoose'

const Schema = mongoose.Schema

const librarySchema = new Schema({
  libAdminName: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true
  },
  libAdminEmail: {
    type: String,
    required: true
  },
  libAdminPhone: {
    type: Number,
    req: true,
    maxLength: 10
  },
  libraryName: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true
  },
  libraryEmail: {
    type: String,
    required: true
  },
  libraryPhone: {
    type: Number,
    req: true,
    maxLength: 10
  },
  libraryAddress: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true
  },
  role: {
    type: Number,
    default: 1
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

export const Library = mongoose.model('library', librarySchema)

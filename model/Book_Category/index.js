import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true,
    unique: true
  }
}, { timestamps: true })

export const bookCategoryModel = mongoose.model('bookCategory', bookCategorySchema)

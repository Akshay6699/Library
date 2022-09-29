import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
    maxLength: 64,
    trim: true
  },
  bookCategory: {
    type: ObjectId,
    ref: 'bookCategory',
    required: true
  },
  bookAuthor: {
    type: String,
    req: true,
    maxLength: 34,
    trim: true
  },
  bookPublisher: {
    type: String,
    req: true,
    maxLength: 34,
    trim: true
  },
  bookPrice: {
    type: Number,
    req: true
  },
  bookRentPrice: {
    type: Number,
    req: true
  },
  bookQuantity: {
    type: Number,
    req: true
  },
  bookPhotos: {
    type: Array,
    req: true
  },
  liborSellerId: {
    type: ObjectId,
    ref: 'Library',
    required: true
  }
})

export const BookModel = mongoose.model('book', bookSchema)

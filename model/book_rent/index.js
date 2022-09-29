import mongoose from 'mongoose'
import { BookModel } from '../book/index.js'
import { Library } from '../library/index.js'
import { UserModel } from '../user/index.js'
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const bookRentSchema = new Schema({
  bookName: {
    type: String,
    required: true,
    maxLength: 34,
    trim: true
  },
  bookRentPrice: {
    type: Number,
    ref: BookModel,
    req: true
  },
  bookId: {
    type: ObjectId,
    ref: BookModel,
    required: true
  },
  liborSellerId: {
    type: ObjectId,
    ref: Library,
    required: true
  },
  userId: {
    type: ObjectId,
    ref: UserModel,
    required: true
  },
  rentTime: {
    type: Number,
    default: Date.now()
  },
  returnOrNot: {
    type: String,
    default: 'rent'
  }
})

export const BookRent = mongoose.model('bookrent', bookRentSchema)

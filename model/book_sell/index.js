import mongoose from 'mongoose'
import { BookModel } from '../book/index.js'
import { Library } from '../library/index.js'
import { UserModel } from '../user/index.js'
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const bookSellSchema = new Schema({
  bookName: {
    type: String,
    required: true,
    maxLength: 34,
    trim: true
  },
  bookSellPrice: {
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
  sellTime: {
    type: Number,
    default: Date.now()
  },
  soldOrReturn: {
    type: String,
    default: 'sold'
  },
  sellRequest: {
    type: String,
    enum: ['accept', 'reject', 'pending', 'null'],
    default: 'null'
  }
})

export const BookSell = mongoose.model('booksell', bookSellSchema)

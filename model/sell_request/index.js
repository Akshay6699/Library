import mongoose from 'mongoose'
import { BookModel } from '../book/index.js'
import { Library } from '../library/index.js'
import { UserModel } from '../user/index.js'
import { BookSell } from '../book_sell/index.js'

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const returnRequestSchema = new Schema({
  bookName: {
    type: String,
    required: true
  },
  bookReturnPrice: {
    type: Number,
    req: true
  },
  bookId: {
    type: ObjectId,
    ref: BookModel,
    req: true
  },
  liborSellerId: {
    type: ObjectId,
    ref: Library,
    req: true
  },
  userId: {
    type: ObjectId,
    ref: UserModel,
    req: true
  },
  sellId: {
    type: ObjectId,
    ref: BookSell,
    req: true
  },
  AcceptorReject: {
    type: String,
    enum: ['accept', 'reject', 'pending'],
    default: 'pending'
  }
})

export const BookSellRequest = mongoose.model('SellRequest', returnRequestSchema)

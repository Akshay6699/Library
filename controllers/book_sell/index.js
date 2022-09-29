import { BookModel, BookSell, BookSellRequest } from '../../model/index.js'

export const getbookSellById = (req, res, next, id) => {
  BookSell.findById(id).exec((error, sellbook) => {
    if (error) {
      console.log(error)
      return res.status(400).json({ error: 'can\'t find selled book' })
    }
    console.log(sellbook)
    req.sellBooks = sellbook
    next()
  })
}

export const bookSell = async (req, res) => {
  const user = req.userprofile
  const book = req.book

  // distracting book information
  const { bookName, bookPrice, _id, liborSellerId } = book
  console.log(bookName, bookPrice, _id, liborSellerId)

  // distracting userid
  const userId = user._id
  console.log(userId)

  const sellBook = { bookName, bookSellPrice: bookPrice, bookId: _id, liborSellerId, userId }
  try {
    // saving Data
    const bookSell = await new BookSell(sellBook).save()

    // decrease quantity
    await BookModel.findByIdAndUpdate({ _id }, { $inc: { bookQuantity: -1 } })

    return res.status(200).json({ bookSell })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      err: 'can\'t save to db'
    })
  }
}

export const getbookSellOrder = (req, res) => {
  return res.status(200).json(req.sellBooks)
}

export const returnSoldBook = async (req, res) => {
  const sold = req.sellBooks

  // Destructuring rented
  const { sellTime, _id, bookId, bookSellPrice, bookName, liborSellerId, userId } = sold
  console.log(sellTime, _id, bookSellPrice)

  const EmdDate = sellTime + 120 * 1000
  // console.log(EmdDate)

  // console.log(Date.now())
  const rightNow = Date.now()

  if (rightNow > EmdDate) {
    const bookReturnPrice = bookSellPrice / 2
    const request = { bookName, bookReturnPrice, bookId, liborSellerId, userId, sellId: _id }
    // return res.status(400).json({ message: 'time is gone you can sell book of half of sell price' })
    const bookSellRequset = await new BookSellRequest(request).save()
    await BookSell.findByIdAndUpdate({ _id }, { $set: { sellRequest: 'pending' } })
    const requestStatus = await BookSell.findById({ _id })
    return res.status(200).json({ bookSellRequset, satus: requestStatus.sellRequest })
  } else {
    try {
      await BookModel.findByIdAndUpdate({ _id: bookId }, { $inc: { bookQuantity: 1 } })
      const updateBookStatus = await BookSell.findByIdAndUpdate({ _id }, { $set: { returnOrNot: 'returned' } })
      return res.status(400).json({ updateBookStatus })
    } catch (e) {
      return res.status(400).json({ e })
    }
  }
}

export const getUserOrderById = (req, res) => {
  const order = req.sellBooks
  const user = req.userprofile
  // console.log('user', user._id)
  // console.log('order', order._id)
  BookSell.find({ $and: [{ _id: order._id }, { userId: user._id }] }).exec((error, order) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find order' })
    }
    return res.status(200).json({ order })
  })
}

export const getUserAllOrderById = (req, res) => {
  const user = req.userprofile
  // console.log('user', user._id)
  // console.log('order', order._id)
  const objectId = user._id.toString()

  BookSell.find({ userId: objectId }).exec((error, order) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find order' })
    }
    return res.status(200).json({ order })
  })
}

export const getSellerSellOrderById = (req, res) => {
  const seller = req.libprofile
  const order = req.sellBooks
  // console.log('sellerr', seller._id)
  // console.log('order', order._id)
  BookSell.find({ $and: [{ _id: order._id }, { liborSellerId: seller._id }] }).exec((error, order) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find order' })
    }
    return res.status(200).json({ order })
  })
}

export const getSellerAllSellOrderById = (req, res) => {
  const seller = req.libprofile
  // console.log('sellerr', seller._id)
  // console.log('order', order._id)
  const objectId = seller._id.toString()
  BookSell.find({ liborSellerId: objectId }).exec((error, order) => {
    if (error) {
      console.log(error)
      return res.status(400).json({ error: 'can\'t find order' })
    }
    return res.status(200).json({ order })
  })
}

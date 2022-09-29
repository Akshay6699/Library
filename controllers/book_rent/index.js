import { BookModel, BookRent } from '../../model/index.js'

export const getbookRentById = (req, res, next, id) => {
  BookRent.findById(id).exec((error, rentbook) => {
    if (error) {
      console.log(error)
      return res.status(400).json({ error: 'can\'t find rented book' })
    }
    req.rentedBook = rentbook
    next()
  })
}

export const bookRent = async (req, res) => {
  const user = req.userprofile
  const book = req.book

  // distracting book information
  const { bookName, bookRentPrice, _id, liborSellerId, bookQuantity } = book
  console.log(bookName, bookRentPrice, _id, liborSellerId)

  // distracting userid
  console.log(user)
  const userId = user._id
  console.log(userId)

  // decreas the quantity of book
  const newQuantity = bookQuantity - 1

  const rentedBook = { bookName, bookRentPrice, bookId: _id, liborSellerId, userId }
  try {
    // saving Data
    const bookRent = await new BookRent(rentedBook).save()

    // decrease quantity
    await BookModel.updateOne({ _id }, { $set: { bookQuantity: newQuantity } })

    return res.status(200).json({ bookRent })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      err: 'can\'t save to db'
    })
  }
}

export const getbookRent = (req, res) => {
  return res.status(200).json(req.rentedBook)
}

export const bookReturn = async (req, res) => {
  const rented = req.rentedBook

  // Destructuring rented
  const { rentTime, _id, returnOrNot, bookId } = rented
  console.log(rentTime, _id, returnOrNot)

  // Checking book is return or not
  if (returnOrNot == 'returned') {
    return res.status(400).json({ message: 'you already return the book' })
  }

  const EmdDate = rentTime + 120 * 1000
  // console.log(EmdDate)

  // console.log(Date.now())
  const rightNow = Date.now()

  const extraDays = rightNow - EmdDate
  // console.log(penalty)

  // const date = penalty / 86400000
  const date = extraDays / 60000
  // console.log(Math.trunc(date))

  let penalty = 0

  if (rightNow > EmdDate) {
    // console.log("Time' up you have to give penalty")
    for (let i = 1; i <= Math.trunc(date); i++) {
      penalty += 5
      await BookRent.findByIdAndUpdate({ _id }, { $inc: { bookRentPrice: 5 } })
    }
    try {
      await BookModel.findByIdAndUpdate({ _id: bookId }, { $inc: { bookQuantity: 1 } })
      const updateBookRent = await BookRent.findByIdAndUpdate({ _id }, { $set: { returnOrNot: 'returned' } })
      return res.status(400).json({ updateBookRent, message: `you have to give penalty ${penalty}` })
    } catch (e) {
      return res.status(400).json({ e })
    }
  } else {
    try {
      await BookModel.findByIdAndUpdate({ _id: bookId }, { $inc: { bookQuantity: 1 } })
      const updateBookRent = await BookRent.findByIdAndUpdate({ _id }, { $set: { returnOrNot: 'returned' } })
      return res.status(400).json({ updateBookRent })
    } catch (e) {
      return res.status(400).json({ e })
    }
  }
}

export const getAllRentedBookByLibAdmin = async (req, res) => {
  const id = req.libprofile
  console.log(id)
  BookRent.find({ liborSellerId: id }).exec((error, books) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find any rented books' })
    }
    return res.status(200).json({ books })
  })
}

export const getRentedBookByNameForLidAdmin = async (req, res) => {
  const id = req.libprofile
  const name = req.body.name
  console.log(id)
  BookRent.find({ $and: [{ liborSellerId: id }, { bookName: name }] }).exec((error, books) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find any rented books' })
    }
    return res.status(200).json({ books })
  })
}

export const getAllRentedBookByUser = async (req, res) => {
  const id = req.userprofile
  // console.log(id)
  await BookRent.find({ userId: id }).exec((error, books) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find any rented books' })
    }
    return res.status(200).json({ books })
  })
}

export const getRentedBookByNameForUser = async (req, res) => {
  const id = req.userprofile
  const name = req.body.name
  await BookRent.find({ $and: [{ userId: id }, { bookName: name }] }).exec((error, books) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find any rented books' })
    }
    return res.status(200).json({ books })
  })
}

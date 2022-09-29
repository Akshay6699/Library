import { bookCategoryModel, BookModel } from '../../model/index.js'

// Search Book by id
export const getBookById = (req, res, next, id) => {
  BookModel.findById(id).exec((err, book) => {
    if (err) {
      return res.status(400).json({
        err: 'can\'t find Book'
      })
    }
    req.book = book
    next()
  })
}

// Create Book
export const createBook = async (req, res) => {
  const data = req.body
  // console.log(data)
  // console.log(req.files)

  // image array
  const imageName = []
  data.bookPhotos = imageName

  // push image into array
  // eslint-disable-next-line array-callback-return
  req.files.map((data) => {
    imageName.push(data.filename)
  })

  // Find Category from Category
  const categoryId = await bookCategoryModel.findOne(
    { name: data.bookCategory },
    { _id: 1 }
  )
  // console.log(categoryId)
  data.bookCategory = categoryId._id

  // Linking Seller or library id
  const libadminid = req.params.libadminId
  data.liborSellerId = libadminid

  // Checking all fields are included
  if (!data.bookName || !data.bookCategory || !data.bookAuthor || !data.bookPublisher || !data.bookPrice || !data.bookQuantity) {
    return res.status(400).json({
      error: 'Please include all fields'
    })
  }

  // Checking Book is already exist or not
  const book = await BookModel.find({ $and: [{ bookName: data.bookName }, { liborSellerId: data.liborSellerId }] })
  console.log('book', book)

  if (book.length === 0) {
    try {
      // saving book into database
      const createdBook = await new BookModel(data).save()
      return res.status(200).json({
        message: 'Created successfully',
        createdBook
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        message: 'Unable to create Book'
      })
    }
  } else {
    return res.status(400).json({
      message: `you already add this book ${book.bookName}`
    })
  }
}

// Search One book
export const getBook = (req, res) => {
  return res.status(200).json(req.book)
}

// Search library book
export const getLibraryBook = (req, res) => {
  BookModel.find({ $and: [{ liborSellerId: req.params.libadminId }, { _id: req.params.bookid }] }).exec((err, book) => {
    if (err) {
      return res.status(400).json({
        err: 'There is no category'
      })
    }
    return res.json({
      book
    })
  })
}

// Search All Book
export const getLibraryAllBooks = (req, res) => {
  BookModel.find({ liborSellerId: req.params.libadminId }).exec((err, book) => {
    if (err) {
      return res.status(400).json({
        err: 'There is no category'
      })
    }
    return res.json({
      book
    })
  })
}

// Search book by Name
export const getLibreryBookByName = (req, res) => {
  console.log(req.body.name)
  console.log(req.params.libadminId)
  BookModel.find({ $and: [{ bookName: req.body.name }, { liborSellerId: req.params.libadminId }] }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by name'
      })
    }
    return res.status(200).json(books)
  })
}

// Search book by Category
export const getLibreryBookByCategory = async (req, res) => {
  const bookName = req.body.category
  console.log(bookName)
  // Find Category from Category
  const categoryId = await bookCategoryModel.findOne(
    { name: bookName },
    { _id: 1 }
  )
  console.log(categoryId._id)

  const category = categoryId._id

  try {
    const book = await BookModel.find({ $and: [{ bookCategory: category }, { liborSellerId: req.params.libadminId }] })
    return res.status(200).json({ book })
  } catch (e) {
    return res.status(400).json({ e })
  }
}

// Search book by Outher
export const getLibreryBookByAuthor = (req, res) => {
  BookModel.find({ $and: [{ bookAuthor: req.body.name }, { liborSellerId: req.params.libadminId }] }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by Author'
      })
    }
    return res.status(200).json(books)
  })
}

// Search book by Publisher
export const getLibreryBookByPublisher = (req, res) => {
  BookModel.find({ $and: [{ bookPublisher: req.body.name }, { liborSellerId: req.params.libadminId }] }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by name'
      })
    }
    return res.status(200).json(books)
  })
}

// Search book by Price
export const getLibreryBookByPrice = (req, res) => {
  console.log(req.body)
  BookModel.find({
    $and: [{
      bookPrice: {
        $gte: req.body.minprice,
        $lte: req.body.maxprice
      }
    }, { liborSellerId: req.params.libadminId }]
  }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by name'
      })
    }
    return res.status(200).json(books)
  })
}

// Update Book
export const updateBook = async (req, res) => {
  const book = JSON.parse(JSON.stringify(req.body))

  const bookId = req.params.bookid

  // Find Category from Category
  const categoryId = await bookCategoryModel.findOne(
    { name: book.bookCategory },
    { _id: 1 }
  )
  book.bookCategory = categoryId._id

  try {
    const bookupdated = await BookModel.findByIdAndUpdate({ _id: bookId }, { $set: book }, {
      new: true,
      useFindAndModify: false
    })
    return res.json({ bookupdated })
  } catch (e) {
    // console.log(e)
    return res.json({ e })
  }
}

// Delete Book
export const deleteBook = async (req, res) => {
  // const result = bookCategoryModel.findOne({ _id: req.params.bookid })

  try {
    // console.log(req.params.bookid)

    await BookModel.deleteOne({ _id: req.params.bookid })
    res.json({
      message: 'book is successfull delelted'
    })
  } catch (e) {
    return res.json({
      e
    })
  }
}

// Get all book
export const getAllBooks = (req, res) => {
  BookModel.find().exec((err, book) => {
    if (err) {
      return res.status(400).json({
        err: 'There is no category'
      })
    }
    return res.json({
      book
    })
  })
}
// Search book by Name
export const getBookByName = (req, res) => {
  console.log(req.body.name)
  BookModel.find({ bookName: req.body.name }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by name'
      })
    }
    return res.status(200).json(books)
  })
}

// Search book by Category
export const getBookByCategory = async (req, res) => {
  const bookName = req.body.category
  console.log(bookName)
  // Find Category from Category
  const categoryId = await bookCategoryModel.findOne(
    { name: bookName },
    { _id: 1 }
  )
  console.log(categoryId._id)

  const category = categoryId._id

  try {
    const book = await BookModel.find({ bookCategory: category })
    return res.status(200).json({ book })
  } catch (e) {
    return res.status(400).json({ e })
  }
}

// Search book by Outher
export const getBookByAuthor = (req, res) => {
  BookModel.find({ bookAuthor: req.body.name }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by Author'
      })
    }
    return res.status(200).json(books)
  })
}

// Search book by Publisher
export const getBookByPublisher = (req, res) => {
  BookModel.find({ bookPublisher: req.body.name }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by name'
      })
    }
    return res.status(200).json(books)
  })
}

// Search book by Price
export const getBookByPrice = (req, res) => {
  console.log(req.body)
  BookModel.find({
    bookPrice: {
      $gte: req.body.minprice,
      $lte: req.body.maxprice
    }
  }).exec((error, books) => {
    if (error) {
      return res.status.json({
        error: 'can\'t find book by name'
      })
    }
    return res.status(200).json(books)
  })
}

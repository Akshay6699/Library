import { BookSell, BookSellRequest } from '../../model/index.js'
// import { bookSell } from '../book_sell/index.js'

export const getSellRequestById = (req, res, next, id) => {
  BookSellRequest.findById(id).exec((error, bookreq) => {
    if (error) {
      return res.status.json({
        error: 'cant find update'
      })
    }
    req.bookRequest = bookreq
    next()
  })
}

export const booSellRequest = async (req, res) => {
  const acceptorReject = req.body.acceptorReject
  await BookSellRequest.findByIdAndUpdate({ _id: req.bookRequest._id }, { $set: { AcceptorReject: acceptorReject } })
  const checker = await BookSellRequest.findById({ _id: req.bookRequest._id })
  await BookSell.findByIdAndUpdate({ _id: checker.sellId }, { $set: { sellRequest: acceptorReject } })

  // console.log(checker)
  // console.log(checker.AcceptorReject)

  return res.status(200).json({ checker })
}

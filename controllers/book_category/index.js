import { bookCategoryModel } from '../../model/index.js'

export const getCatagoryById = (req, res, next, id) => {
  bookCategoryModel.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        err: 'can\'t find category'
      })
    }

    req.cate = category
    next()
  })
}

export const createCategory = (req, res) => {
  const category = new bookCategoryModel(req.body)
  console.log(req.body)

  try {
    category.save()
      .then(category => {
        return res.json({
          category
        })
      })
  } catch (e) {
    return res.status(400).json({ e })
  }
}

export const getCategory = (req, res, id) => {
  // console.log(req.cate)
  return res.status(200).json(req.cate)
}

export const getAllCategory = (req, res) => {
  bookCategoryModel.find().exec((err, category) => {
    if (err) {
      return res.status(400).json({
        err: 'There is no category'
      })
    }
    return res.json({
      category
    })
  })
}

export const updateCategory = (req, res) => {
  const category = req.cate
  category.name = req.body.name

  category.save((err, updateCategory) => {
    if (err) {
      return res.status(400).json({
        err: 'Failed to update category'
      })
    }
    res.json(updateCategory)
  })
}

export const deleteCategory = async (req, res) => {
  // const result = bookCategoryModel.findOne({ _id: req.params.categoryid })

  try {
    console.log(req.params.categoryid)

    await bookCategoryModel.deleteOne({ _id: req.params.categoryid })
    res.json({
      message: 'category is successfull delelted'
    })
  } catch (e) {
    return res.json({
      e
    })
  }
}

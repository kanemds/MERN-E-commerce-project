require('express-async-errors')
const Book = require('../models/Book')
const storage = require('../middleware/firebase')
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage')
const Product = require('../models/Product')
// const toBuffer = require('base64-arraybuffer')

const getALlBooks = async (req, res) => {
  const allBooks = await Book.find().lean()
  if (!allBooks?.length) {
    return res.status(400).json({ message: 'No Books Found' })
  }
  res.json(allBooks)
}

const createImage = async (req, res) => {

  // const { base64 } = await req.body
  // console.log(base64)
  // const buffer = toBuffer.decode(base64)
  // console.log(buffer)

  const { title, description, author, category, inStocks, price } = req.body


  const image = await req.files.file

  if (!title || !description || !author || !image || !category || !inStocks || !price) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const duplicate = await Book.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Book Title already exist, please try again' })
  }

  const fileName = new Date().getTime() + image.name

  const imageRef = ref(storage, `books/${fileName}`)

  const uploadImage = await uploadBytes(imageRef, image.data)
  const getImage = await getDownloadURL(uploadImage.ref)

  const newImage = { image: getImage, title, description, author, category, instocks: inStocks, price }

  const saveImage = await Book.create(newImage)
  if (saveImage) {
    res.status(201).json({ message: 'prodcut  created' })
  } else {
    res.status(400).json({ message: 'Invalid product data received' })
  }
}

const updateBook = async (req, res) => {
  const { id, title, description, author, category, inStocks, price } = req.body

  const image = await req.files?.file

  if (!id || !title || !description || !author || !category || !inStocks || !price) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const currentBook = await Book.findById(id).exec()

  if (!currentBook) {
    return res.status(400).json({ message: 'Book Not Found' })
  }

  const duplicate = await Book.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Book already exist, please try another one' })
  }

  currentBook.title = title
  currentBook.description = description
  currentBook.author = author
  currentBook.instocks = inStocks
  currentBook.category = category
  currentBook.price = price

  if (image) {
    try {
      const fileName = new Date().getTime() + image.name

      const imageRef = ref(storage, `books/${fileName}`)

      const uploadImage = await uploadBytes(imageRef, image.data)
      const getImage = await getDownloadURL(uploadImage.ref)

      const desertRef = ref(storage, currentBook.image)
      const deleteImageFirebase = await deleteObject(desertRef)

      currentBook.image = getImage
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: 'Upload Failed Please try again' })
    }
  }


  const update = await currentBook.save()

  res.json({ message: `Book ${update.title} updated` })

}

const updateStocks = async (req, res) => {


  const { product, cart, inventoryIds, createdAt } = req.body

  // new cart object as id:{quantity}
  console.log('product', product)

  const cartProduct = await Product.findById(cart).lean().exec()

  console.log('cart', cartProduct)


  let selectedItems = {}
  product.details.forEach(item => selectedItems[item.bookId] = { quantity: item.quantity })


  // let cartItems = {}
  // cartProduct.forEach(item => selectedItems[item.bookId] = { quantity: item.quantity })

  // find cart items obj products from mongodb, make sure put in .lean() return as regular object not mongoDB object
  const books = await Book.find({ _id: { $in: inventoryIds } }).lean().exec()


  books.forEach(async item => {
    let product
    product = await Book.findById(item._id).exec()
    product.instocks = item.instocks - selectedItems[item._id.toString()].quantity
    console.log('subtract', product.instocks)
    await product.save()
  })
  res.status(201).json({ message: 'Cart item(s) will be reserved for the next 30 mins' })

  const backToStock = () => {
    books.forEach(async item => {
      let product
      product = await Book.findById(item._id).exec()
      // resplace back the origin quantity from books
      product.instocks = item.instocks
      console.log('expired', product.instocks)
      await product.save()
    })
  }

  setTimeout(() => backToStock(), 30 * 60 * 1000)

}

const deleteBook = async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Book ID required ' })
  }

  const currentBook = await Book.findById(id).exec()

  if (!currentBook) {
    return res.status(400).json({ message: 'Book Not Found' })
  }

  const desertRef = ref(storage, currentBook.image)
  const deleteImageFirebase = await deleteObject(desertRef)

  const result = await Book.deleteOne()

  const reply = `Book: ${result.title} with ID ${result._id} deleted`

  res.json(reply)
}

module.exports = { getALlBooks, createImage, updateBook, updateStocks, deleteBook }
require('express-async-errors')
const Book = require('../models/Book')
const storage = require('../middleware/firebase')
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage')
const toBuffer = require('base64-arraybuffer')

const createImage = async (req, res) => {

  // const { base64 } = await req.body
  // console.log(base64)
  // const buffer = toBuffer.decode(base64)
  // console.log(buffer)

  const { title, description, author } = req.body

  const image = await req.files.file


  const fileName = new Date().getTime() + image.name

  const imageRef = ref(storage, `books/${fileName}`)

  const uploadImage = await uploadBytes(imageRef, image.data)
  const getImage = await getDownloadURL(uploadImage.ref)

  const newImage = { image: getImage }

  const saveImage = await Book.create(newImage)
  if (saveImage) {
    res.status(201).json({ message: 'prodcut  created' })
  } else {
    res.status(400).json({ message: 'Invalid product data received' })
  }
}

module.exports = { createImage }
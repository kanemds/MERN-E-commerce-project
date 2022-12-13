require('express-async-errors')
const Book = require('../models/Book')
const storage = require('../middleware/firebase')
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage')


const createImage = async (req, res) => {
  const image = await req.body
  console.log(image)
  const fileName = new Date().getTime() + image.name

  const imageRef = ref(storage, `books/${fileName}`)

  const uploadImage = await uploadBytes(imageRef, image.data)
  const getImage = await getDownloadURL(uploadImage.ref)

  const newImage = new File({
    image: getImage
  })

  const saveImage = await newImage.save()
  res.status(200).json('New Image Added')
}

module.exports = { createImage }
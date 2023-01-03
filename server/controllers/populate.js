const mongoose = require('mongoose')

// Connecting to database
mongoose.connect('mongodb://localhost:27017/GFG',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

// Creating Schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: String
})

const postSchema = new mongoose.Schema({
  title: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

// Creating models from userSchema and postSchema
const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)

// Query to find and show all the posts
Post.find()
  .then(p => console.log(p))
  .catch(error => console.log(error))



// the postedBy info will become an object instead of _id
Post.find()
  .populate("postedBy")
  .then(p => console.log(p))
  .catch(error => console.log(error))
const { model, Schema } = require('mongoose')

const Post = new Schema({
  text: String,
  title: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

module.exports = model('Post', Post)

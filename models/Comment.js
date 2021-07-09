const { model, Schema } = require('mongoose')

const Comment = new Schema({
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  Post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
})

module.exports = model('Comment', Comment)

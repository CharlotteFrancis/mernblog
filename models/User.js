const { model, Schema } = require('mongoose')

const User = new Schema({
  email: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)

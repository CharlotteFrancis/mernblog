const router = require('express').Router()
const { Comment, Post, User } = require('../models')
const passport = require('passport')

// GET ALL comments
router.get('/comments', passport.authenticate('jwt'), (req, res) => Comment.find()
  .populate('user')
  .populate('post')
  .then(comments => res.json(comments))
  .catch(err => console.log(err)))

// GET Post comments
router.get('/comments/:postid', passport.authenticate('jwt'), (req, res) => {
  Comment.find({
    post: req.params.postid
  })
    .populate('user')
    .popualte('post')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

// POST one comment
router.post('/comments', passport.authenticate('jwt'), (req, res) => Comment.create({
  text: req.body.text,
  user: req.user._id,
  post: req.body.post
})
  .then(comment => {
    User.findByIdAndUpdate(comment.user, { $push: { comments: comment._id } })
      .then(() => {
        Post.findByIdAndUpdate(comment.post, { $push: { comments: comment._id } })
          .then(() => res.json(Comment))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err)))

// PUT one comment
router.put('/comments/:id', passport.authenticate('jwt'), (req, res) => Comment.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one comment
router.put('/comments/:id', passport.authenticate('jwt'), (req, res) => Comment.findByIdAndDelete(req.params.id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

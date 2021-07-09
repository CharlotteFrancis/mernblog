const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

// GET ALL posts
router.get('/posts', passport.authenticate('jwt'), (req, res) => Post.find()
  .populate('user')
  .populate('comments')
  .then(posts => res.json(posts))
  .catch(err => console.log(err)))

// GET User posts
router.get('/posts/my', passport.authenticate('jwt'), (req, res) => {
  Post.find({
    user: req.user._id
  })
    .populate('user')
    .popualte('comments')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

// POST one post
router.post('/posts', passport.authenticate('jwt'), (req, res) => Post.create({
  title: req.body.title,
  text: req.body.text,
  user: req.user._id,
  comments: []
})
  .then(post => User.findByIdAndUpdate(post.user, { $push: { posts: post._id } })
    .then(() => res.json(post))
    .catch(err => console.log(err)))
  .catch(err => console.log(err)))

// PUT one post
router.put('/posts/:id', passport.authenticate('jwt'), (req, res) => Post.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one post
router.put('/posts/:id', passport.authenticate('jwt'), (req, res) => Post.findByIdAndDelete(req.params.id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

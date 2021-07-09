const router = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.post('/users/register', (req, res) => {
  const { email, username } = req.body
  User.register(new User({ email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

// GET all users
router.get('/users', passport.authenticate('jwt'), (req, res) => User.find()
  .populate('posts')
  .populate('comments')
  .then(owner => res.json(owner))
  .catch(err => console.log(err)))

// GET one user
router.get('/user', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// PUT one user
router.put('/users', passport.authenticate('jwt'), (req, res) => User.findByIdAndUpdate(req.user._id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one user
router.put('/users', passport.authenticate('jwt'), (req, res) => User.findByIdAndDelete(req.user._id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

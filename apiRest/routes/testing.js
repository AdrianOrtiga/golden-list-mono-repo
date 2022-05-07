const express = require('express')
const router = express.Router()
const Note = require('../model/notes')
const User = require('../model/users')

router.get('/', async (req, res, next) => {
  try {
    await User.deleteMany({})
    await Note.deleteMany({})
    return res.status(200).json({})
  } catch (error) {
    next(error)
  }
})

module.exports = router

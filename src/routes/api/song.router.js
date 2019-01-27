'use strict'

const express = require('express')
const router = express.Router()
const songController = require('../../controllers/song.controller')
const auth = require('../../middlewares/authorization')

router.post('/', auth(['user']), songController.create)

module.exports = router

'use strict'

const express = require('express')
const router = express.Router()
const groupController = require('../../controllers/group.controller')
const auth = require('../../middlewares/authorization')

router.get('/', auth(['user']), groupController.index)
router.post('/', auth(['user']), groupController.create)
// router.post('/add-user', auth(['user']), groupController.addUser)

module.exports = router

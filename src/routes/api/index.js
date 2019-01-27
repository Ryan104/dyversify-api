'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const groupRouter = require('./group.router')
const songRouter = require('./song.router')

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter)

router.use('/group', groupRouter)

router.use('/song', songRouter)

module.exports = router

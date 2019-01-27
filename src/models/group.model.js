'use strict'
const mongoose = require('mongoose')
const groupSchema = require('./schemas/group.schema')

module.exports = mongoose.model('Group', groupSchema)

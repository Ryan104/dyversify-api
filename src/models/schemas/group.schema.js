'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('./user.schema')

const groupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: false
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

groupSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'title', 'isPrivate', 'createdAt', 'users']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  }
})

module.exports = groupSchema

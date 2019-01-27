'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  // comments: { type: Schema.Types.ObjectId, ref: 'Comment' }
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  group: { type: Schema.Types.ObjectId, ref: 'Group' }
}, {
  timestamps: true
})

songSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'url', 'upvotes', 'downvotes', 'description', 'user', 'group']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  }
})

module.exports = mongoose.model('Song', songSchema)

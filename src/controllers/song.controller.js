'use strict'

const Song = require('../models/song.model')
const User = require('../models/user.model')
const Group = require('../models/group.model')
const httpStatus = require('http-status')

/**
 * Create a song and link it to its group/user
 */
exports.create = async (req, res, next) => {
  try {
    // add current user
    req.body.user = req.user._id

    const song = new Song(req.body)
    const savedSong = await song.save()

    const user = await User.findById(req.user._id)
    user.songs.push(savedSong)
    await user.save()

    const group = await Group.findById(req.body.group)
    group.songs.push(savedSong)
    await group.save()

    res.status(httpStatus.CREATED)
    res.send(savedSong.transform())
  } catch (error) {
    next(error)
  }
}

'use strict'

const Group = require('../models/group.model')
const User = require('../models/user.model')
const httpStatus = require('http-status')

/**
 * Create a group and add the current user as a member
 */
exports.create = async (req, res, next) => {
  try {
    req.body.users = [req.user._id]
    const group = new Group(req.body)
    const savedGoup = await group.save()

    // add group to user
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { groups: savedGoup._id } }
    ).exec()

    res.status(httpStatus.CREATED)
    res.send(savedGoup.transform())
  } catch (error) {
    next(error)
  }
}

/**
 * Get all groups
 */
exports.index = async (req, res, next) => {
  // TODO: Filter by current user (once relationship is established)
  try {
    const groups = await Group.find({ users: req.user._id })
      .populate('users')
      .populate('songs')
      .exec()
    res.status(httpStatus.OK)
    res.send(groups.map(group => group.transform()))
  } catch (error) {
    next(error)
  }
}
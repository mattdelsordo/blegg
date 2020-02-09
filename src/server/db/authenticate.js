// @flow

/**
 * This module handles database connections that deal with user authentication/creation/etc
 */

import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { USER_TAG } from './model'
import { __user__ } from '../../shared/default'
import { SECRET } from '../../shared/config'

const User = mongoose.model(USER_TAG)

const userVerifiedResponse = (res, user) => res.json({
  ok: true,
  token: jwt.sign({
    email: user.email,
    name: user.name,
    _id: user._id,
  }, SECRET), // the SECRET
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    title: user.title || __user__.title,
    bio: user.bio || __user__.bio,
    propic: user.propic || __user__.propic,
    posts: user.posts || __user__.posts,
  },
})

// adds new user to database
export const register = (req, res) => {
  const newUser = new User(req.body)
  // hash the user's password to store in the database
  newUser.hash_password = bcrypt.hashSync(req.body.hash_password, 10)
  newUser.save((err, user) => {
    // if there's an error, abort
    if (err) {
      return res.status(400).send({ message: err })
    }

    return userVerifiedResponse(res, user)
  })
}

export const signIn = (req, res) => {
  // console.log(`Attempting to authenticate ${req.body.username}/${req.body.password}`)
  User.findOne({
    name: req.body.username,
  }, (err, user) => {
    if (err) throw err
    if (!user) return res.status(401).json({ message: 'Authentication failed: user not found.' })
    // console.log(`Found user ${JSON.stringify(user)}`)
    // user exists
    if (!(user.comparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Authentication failed: wrong password.' })
    }
    // console.log(`Authenticated user ${JSON.stringify(user)}`)
    return userVerifiedResponse(res, user)
  })
}

export const verifyToken = (req, res) => {
  const details = jwt.verify(req.body.token, SECRET)
  User.findOne({
    _id: details._id,
  }, (err, user) => {
    if (err) throw err
    if (!user) return res.status(401).json({ message: 'Authentication failed: user not found.' })

    // user exists
    // console.log(`Able to verify ${user}`)
    return userVerifiedResponse(res, user)
  })
}
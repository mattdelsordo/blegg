// @flow

import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import { POST_TAG, USER_TAG } from '../db/model'
import { __post__ } from '../../shared/default'
import { SECRET } from '../../shared/config'

const User = mongoose.model(USER_TAG)

const MAIN_BLOG_USER = '5ac20c1d08a50b6510337cbe'

export const getBlogInfo = (req, res) => {
  // console.log('Searching for user info...')
  User.findById(MAIN_BLOG_USER, (err, user) => {
    if (err) throw err
    if (!user) return res.status(400).json({ message: 'Blog data not found.' })

    // console.log(`Found user ${JSON.stringify(user)}`)
    return res.json({
      ok: true,
      name: user.name,
      bio: user.bio,
      propic: user.propic,
      title: user.title,
    })
  })
}

// TODO: all of these, because its not strictly necessary functionality
// update profile picture

// update bio

// update title

// update username

// update password

// update email
// @flow
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

export const USER_TAG = 'user'
export const POST_TAG = 'post'

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  propic: {
    type: String,
    required: false,
  },
  posts: {
    type: [{ type: ObjectId, ref: POST_TAG }],
    required: true,
  },
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password)
}

mongoose.model(USER_TAG, UserSchema)

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: Boolean,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  poster: {
    type: ObjectId,
    required: true,
  },
  posterName:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

mongoose.model(POST_TAG, PostSchema)

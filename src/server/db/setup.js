// @flow

import mongoose from 'mongoose'

import { MONGODB_URI } from './config'

export default () => {
  mongoose.Promise = global.Promise

  mongoose.connect(MONGODB_URI)

  mongoose.connection.on('connected', () => console.log('DB connected'))
  mongoose.connection.on('error', err => console.error(err))
  mongoose.connection.on('disconnected', () => console.log('DB disconnected'))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      process.exit()
    })
  })
}

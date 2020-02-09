// @flow

import compression from 'compression'
import express from 'express'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import cors from 'cors'

import routing from './routing/routing'
import { WEB_PORT, STATIC_PATH, FAVICON_PATH } from '../shared/config'
import { isProd } from '../shared/util'
import setUpMongo from './db/setup'

const app = express()

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))
app.use('/', express.static('public'))

setUpMongo()

app.use(bodyParser.json())
app.use(fileUpload())
app.use(cors())

export default routing(app)

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})

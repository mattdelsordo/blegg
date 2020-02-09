// @flow

export const WEB_PORT = process.env.PORT || 5000
export const STATIC_PATH = '/static'
export const APP_NAME = 'Blegg'

export const FAVICON_PATH = `http://localhost:${WEB_PORT}${STATIC_PATH}/image/favicon.ico`

const postImageFolder = (fileName) => `/image/post/${fileName}.jpg`
export const saveImageURL = (fileName) => `${__dirname}/../../public${postImageFolder(fileName)}`
export const getImageURL = (fileName) => `http://localhost:${WEB_PORT}${STATIC_PATH}${postImageFolder(fileName)}`


export const WDS_PORT = 7000

export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`

// TODO: this should probably be passed in as an environment variable for safety
export const SECRET = process.env.SECRET || 'seeeeecret'

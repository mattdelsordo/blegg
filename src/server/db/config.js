/**
 * TODO: this config should be passed in through an environment variable for security but here we are
 */

export const MONGODB_USER = process.env.MONGOUSER || 'admin'
export const MONGODB_PASSWORD = process.env.MONGOPASS || 'password'
export const MONGODB_URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@ds121289.mlab.com:21289/blegg_database`

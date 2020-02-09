// @flow

// page routes
export const HOME_PAGE_ROUTE = '/'
export const blogPageRoute = (pageNum: ?number) => `/page/${pageNum || ':pageNum'}`
export const LOGIN_PAGE_ROUTE = '/login'
export const SIGN_UP_PAGE_ROUTE = '/sign-up'
export const SETTINGS_PAGE_ROUTE = '/settings'
export const NEW_POST_PAGE_ROUTE = '/new'
export const postPageRoute = (postId: ?string) => `/post/${postId || ':postId'}`

// post routes
export const CREATE_POST_ROUTE = '/post/new'
export const editPostRoute = (postId: ?string) => `/edit/${postId || ':postId'}`
export const deletePostRoute = postPageRoute
export const POST_DATA_ROUTE = '/post/data'
export const UPLOAD_ROUTE = '/upload'

// user routes
export const userRoute = (userId: ?string) => `/user/${userId || ':userId'}`
export const userPicRoute = (userId: ?string) => `${userRoute(userId)}/pic`
export const userBioRoute = (userId: ?string) => `${userRoute(userId)}/bio`
export const userTitleRoute = (userId: ?string) => `${userRoute(userId)}/title`
export const userNameRoute = (userId: ?string) => `${userRoute(userId)}/name`
export const userPassRoute = (userId: ?string) => `${userRoute(userId)}/pass`
export const userEmailRoute = (userId: ?string) => `${userRoute(userId)}/email`

// authentication routes
export const AUTH_ROUTE = '/auth'
export const VERIFY_TOKEN_ROUTE = `${AUTH_ROUTE}/verify`
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`
export const CREATE_ACCT_ROUTE = `${AUTH_ROUTE}/create`

// misc routes from the tutorial I used that I'm not using but serve as good examples
export const HELLO_PAGE_ROUTE = '/hello'
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'
export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`

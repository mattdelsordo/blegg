// @flow

/**
 * This file defines defaults for various objects intended to be used throughout the project.
 * It could also be used as schemas? Who knows how that works.
 */

import { STATIC_PATH, WEB_PORT } from './config'

export const __egg__ = `http://localhost:${WEB_PORT}${STATIC_PATH}/image/egg.png`

export const __user__ = {
  uuid: 77777777,
  name: 'admin',
  email: 'no@user.found',
  password: 'password',
  title: 'DEFAULT BLOG TITLE',
  bio: 'This user has not set a bio.',
  propic: __egg__,
  posts: [],
}

export const __post__ = {
  title: 'DEFAULT POST TITLE',
  image: __egg__,
  content: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ullamcorper tortor, at efficitur velit gravida lacinia. Nullam vel vestibulum quam. Vestibulum maximus nulla quis velit placerat, in vehicula turpis sollicitudin. Sed pharetra metus ut viverra dapibus. Ut non est ut justo aliquet ultricies in eu tellus. Donec pulvinar sollicitudin odio. Ut sollicitudin vitae nibh vitae vehicula. Aliquam velit purus, ullamcorper a arcu non, rutrum facilisis sem. Donec vitae augue tellus.\n' +
  '\n' +
  'Morbi sed porttitor mi, vel auctor metus. Cras porttitor, odio eget sagittis luctus, est nunc dapibus nisi, nec fermentum nibh nisl nec odio. Sed justo quam, maximus id odio id, porta tincidunt turpis. Cras eget pretium velit. Mauris vel viverra ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin sem nec ornare cursus. Nam lectus sapien, tincidunt a congue vel, ultricies vitae turpis. Quisque nec malesuada nulla, quis finibus quam. Praesent eu sapien scelerisque, tristique diam in, venenatis risus. Vivamus suscipit, tellus a efficitur molestie, sem justo consequat ligula, a congue odio sem ac diam.\n' +
  '\n' +
  'Aenean consequat enim in tellus feugiat, quis luctus lacus scelerisque. Donec imperdiet mi sit amet tempor feugiat. Morbi tincidunt, quam id vehicula maximus, nibh elit bibendum ipsum, ac eleifend orci nibh et arcu. Proin ut semper augue. Quisque diam justo, efficitur ac accumsan a, pretium sed magna. Pellentesque non justo venenatis, tincidunt lorem non, aliquet erat. Vivamus bibendum fringilla tellus eu malesuada. Cras sem nisl, scelerisque sit amet tortor et, viverra iaculis urna. Proin ante nulla, eleifend non diam id, vulputate consectetur est. Maecenas maximus ut justo ut volutpat. Etiam finibus leo sapien. Suspendisse eget lorem non sem pharetra consectetur. Ut imperdiet diam odio, sed feugiat nulla feugiat id.',
  poster: 77777777,
}

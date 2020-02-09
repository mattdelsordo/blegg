// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { HOME_PAGE_ROUTE } from '../routes'
import NavLayout from '../layout/nav-page'
import NotFound from '../dumb/not-found'

export default NavLayout(NotFound)

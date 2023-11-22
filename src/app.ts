import express from 'express'
import passport from 'passport'

import { crudCounterMiddleware } from './middlewares/crudCounterMiddleware.js'
import { entitiesMonitorMiddleware } from './middlewares/entitiesMonitoring.js'
import { apiErrorHandler } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import { loginWithGoogle } from './middlewares/loginWithGoogle.js'
import { routeNotFound } from './middlewares/routeNotFound.js'
import authorsRoutes from './routes/authorsRoutes.js'
import bookAuthorRoutes from './routes/bookAuthorRoutes.js'
import booksRoutes from './routes/bookRoutes.js'
import crudStatsRoutes from './routes/crudStatsRoutes.js'
import permissionsRoutes from './routes/permissionsRoutes.js'
import rolesRoutes from './routes/rolesRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(loggingMiddleware)
app.use(entitiesMonitorMiddleware)
app.use(crudCounterMiddleware)

// Google login
/*
Go to the OAuth 2.0 Playground.
On the left side, select the "Google OAuth2 API v2" from the list.
Enter your client ID and secret.
In the "Request" section, select the scope "openid" and click "Authorize APIs."
In the "Exchange authorization code for tokens" section, click "Exchange authorization code for tokens."
The id_token will be part of the response.
*/
app.use(passport.initialize())
passport.use(loginWithGoogle())

// Routes
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/authors', authorsRoutes)
app.use('/api/v1/books', booksRoutes)
app.use('/api/v1/crud-stats', crudStatsRoutes)
app.use('/api/v1/roles', rolesRoutes)
app.use('/api/v1/permissions', permissionsRoutes)
app.use('/api/v1/book-author', bookAuthorRoutes)

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)

export default app

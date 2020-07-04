import express from 'express'
import routes from './routes.js'

// Initialise the express application
const app = express()

// Use route handler middleware
app.use(routes)

// Start the web server
const port = process.env.PORT || 80
app.listen(port, () => console.log(`Listening on ${port}`))

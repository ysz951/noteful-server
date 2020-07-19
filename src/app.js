require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const foldernoteRouter = require('./folder-note/folder-note-router')
const errorHandler = require('./errorHandler')
const validateBearerToken = require('./validateBearerToken')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(errorHandler)
app.use(validateBearerToken)
app.get('/', (req, res) => {
    res.send('Hello, world!')
})

// app.use(notesRouter)
// app.use(foldersRouter)
app.use(foldernoteRouter)
module.exports = app
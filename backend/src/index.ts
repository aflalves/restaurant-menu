import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { categoryRouter } from './api/category'
import { itemRouter } from './api/item'
import { MONGODB_URI, PORT } from './config/database'
import Category from './models/category'

mongoose.set('useCreateIndex', true) // stops annoying warning
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

mongoose.connection.once('open', () => {
  console.log('CONECTADO NO BANC oO')

  const app = express()

  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.options('*', cors())
  app.use(cors())

  app.use('/categories', categoryRouter)
  app.use('/items', itemRouter)

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})

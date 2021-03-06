import { config as configEnv } from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router'
import * as serverlessExpress from 'aws-serverless-express'

configEnv()

export const app = express()

const port = process.env.NODE_ENV === 'development' ? 4000 : process.env.API_PORT

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// routes here
app.use(router)

// error handling middleware here
app.use((error, req, res, next) => {
  res.status(400).json({ error: 'Could not decode request: JSON parsing failed' })
})

// start the Express server (local)
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API started at http://localhost:${port}`)
  })
}

// Lambda stuff
const server = serverlessExpress.createServer(app)
export const handler = (event, context) => {
  serverlessExpress.proxy(server, event, context)
}

/* eslint-disable import/first */
import { config } from 'dotenv'
config({
  debug: true,
  override: true
  // path: path.join(__dirname, env + '.env')
})
import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import logger from './logger'
import os from 'os'
import { errorApiMiddleware } from './middleware/error'
import router from './routes'
import ApiError from './apiError'
import path from 'path'

const app = express()
const PORT = process.env.PORT

const staticPath = path.resolve(__dirname, '..', 'static')
const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
const corsSetting = function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  return next()
}

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(corsSetting)
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({}))
app.use(express.static(staticPath))
app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Hello World this GET , host: ' + os.hostname(),
    success: true
  })
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(
    ApiError.badRequest(
      `Request ${req.method} URL ${req.hostname}:${PORT}${req.originalUrl} not found!`,
      'app'
    )
  )
})

app.use(errorApiMiddleware)

app.listen(PORT, () => {
  logger.info(
    'Server started at PORT ' + PORT + ' , host: ' + os.hostname()
  )
})

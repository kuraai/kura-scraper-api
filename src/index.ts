import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import tiktokRouter from './routes/tiktok'
import instagramRouter from './routes/instagram'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/tiktok', tiktokRouter)
app.use('/instagram', instagramRouter)

// Health check route
app.get('/status', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 kura-scraper-api running on port ${PORT}`)
})
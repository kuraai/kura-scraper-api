import { Router, Request, Response } from 'express'
import scrapeInstagramProfile from '../services/instagramScraper'
import { analyzeContent } from '../services/openaiService'

const router = Router()

router.post('/scrape', async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body

  if (!username) {
    res.status(400).json({ error: 'Username is required' })
    return
  }

  try {
    const profileData = await scrapeInstagramProfile(username)

    const prompt = `
Instagram Profile:
Bio: ${profileData.bio}
Captions: ${profileData.captions.join('\n')}
Hashtags: ${profileData.hashtags.join(', ')}
Followers: ${profileData.followers}
Following: ${profileData.following}
Posts: ${profileData.posts}
    `

    const analysis = await analyzeContent(prompt)
    res.json({ profileData, analysis })
  } catch (error) {
    console.error('[Instagram Scrape Error]', error)
    res.status(500).json({ error: 'Error scraping Instagram profile' })
  }
})

export default router

import { Router } from 'express';
import { scrapeTikTokProfile } from '../services/tiktokScraper';
import { analyzeContent } from '../services/openaiService';

const router = Router();

router.post('/scrape', async (req, res) => {
  const { username } = req.body;
  try {
    const profileData = await scrapeTikTokProfile(username);
    const analysis = await analyzeContent(profileData);
    res.json({ profileData, analysis });
  } catch (error) {
    res.status(500).json({ error: 'Error scraping TikTok profile' });
  }
});

export default router;
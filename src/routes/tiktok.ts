import { Router } from 'express';
import scrapeTikTokProfile from '../services/tiktokScraper' // ✅ CORRECT
import { analyzeContent } from '../services/openaiService';

const router = Router();

router.post('/scrape', async (req, res) => {
  const { username } = req.body;
  try {
    const profileData = await scrapeTikTokProfile(username);
const prompt = `
TikTok Profile:
Username: ${profileData.username}
Bio: ${profileData.bio}
Followers: ${profileData.followers}
Following: ${profileData.following}
Total Posts: ${profileData.posts}

Recent Captions:
${profileData.captions.join('\n')}

Top Hashtags:
${profileData.hashtags.join(', ')}

Video Metrics:
${profileData.metrics.map(m =>
  `• "${m.caption}" — ${m.likes} likes, ${m.comments} comments, ${m.shares} shares, ${m.views} views`
).join('\n')}
`

const analysis = await analyzeContent(prompt);
    res.json({ profileData, analysis });
  } catch (error) {
    res.status(500).json({ error: 'Error scraping TikTok profile' });
  }
});

export default router;
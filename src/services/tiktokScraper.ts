import TikTokScraper from 'tiktok-scraper'

const scrapeTikTokProfile = async (username: string) => {
  try {
    const profile = await TikTokScraper.getUserProfileInfo(username)
    console.log('[TikTok Profile]', profile)

    const bio = profile?.user?.signature || ''
    const followers = profile?.stats?.followerCount || 0
    const following = profile?.stats?.followingCount || 0

    const postsData = await TikTokScraper.user(username, { number: 5 })
    const collector = postsData?.collector || []

    const captions = collector.map((post: any) => post.text)
    const hashtags = [
      ...new Set(
        captions.flatMap((c: any) =>
          (c.match(/#[a-z0-9_]+/gi) || []).map((h: any) => h.toLowerCase())
        )
      ),
    ]

    const metrics = collector.map((post: any) => ({
      caption: post.text,
      likes: post.diggCount,
      comments: post.commentCount,
      shares: post.shareCount,
      views: post.playCount,
    }))

    return {
      username,
      bio,
      followers,
      following,
      posts: collector.length,
      captions,
      hashtags,
      metrics,
    }
  } catch (error: any) {
    console.error('[TikTok Scraper Error]', error.message || error)
    throw new Error('Failed to scrape TikTok profile.')
  }
}

export default scrapeTikTokProfile

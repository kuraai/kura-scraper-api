import TikTokScraper from 'tiktok-scraper'

const scrapeTikTokProfile = async (username: string) => {
  const user = await TikTokScraper.getUserProfileInfo(username)
  console.log('[TikTok Raw Result]', user)

  // Safely access nested properties (fallbacks in case of missing fields)
  const bio = user?.user?.signature || ''
  const followers = user?.stats?.followerCount || 0
  const following = user?.stats?.followingCount || 0
  const posts = user?.stats?.videoCount || 0

  return {
    username,
    bio,
    followers,
    following,
    posts,
    captions: [],
    hashtags: [],
  }
}
export default scrapeTikTokProfile
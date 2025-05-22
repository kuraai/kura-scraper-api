import TikTokScraper from 'tiktok-scraper'

const scrapeTikTokProfile = async (username: string) => {
  const user = await TikTokScraper.getUserProfileInfo(username)
  const { stats, userInfo } = user

  return {
    username,
    bio: userInfo.signature,
    followers: stats.followerCount,
    following: stats.followingCount,
    posts: stats.videoCount,
    captions: [], // You'd need to get videos separately
    hashtags: [], // Extract from captions or videos
  }
}
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

const scrapeInstagramProfile = async (username: string) => {
  try {
    const { stdout } = await execPromise(`npx instagram-scraper ${username} --media-metadata --media-types none`)
    
    // Parse stdout to extract relevant data
    // NOTE: This is just an example; real parsing depends on the CLI output
    const bioMatch = stdout.match(/Biography: (.*)/)
    const bio = bioMatch ? bioMatch[1] : 'No bio found'

    return {
      username,
      bio,
      captions: ['Placeholder for post captions (requires post scraping)'],
      hashtags: ['#placeholder'],
      followers: 0, // requires parsing output or GraphQL scraping
      following: 0,
      posts: 0,
    }
  } catch (err) {
    console.error('[Instagram Scraper Error]', err)
    throw new Error('Failed to scrape Instagram profile.')
  }
}

export default scrapeInstagramProfile
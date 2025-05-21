import axios from 'axios';

export const scrapeTikTokProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://www.tiktok.com/@${username}`);
    // Parse the response to extract necessary data
    return response.data;
  } catch (error) {
    console.error('TikTok scraping error:', error);
    throw error;
  }
};
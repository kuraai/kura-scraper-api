import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const openaiApiKey = process.env.OPENAI_API_KEY

export const analyzeContent = async (text: string) => {
  if (!openaiApiKey) {
    throw new Error('Missing OPENAI_API_KEY')
  }

  const prompt = `
You are a world-class social media strategist. Analyze this creator’s Instagram or TikTok profile and give actionable insights.

Content:
${text}

Respond with insights about:
- Their tone and niche
- Growth potential
- Brand alignment
- Types of content they should make
Be concise, insightful, and useful for creators.
`.trim()

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI that provides growth strategies for content creators based on their profile.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 600,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    )

    const result = response.data.choices[0]?.message?.content?.trim()
    console.log('[OpenAI Result]', result)
    return result
  } catch (error: any) {
    console.error('[OpenAI API Error]', error.response?.data || error.message)
    throw new Error('OpenAI analysis failed')
  }
}
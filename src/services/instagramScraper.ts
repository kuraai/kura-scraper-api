const scrapeInstagramProfile = async (username: string) => {
  // Dummy data for placeholder — replace with actual scraping logic
  return {
    username,
    bio: "Example bio for " + username,
    captions: ["Post one caption", "Post two caption", "Post three caption"],
    hashtags: ["#example", "#test"],
    followers: 1234,
    following: 567,
    posts: 3
  }
}

export default scrapeInstagramProfile

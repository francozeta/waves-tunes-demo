const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_SPOTIFY
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET_SPOTIFY

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function searchTracks(query: string) {
  const accessToken = await getAccessToken()
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  return data.tracks.items
}


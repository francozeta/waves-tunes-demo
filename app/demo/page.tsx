"use client"

import { useState } from "react"
import { searchTracks } from "@/utils/spotify"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Track {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    release_date: string
    images: { url: string }[]
  }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Track[]>([])
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      const results = await searchTracks(searchQuery)
      setSearchResults(results)
    }
  }

  const handleSelectTrack = (track: Track) => {
    setSelectedTrack(track)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spotify Track Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a track"
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          {searchResults.map((track) => (
            <Card key={track.id} className="mb-2 cursor-pointer" onClick={() => handleSelectTrack(track)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={track.album.images[0].url || "/placeholder.svg"}
                    alt={track.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{track.name}</h3>
                    <p className="text-sm text-gray-600">{track.artists.map((a) => a.name).join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Selected Track Details</h2>
          {selectedTrack && (
            <Card>
              <CardContent className="p-4">
                <img
                  src={selectedTrack.album.images[0].url || "/placeholder.svg"}
                  alt={selectedTrack.name}
                  className="w-full h-64 object-cover mb-4"
                />
                <div className="grid gap-2">
                  <div>
                    <label className="font-semibold">Track Name:</label>
                    <Input value={selectedTrack.name} readOnly />
                  </div>
                  <div>
                    <label className="font-semibold">Artist:</label>
                    <Input value={selectedTrack.artists.map((a) => a.name).join(", ")} readOnly />
                  </div>
                  <div>
                    <label className="font-semibold">Album:</label>
                    <Input value={selectedTrack.album.name} readOnly />
                  </div>
                  <div>
                    <label className="font-semibold">Release Year:</label>
                    <Input value={new Date(selectedTrack.album.release_date).getFullYear().toString()} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


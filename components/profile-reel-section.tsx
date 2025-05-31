"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import ReelComponent, { type ReelData } from "@/components/reel-component"

interface ProfileReelsSectionProps {
  userId: number | string
}

export default function ProfileReelsSection({ userId }: ProfileReelsSectionProps) {
  const router = useRouter()
  const [activeReelId, setActiveReelId] = useState<number | null>(null)
  const [hoveredReelId, setHoveredReelId] = useState<number | null>(null)
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [pausedVideos, setPausedVideos] = useState<Record<number, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample reels data - in a real app, this would be fetched based on userId
  const reels: ReelData[] = [
    {
      id: 101,
      user: {
        name: "Malvika Wilson",
        image: "/placeholder.svg?height=40&width=40&query=malvika profile",
      },
      videoUrl: "/placeholder.svg?height=400&width=300&query=property tour video 1",
      caption: "Luxury 2BHK Apartment Tour",
      likes: 156,
      comments: 23,
      shares: 12,
      thumbnail: "/placeholder.svg?height=400&width=300&query=property thumbnail 1",
    },
    {
      id: 102,
      user: {
        name: "Malvika Wilson",
        image: "/placeholder.svg?height=40&width=40&query=malvika profile",
      },
      videoUrl: "/placeholder.svg?height=400&width=300&query=property tour video 2",
      caption: "Modern Villa Walkthrough",
      likes: 243,
      comments: 31,
      shares: 18,
      thumbnail: "/placeholder.svg?height=400&width=300&query=property thumbnail 2",
    },
    {
      id: 103,
      user: {
        name: "Malvika Wilson",
        image: "/placeholder.svg?height=40&width=40&query=malvika profile",
      },
      videoUrl: "/placeholder.svg?height=400&width=300&query=property tour video 3",
      caption: "Beach House Property Tour",
      likes: 189,
      comments: 27,
      shares: 15,
      thumbnail: "/placeholder.svg?height=400&width=300&query=property thumbnail 3",
    },
  ]

  const toggleLike = (reelId: number) => {
    setLiked((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }))
  }

  const togglePause = (reelId: number) => {
    setPausedVideos((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }))
  }

  const handleMouseEnter = (reelId: number) => {
    setHoveredReelId(reelId)
    setActiveReelId(reelId)
  }

  const handleMouseLeave = () => {
    setHoveredReelId(null)
    setActiveReelId(null)
  }

  const handleReelClick = (reelId: number) => {
    router.push(`/reels?id=${reelId}`)
  }

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      {reels.map((reel) => (
        <div
          key={reel.id}
          className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
          onMouseEnter={() => handleMouseEnter(reel.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleReelClick(reel.id)}
        >
          <ReelComponent
            reel={reel}
            isActive={activeReelId === reel.id}
            isFullscreen={false}
            muted={true}
            liked={!!liked[reel.id]}
            isPaused={!!pausedVideos[reel.id]}
            onToggleLike={toggleLike}
            onTogglePause={togglePause}
          />

          {hoveredReelId !== reel.id && (
            <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-xs font-medium truncate">{reel.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

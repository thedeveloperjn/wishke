"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Share2, Play } from "lucide-react"

export interface ReelData {
  id: number
  user: {
    name: string
    image: string
  }
  videoUrl: string
  caption: string
  likes: number
  comments: number
  shares: number
  thumbnail?: string
}

interface ReelComponentProps {
  reel: ReelData
  isActive: boolean
  isFullscreen?: boolean
  muted: boolean
  liked: boolean
  isPaused: boolean
  onToggleLike: (reelId: number) => void
  onTogglePause: (reelId: number) => void
  onToggleMute?: () => void
  onVideoRef?: (reelId: number, el: HTMLVideoElement | null) => void
  onReelRef?: (reelId: number, el: HTMLDivElement | null) => void
}

export default function ReelComponent({
  reel,
  isActive,
  isFullscreen = true,
  muted,
  liked,
  isPaused,
  onToggleLike,
  onTogglePause,
  onToggleMute,
  onVideoRef,
  onReelRef,
}: ReelComponentProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    if (videoRef.current) {
      if (isActive && !isPaused) {
        videoRef.current.play().catch((err) => console.error("Error playing video:", err))
      } else {
        videoRef.current.pause()
      }
      videoRef.current.muted = muted
    }
  }, [isActive, isPaused, muted, isClient])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  const handleVideoRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el
    if (onVideoRef) onVideoRef(reel.id, el)

    if (el) {
      el.muted = muted
      el.loop = true
      el.onerror = (e) => {
        console.error("Video error:", e)
      }
    }
  }

  if (!isClient) {
    return (
      <div className="relative w-full h-full bg-gray-200 rounded-[12px] overflow-hidden">
        <Image
          src={reel.thumbnail || "/placeholder.svg"}
          alt="Reel thumbnail"
          fill
          className="object-cover"
        />
      </div>
    )
  }


  return (
    <div
    ref={(el) => onReelRef && onReelRef(reel.id, el)}
    data-reel-id={reel.id}
    className={`relative ${isFullscreen ? "w-full h-[95vh] my-10 mx-auto snap-center" : "w-full h-full"} rounded-[12px] overflow-hidden`}
    suppressHydrationWarning
  >
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <video
          ref={handleVideoRef}
          src={reel.videoUrl}
          poster={reel.thumbnail}
          className="w-full h-full object-cover"
          playsInline
          onClick={() => onTogglePause(reel.id)}
        />

        {/* Play/pause overlay */}
        {isPaused && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-black/30 rounded-full p-4" onClick={() => onTogglePause(reel.id)}>
              <Play className="h-10 w-10 text-white" />
            </button>
          </div>
        )}

        {/* User info and caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center mb-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full mr-2">
              <Image
                src={reel.user.image || "/placeholder.svg?height=40&width=40&query=user"}
                alt={reel.user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mr-4">
              <p className="text-white font-medium">{reel.user.name}</p>
            </div>
            {isFullscreen && (
              <button className="text-white bg-[#ffffff]/10 backdrop-blur-[10px] rounded-md px-3 py-1 text-sm">
                Add Friend
              </button>
            )}
          </div>
          <p className="text-white text-sm">
            {reel.caption}
            {isFullscreen && <button className="text-gray-300 ml-1">See More</button>}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      {isActive && isFullscreen && (
        <div className="absolute right-6 bottom-20 flex flex-col gap-6 items-center">
          <button className="flex flex-col items-center" onClick={() => onToggleLike(reel.id)}>
            <Heart className={`h-7 w-7 ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
            <span className="text-white text-xs mt-1">{formatNumber(reel.likes)}</span>
          </button>
          <button className="flex flex-col items-center">
            <MessageCircle className="h-7 w-7 text-white" />
            <span className="text-white text-xs mt-1">{formatNumber(reel.comments)}</span>
          </button>
          <button className="flex flex-col items-center">
            <Share2 className="h-7 w-7 text-white" />
            <span className="text-white text-xs mt-1">{formatNumber(reel.shares)}</span>
          </button>
        </div>
      )}

      {/* Mini controls for non-fullscreen mode */}
      {!isFullscreen && (
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <button onClick={() => onToggleLike(reel.id)}>
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </button>
          <span className="text-white text-xs">{formatNumber(reel.likes)}</span>
        </div>
      )}
    </div>
  )
}

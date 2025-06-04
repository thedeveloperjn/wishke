"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Heart, MessageCircle, Share2, Volume2, VolumeX, Play } from "lucide-react"

interface ReelData {
  id: number
  user: {
    name: string
    image: string
    id: string
  }
  videoUrl: string
  thumbnailUrl: string
  caption: string
  likes: number
  comments: number
  shares: number
}

export default function DynamicReels({ reels }: { reels: ReelData[] }) {
  const [selectedReel, setSelectedReel] = useState<ReelData | null>(null)
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [muted, setMuted] = useState(false)
  const [pausedVideos, setPausedVideos] = useState<Record<number, boolean>>({})
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
  const reelRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [activeReelId, setActiveReelId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reorder reels when a reel is selected
  const getOrderedReels = () => {
    if (!selectedReel) return reels
    const selectedIndex = reels.findIndex((reel) => reel.id === selectedReel.id)
    if (selectedIndex === -1) return reels
    return [
      reels[selectedIndex],
      ...reels.slice(0, selectedIndex),
      ...reels.slice(selectedIndex + 1),
    ]
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !selectedReel) return

      const container = containerRef.current
      const scrollPosition = container.scrollTop
      const containerHeight = container.clientHeight

      let maxVisibleReel = getOrderedReels()[0].id
      let maxVisibleArea = 0

      Object.entries(reelRefs.current).forEach(([reelIdStr, reelRef]) => {
        if (!reelRef) return

        const reelId = Number.parseInt(reelIdStr)
        const reelTop = reelRef.offsetTop
        const reelHeight = reelRef.clientHeight
        const reelBottom = reelTop + reelHeight

        const visibleTop = Math.max(reelTop, scrollPosition)
        const visibleBottom = Math.min(reelBottom, scrollPosition + containerHeight)
        const visibleArea = Math.max(0, visibleBottom - visibleTop)

        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea
          maxVisibleReel = reelId
        }
      })

      if (maxVisibleReel !== activeReelId) {
        setActiveReelId(maxVisibleReel)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [activeReelId, selectedReel, reels])

  useEffect(() => {
    if (activeReelId === null || !selectedReel) return

    Object.entries(videoRefs.current).forEach(([reelIdStr, video]) => {
      if (!video) return
      const reelId = Number.parseInt(reelIdStr)

      if (reelId === activeReelId && !pausedVideos[reelId]) {
        video.play().catch((err) => console.error("Error playing video:", err))
        video.muted = muted
      } else {
        video.pause()
      }
    })
  }, [activeReelId, pausedVideos, muted, selectedReel])

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([_, video]) => {
      if (video) {
        video.muted = muted
      }
    })
  }, [muted])

  useEffect(() => {
    if (selectedReel) {
      setActiveReelId(selectedReel.id)
    }
  }, [selectedReel])

  const handleVideoRef = (reelId: number, el: HTMLVideoElement | null) => {
    videoRefs.current[reelId] = el
    if (el) {
      el.muted = muted
      el.loop = true
      el.onerror = (e) => console.error("Video error:", e)
    }
  }

  const handleReelRef = (reelId: number, el: HTMLDivElement | null) => {
    reelRefs.current[reelId] = el
  }

  const toggleLike = (reelId: number) => {
    setLiked((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }))
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  const togglePause = (reelId: number) => {
    const video = videoRefs.current[reelId]
    if (!video) return

    setPausedVideos((prev) => {
      const newState = { ...prev, [reelId]: !prev[reelId] }
      if (newState[reelId]) {
        video.pause()
      } else {
        video.play().catch((err) => console.error("Error playing video:", err))
      }
      return newState
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  return (
    <div className="relative min-h-screen">
      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 bg-white rounded-[12px] gap-4 p-4">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative aspect-[4/6] cursor-pointer rounded-lg overflow-hidden"
            onClick={() => setSelectedReel(reel)}
          >
            <Image
              src={reel.thumbnailUrl}
              alt={reel.caption}
              fill
              className="object-cover"
            />
            <div className="absolute flex bottom-0 left-0 gap-3 items-center right-0 pb-3 px-2 bg-gradient-to-t from-black/60 to-transparent">
              <Image
                src={reel.user.image}
                alt={reel.user.name}
                height={30}
                width={30}
                className="h-[35px] w-[35px] rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-white text-md leading-[16px]">{reel.user.name}</p>
                <p className="text-gray-300 text-xs">{reel.user.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected reel */}
      {selectedReel && (
        <div className="fixed inset-0 z-[60] flex justify-center items-center bg-black/90 backdrop-blur-[15px]">
          <div className="flex absolute top-6 left-10 items-center z-[80] gap-2">
            <Image src="/whiskelogo.svg" alt="WISHKE Logo" width={160} height={60} />
          </div>
          <button
            onClick={() => setSelectedReel(null)}
            className="absolute top-6 left-[32%] text-white bg-[#ffffff]/10 p-2 rounded-full border-none"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute top-4 right-4 text-white bg-transparent border-none"
            onClick={toggleMute}
          >
            {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>
          <div
            ref={containerRef}
            className="h-full w-full max-w-[420px] overflow-y-auto snap-y snap-mandatory no-scrollbar"
          >
            {getOrderedReels().map((reel) => (
              <div
                key={reel.id}
                ref={(el) => handleReelRef(reel.id, el)}
                data-reel-id={reel.id}
              >
                <div className="relative w-full h-[95vh] my-10 mx-auto snap-center rounded-[12px] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <video
                      ref={(el) => handleVideoRef(reel.id, el)}
                      src={reel.videoUrl}
                      className="w-full h-full object-cover"
                      playsInline
                      onClick={() => togglePause(reel.id)}
                    />
                    {pausedVideos[reel.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          className="bg-black/30 rounded-full p-4"
                          onClick={() => togglePause(reel.id)}
                        >
                          <Play className="h-10 w-10 text-white" />
                        </button>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center mb-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full mr-2">
                          <Image
                            src={reel.user.image || "/placeholder.svg"}
                            alt={reel.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="mr-4">
                          <p className="text-white font-medium">{reel.user.name}</p>
                        </div>
                        <button className="text-white bg-[#ffffff]/10 backdrop-blur-[10px] rounded-md px-3 py-1 text-sm">
                          Add Friend
                        </button>
                      </div>
                      <p className="text-white text-sm">
                        {reel.caption}
                        <button className="text-gray-300 ml-1">See More</button>
                      </p>
                    </div>
                  </div>
                </div>
                {activeReelId === reel.id && (
                  <div className="absolute right-[33%] bottom-20 flex flex-col gap-6 items-center">
                    <button className="flex flex-col items-center" onClick={() => toggleLike(reel.id)}>
                      <Heart className={`h-7 w-7 ${liked[reel.id] ? "fill-red-500 text-red-500" : "text-white"}`} />
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
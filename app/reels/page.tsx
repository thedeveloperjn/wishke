"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, MessageCircle, Share2, Volume2, VolumeX, Play } from "lucide-react"
import MainContent from "@/components/main-content"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
interface ReelData {
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
}

export default function ReelsPage() {
  const router = useRouter()
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [muted, setMuted] = useState(false)
  const [pausedVideos, setPausedVideos] = useState<Record<number, boolean>>({})
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
  const reelRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [activeReelId, setActiveReelId] = useState<number | null>(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const reels: ReelData[] = [
    {
      id: 1,
      user: {
        name: "John Manual",
        image: "/jamie-parker.png",
      },
      videoUrl: "/property-1.mp4",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et do...",
      likes: 9900,
      comments: 451,
      shares: 10,
    },
    {
      id: 2,
      user: {
        name: "Alex Carter",
        image: "/jamie-parker.png",
      },
      videoUrl: "/property-2.mp4",
      caption: "Check out this amazing property in downtown! Perfect location with stunning views.",
      likes: 5600,
      comments: 230,
      shares: 45,
    },
    {
      id: 3,
      user: {
        name: "Sam Taylor",
        image: "/chris-morgan.png",
      },
      videoUrl: "/property-3.mp4",
      caption: "Luxury living at its finest. This property features 5 bedrooms, a pool, and amazing views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    {
      id: 4,
      user: {
        name: "Sam Taylor",
        image: "/chris-morgan.png",
      },
      videoUrl: "/property-4.mp4",
      caption: "Luxury living at its finest. This property features 5 bedrooms, a pool, and amazing views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    {
      id: 5,
      user: {
        name: "Sam Taylor",
        image: "/jamie-parker.png",
      },
      videoUrl: "/property-5.mp4",
      caption: "Luxury living at its finest. This property features 5 bedrooms, a pool, and amazing views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    {
      id: 6,
      user: {
        name: "Sam Taylor",
        image: "/jamie-parker.png",
      },
      videoUrl: "/property-6.mp4",
      caption: "Luxury living at its finest. This property features 5 bedrooms, a pool, and amazing views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    {
      id: 7,
      user: {
        name: "Sam Taylor",
        image: "/jamie-parker.png",
      },
      videoUrl: "/property-7.mp4",
      caption: "Luxury living at its finest. This property features 5 bedrooms, a pool, and amazing views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    {
      id: 8,
      user: {
        name: "Sam Taylor",
        image: "/jamie-parker.png",
      },
      videoUrl: "/property-8.mp4",
      caption: "Luxury living at its finest. This property features 5 bedrooms, a pool, and amazing views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    {
      id: 9,
      user: {
        name: "Sam Taylor",
        image: "/chris-morgan.png",
      },
      videoUrl: "/property-9.mp4",
      caption: "Luxury living at its finest. This property features 5 bedrooms, a pool, and amazing views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const scrollPosition = container.scrollTop
      const containerHeight = container.clientHeight

      let maxVisibleReel = 1
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
  }, [activeReelId])

  useEffect(() => {
    if (activeReelId === null) return

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
  }, [activeReelId, pausedVideos, muted])

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([_, video]) => {
      if (video) {
        video.muted = muted
      }
    })
  }, [muted])

  const handleVideoRef = (reelId: number, el: HTMLVideoElement | null) => {
    videoRefs.current[reelId] = el

    if (el) {
      el.muted = muted
      el.loop = true
      el.onerror = (e) => {
        console.error("Video error:", e)
      }
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
      {/* Background with MainContent */}
      <div className="flex max-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
      <Header />
      <div className="flex flex-1 p-6 gap-6   overflow-hidden no-scrollbar">
        <Sidebar />
        <MainContent />
        <MessagesSidebar />
      </div>
    </div>
      {/* Reels overlay */}
      <div className="fixed inset-0 z-[60] flex justify-center items-center bg-black/90 backdrop-blur-[15px]">
        {/* Back button */}
        <div className="flex absolute top-6 left-10 items-center z-[80] gap-2">
        <Image src="/whiskelogo.svg" alt="WISHKE Logo" width={160} height={60} />
      </div>
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 left-[32%]  text-white bg-[#ffffff]/10 p-2 rounded-full border-none"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        {/* Mute button */}
        <button
          className="absolute top-4 right-4  text-white bg-transparent border-none"
          onClick={toggleMute}
        >
          {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>

        {/* Scrollable reels */}
        <div ref={containerRef} className="h-full w-full max-w-[420px] overflow-y-auto snap-y snap-mandatory no-scrollbar">
          {reels.map((reel) => (
            <div key={reel.id}
            ref={(el) => handleReelRef(reel.id, el)}
            data-reel-id={reel.id}> 
            <div
              className="relative w-full h-[95vh] my-10 mx-auto snap-center rounded-[12px] overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <video
                  ref={(el) => handleVideoRef(reel.id, el)}
                  src={reel.videoUrl}
                  className="w-full h-full object-cover"
                  playsInline
                  onClick={() => togglePause(reel.id)}
                />
                {/* Play/pause overlay */}
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
                {/* User info and caption */}
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
              <div  className="absolute right-[33%] bottom-20 flex flex-col gap-6 items-center">
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
    </div>
  )
}          
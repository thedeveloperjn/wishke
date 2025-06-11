"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, MessageCircle, Share2, Volume2, VolumeX, Play, X } from "lucide-react"
import MainContent from "@/components/main-content"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr"

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
  commentsList?: {
    id: number
    user: {
      name: string
      image: string
    }
    text: string
    timestamp: string
  }[]
}

export default function ReelsPage() {
  const router = useRouter()
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [muted, setMuted] = useState(false)
  const [pausedVideos, setPausedVideos] = useState<Record<number, boolean>>({})
  const [showCommentModal, setShowCommentModal] = useState<number | null>(null)
  const [showShareModal, setShowShareModal] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
  const reelRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [activeReelId, setActiveReelId] = useState<number | null>(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const commentInputRef = useRef<HTMLTextAreaElement>(null)

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

  const handleComment = (reelId: number) => {
    setShowCommentModal(reelId)
    // Focus comment input after modal opens
    setTimeout(() => {
      commentInputRef.current?.focus()
    }, 100)
  }

  const handleShare = (reelId: number) => {
    setShowShareModal(reelId)
  }

  const submitComment = (reelId: number) => {
    if (!newComment.trim()) return

    // Here you would typically make an API call to save the comment
    // For now, we'll just update the UI
    const updatedReels = reels.map(reel => {
      if (reel.id === reelId) {
        return {
          ...reel,
          comments: reel.comments + 1,
          commentsList: [
            ...(reel.commentsList || []),
            {
              id: Date.now(),
              user: {
                name: "You",
                image: "/jamie-parker.png" // Replace with actual user image
              },
              text: newComment,
              timestamp: new Date().toISOString()
            }
          ]
        }
      }
      return reel
    })

    setNewComment("")
    setShowCommentModal(null)
  }

  const shareOptions = [
    { name: "Copy Link", icon: "🔗" },
    { name: "WhatsApp", icon: "💬" },
    { name: "Facebook", icon: "📘" },
    { name: "Twitter", icon: "🐦" },
    { name: "Email", icon: "📧" }
  ]

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
          className="absolute top-4 md:top-6 left-4 md:left-[32%] z-[100]  text-white bg-[#ffffff]/10 p-2 rounded-full border-none"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        {/* Mute button */}
        <button
          className="absolute top-4 right-4  z-[100] text-white bg-transparent border-none"
          onClick={toggleMute}
        >
          {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>

        {/* Scrollable reels */}
        <div ref={containerRef} className="h-full w-full relative z-[99] sm:absolute max-w-[420px] overflow-y-auto snap-y snap-mandatory no-scrollbar">
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

                {/* Interaction buttons - moved inside the video container and always visible */}
                <div className="absolute right-4 bottom-[18%] flex flex-col gap-6 items-center">
                  <button 
                    className="flex flex-col items-center group" 
                    onClick={() => toggleLike(reel.id)}
                  >
                    <Heart 
                      className={`h-7 w-7 transition-all duration-300 ${
                        liked[reel.id] 
                          ? "fill-red-500 text-red-500 scale-110" 
                          : "text-white group-hover:scale-110"
                      }`} 
                    />
                    <span className="text-white text-xs mt-1">{formatNumber(reel.likes + (liked[reel.id] ? 1 : 0))}</span>
                  </button>
                  <button 
                    className="flex flex-col items-center group"
                    onClick={() => handleComment(reel.id)}
                  >
                    <MessageCircle className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white text-xs mt-1">{formatNumber(reel.comments)}</span>
                  </button>
                  <button 
                    className="flex flex-col items-center group"
                    onClick={() => handleShare(reel.id)}
                  >
                    <PaperPlaneTiltIcon className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white text-xs mt-1">{formatNumber(reel.shares)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))}
           
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              <button onClick={() => setShowCommentModal(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              {reels.find(r => r.id === showCommentModal)?.commentsList?.map(comment => (
                <div key={comment.id} className="flex gap-3 mb-4">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={comment.user.image}
                      alt={comment.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{comment.user.name}</p>
                    <p className="text-sm text-gray-600">{comment.text}</p>
                    <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <textarea
                ref={commentInputRef}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border rounded-lg p-2 resize-none"
                rows={2}
              />
              <button
                onClick={() => submitComment(showCommentModal)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={!newComment.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share to</h3>
              <button onClick={() => setShowShareModal(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg"
                  onClick={() => {
                    // Here you would implement the actual sharing functionality
                    console.log(`Sharing to ${option.name}`)
                    setShowShareModal(null)
                  }}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}          
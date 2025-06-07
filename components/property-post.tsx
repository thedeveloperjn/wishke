"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, MessageCircle, Share2, Bookmark, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import { Heart, BookmarkSimple, CalendarDots, MapPinIcon, CalendarDot, ArrowsLeftRight, PencilSimpleLine, EyeSlash, Trash, PencilLineIcon } from "@phosphor-icons/react"
import { ShareFat } from "@phosphor-icons/react"
import { ChatCircle } from "@phosphor-icons/react"
import { PaperPlaneTilt } from "@phosphor-icons/react"

interface PropertyPostProps {
  type?: "property" | "project" | "requirement"
  title: string
  location: string
  description: string
  price?: string
  timestamp: string
  authorName: string
  authorImage: string
  images: { type: "image" | "video"; url: string }[]
  likes: number
  comments: number
  userProfileUrl?: string
}

export default function PropertyPost({
  type,
  title,
  location,
  description,
  price,
  timestamp,
  authorName,
  authorImage,
  images,
  likes,
  comments,
  userProfileUrl = "/userprofile",
}: PropertyPostProps) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const postRef = useRef<HTMLDivElement>(null)

  const getTypeColor = () => {
    switch (type) {
      case "property":
        return "text-[#01A76F]"
      case "project":
        return "text-[#F66388]"
      case "requirement":
        return "text-orange-500"
      default:
        return "text-teal-500"
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/property-detail`)
  }

  const handleUserProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(userProfileUrl)
  }

  const handleVideoPlay = (index: number) => {
    setActiveVideoIndex(index)
  }

  const handleVideoPause = () => {
    setActiveVideoIndex(null)
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  const handlePostClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.closest('.no-post-click') || 
      target.closest('.dropdown-container') ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.tagName === 'VIDEO'
    ) {
      return
    }
    router.push(`/property-detail`)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div 
      className="rounded-lg bg-white p-4 mb-4 cursor-pointer"
      onClick={handlePostClick}
      ref={postRef}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="relative h-12 w-12 overflow-hidden rounded-full no-post-click"
            onClick={handleUserProfileClick}
          >
            <Image 
              src={authorImage || "/placeholder.svg"} 
              alt={authorName} 
              fill 
              className="object-cover" 
            />
          </div>
          <Link 
            href={userProfileUrl}
            className="no-post-click"
            onClick={handleUserProfileClick}
          >
            <div className="flex items-center gap-1">
              <h3 className="text-[18px] font-bold">{authorName}</h3>
            </div>
            <p className="text-[14px] text-muted-foreground">{timestamp}</p>
          </Link>
        </div>
        <div className="relative dropdown-container" ref={dropdownRef}>
          <button 
            className="text-muted-foreground hover:text-foreground no-post-click"
            onClick={toggleDropdown}
          >
            <MoreVertical className="h-10 w-10 hover:bg-gray-100 p-2 rounded-[6px]" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-[8px] bg-white shadow-lg z-10 no-post-click">
              <div className="py-1 px-4">
                <button 
                  className="block w-full flex gap-3 py-3 text-[16px] text-gray-500 hover:text-gray-700 text-left no-post-click"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowsLeftRight size={22}/> Matchings
                </button>
                <button 
                  className="block w-full flex gap-3 py-3 text-[16px] text-gray-500 hover:text-gray-700 text-left no-post-click"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PencilSimpleLine size={22}/> Edit
                </button>
                <button 
                  className="block w-full flex gap-3 py-3 text-[16px] text-gray-500 hover:text-gray-700 text-left no-post-click"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EyeSlash size={22} /> Hide Post
                </button>
                <button 
                  className="block w-full flex gap-3 py-3 text-[16px] text-red-500 border-t hover:text-red-500 text-left no-post-click"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash size={22} /> Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4" onClick={handleReadMore}>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className={`text-[16px] ${getTypeColor()}`}>
            {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Property'}
          </span>
          <span className="text-[16px] text-muted-foreground">•</span>
          <span className="text-[16px] text-muted-foreground">{title}</span>
          <span className="text-[16px] text-muted-foreground">•</span>
          <span className="text-[16px] text-muted-foreground">{location}</span>
          {price && (
            <>
              <span className="text-[16px] text-muted-foreground">•</span>
              <span className="text-[16px] font-medium">{price}</span>
            </>
          )}
        </div>

        <p className="text-[16px] text-muted-foreground">
          {description.length > 120 ? description.substring(0, 120) + "..." : description}{" "}
          <button 
            className="text-[16px] text-muted-foreground hover:text-foreground no-post-click"
            onClick={handleReadMore}
          >
            Read More
          </button>
        </p>
      </div>

      {images.length === 1 ? (
        <div className="overflow-hidden rounded-lg">
          {images[0].type === "video" ? (
            <video
              src={images[0].url}
              className="w-full h-[400px] object-cover no-post-click"
              controls
              autoPlay={activeVideoIndex === 0}
              onPlay={() => handleVideoPlay(0)}
              onPause={handleVideoPause}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Image
              src={images[0].url || "/placeholder.svg"}
              alt="Property"
              width={800}
              height={400}
              className="w-full object-cover h-[400px] no-post-click"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      ) : images.length === 2 ? (
        <div className="flex gap-2 rounded-lg">
          {images.map((media, index) => (
            <div key={index} className="relative w-1/2">
              {media.type === "video" ? (
                <video
                  src={media.url}
                  className="h-auto w-full object-cover rounded-lg no-post-click"
                  controls
                  autoPlay={activeVideoIndex === index}
                  onPlay={() => handleVideoPlay(index)}
                  onPause={handleVideoPause}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt="Property"
                  width={400}
                  height={400}
                  className="h-auto w-full object-cover rounded-lg no-post-click"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-2 rounded-lg overflow-x-auto no-scrollbar">
          {images.map((media, index) => (
            <div key={index} className="relative flex-shrink-0">
              {media.type === "video" ? (
                <video
                  src={media.url}
                  className="h-[220px] w-[300px] object-cover rounded-lg no-post-click"
                  controls
                  autoPlay={activeVideoIndex === index}
                  onPlay={() => handleVideoPlay(index)}
                  onPause={handleVideoPause}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt="Property"
                  width={300}
                  height={220}
                  className="h-[220px] w-[300px] object-cover rounded-lg no-post-click"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="hidden sm:flex items-center justify-between border-t pt-4 no-post-click">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${liked ? "text-red-500" : "text-gray-500"}`}
          >
            <Heart size={20} weight={liked ? "fill" : "regular"} />
            <span className="text-sm">{likesCount} Likes</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500">
            <ChatCircle size={20} />
            <span className="text-sm">{comments} Comments</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500">
            <PaperPlaneTilt size={20} />
            <span className="text-sm">Message</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500">
            <ShareFat size={20} />
            <span className="text-sm">Share</span>
          </button>
        </div>

        <button 
          className="text-gray-500"
          onClick={(e) => {
            e.stopPropagation()
            setBookmarked(!bookmarked)
          }}
        >
          <BookmarkSimple size={20} weight={bookmarked ? "fill" : "regular"} />
        </button>
      </div>
    </div>
  )
}
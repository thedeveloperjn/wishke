"use client"

import Image from "next/image"
import { MoreHorizontal, MessageCircle, Share2, Bookmark, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface RequirementPostProps {
  title: string
  budget: string
  location: string
  description: string
  timestamp: string
  authorName: string
  authorImage: string
  likes: number
  comments: number
}

export default function RequirementPost({
  title,
  budget,
  location,
  description,
  timestamp,
  authorName,
  authorImage,
  likes,
  comments,
}: RequirementPostProps) {
  const router = useRouter()

  const handleReadMore = () => {
    router.push(`/property-detail`)
  }

  return (
    <div className="rounded-lg  bg-white p-4 mb-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={authorImage || "/placeholder.svg"} alt={authorName} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold">{authorName}</h3>
            <p className="text-[14px] text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="text-[16px] text-orange-500">Requirement</span>
          <span className="text-[16px] text-muted-foreground">•</span>
          <span className="text-[16px] text-muted-foreground">{title}</span>
          <span className="text-[16px] text-muted-foreground">•</span>
          <span className="text-[16px] text-muted-foreground">{location}</span>
          <span className="text-[16px] text-muted-foreground">•</span>
          <span className="text-[16px] font-medium">{budget}</span>
        </div>

        <p className="text-[16px] text-muted-foreground">
          {description.length > 200 ? description.substring(0, 200) + "..." : description}{" "}
          <button className="text-[16px] text-muted-foreground hover:text-foreground" onClick={handleReadMore}>
            Read More
          </button>
        </p>
      </div>

      

      <div className="flex justify-between items-center">
        <div className="flex space-x-5">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Heart className="h-5 w-5" />
            <span className="text-[16px]">{likes}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <MessageCircle className="h-5 w-5" />
            <span className="text-[16px]">{comments}</span>
          </button>
        </div>
        <div className="flex space-x-3">
          <button className="text-muted-foreground hover:text-foreground">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

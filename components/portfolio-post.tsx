"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, MessageCircle, Share2, Bookmark, Heart, PlayCircle } from "lucide-react";

interface PortfolioPostProps {
  authorName: string;
  authorImage: string;
  timestamp: string;
  title: string;
  description: string;
  images: { type: "image" | "video"; url: string }[];
  likes: number;
  comments: number;
}

export default function PortfolioPost({
  authorName,
  authorImage,
  timestamp,
  title,
  description,
  images,
  likes,
  comments,
}: PortfolioPostProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const handleLike = () => {
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    setLiked(!liked);
  };

  const handleVideoPlay = (index: number) => {
    setActiveVideoIndex(index);
  };

  const handleVideoPause = () => {
    setActiveVideoIndex(null);
  };

  return (
    <div className="rounded-lg bg-white p-4 mb-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-8 sm:h-12 w-8  sm:w-12 overflow-hidden rounded-full">
            <Image src={authorImage || "/placeholder.svg"} alt={authorName} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-[16px] sm:text-[18px] font-bold">{authorName}</h3>
            <p className="text-[14px] text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-2">
        <h4 className="text-[16px] font-semibold mb-1">{title}</h4>
        <p className="text-[16px] text-muted-foreground">
          {description.length > 120 ? description.substring(0, 120) + "..." : description} {" "}
          <button className="text-[16px] text-muted-foreground hover:text-foreground font-semibold">Read More</button>
        </p>
      </div>

     
      {images.length === 1 ? (
        // Single media layout
        <div className="overflow-hidden rounded-lg">
          {images[0].type === "video" ? (
            <video
              src={images[0].url}
              className="w-full h-[400px] object-cover"
              controls
              autoPlay={activeVideoIndex === 0}
              onPlay={() => handleVideoPlay(0)}
              onPause={handleVideoPause}
            />
          ) : (
            <Image
              src={images[0].url || "/placeholder.svg"}
              alt="Property"
              width={800}
              height={400}
              className="w-full object-cover h-[400px]"
            />
          )}
        </div>
      ) : images.length === 2 ? (
        // Two media items layout
        <div className="flex gap-2 rounded-lg">
          {images.map((media, index) => (
            <div key={index} className="relative w-1/2 h-[220px] ">
              {media.type === "video" ? (
                <video
                  src={media.url}
                  className="h-[220px] w-full object-cover rounded-lg"
                  controls
                  autoPlay={activeVideoIndex === index}
                  onPlay={() => handleVideoPlay(index)}
                  onPause={handleVideoPause}
                />
              ) : (
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt="Property"
                  width={400}
                  height={400}
                  className="h-[220px] w-full object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        // More than two media items - horizontal scroll
        <div className="flex gap-2 rounded-lg overflow-x-auto no-scrollbar">
          {images.map((media, index) => (
            <div key={index} className="relative flex-shrink-0">
              {media.type === "video" ? (
                <video
                  src={media.url}
                  className="h-[220px] w-[300px] object-cover rounded-lg"
                  controls
                  autoPlay={activeVideoIndex === index}
                  onPlay={() => handleVideoPlay(index)}
                  onPause={handleVideoPause}
                />
              ) : (
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt="Property"
                  width={300}
                  height={220}
                  className="h-[220px] w-[300px] object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 flex justify-between items-center">
        <div className="flex space-x-5">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground" onClick={handleLike}>
            <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-sm">{likesCount} Likes</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{comments} Comments</span>
          </button>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Share2 className="h-5 w-5" />
            <span className="text-sm">Share</span>
          </button>
          <button className="text-muted-foreground hover:text-foreground" onClick={() => setBookmarked(!bookmarked)}>
            <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
} 
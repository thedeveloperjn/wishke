"use client"

import { useState,useEffect,useRef } from "react"
import PropertyPost from "@/components/property-post"
import RequirementPost from "@/components/requirement-post"
import HashtagNavigation from "@/components/hashtag-navigation"

interface Post {
  id: number
  type: "property" | "project" | "requirement"
  title: string
  location?: string
  price?: string
  budget?: string
  developer?: string
  priceRange?: string
  description: string
  timestamp: string
  authorName: string
  authorImage: string
  images?: Array<{ type: string; url: string }>
  likes: number
  comments: number
  hashtags: string[]
}

interface MainContentProps {
  posts: Post[]
  selectedHashtag: string | null
  onHashtagSelect: (hashtag: string | null) => void
}

export default function MainContent({ posts, selectedHashtag, onHashtagSelect }: MainContentProps) {
    const contentRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [activeTab, setActiveTab] = useState("for-you")
  
    useEffect(() => {
      const content = contentRef.current
      if (!content) return
  
      const handleScroll = () => {
        setIsScrolled(content.scrollTop > 0)
      }
  
      content.addEventListener("scroll", handleScroll)
      return () => content.removeEventListener("scroll", handleScroll)
    }, [])
  
    return (
      <div
        ref={contentRef}
        className={`flex-1 overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  transition-all duration-200 ${
          isScrolled ? "rounded-b-lg" : "rounded-lg"
        }`}
        style={{
          borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
          borderTopRightRadius: isScrolled ? 0 : "0.5rem",
        }}
      >
      <div className="bg-white rounded-lg mb-0 sm:mb-6">
        <HashtagNavigation selectedHashtag={selectedHashtag} onHashtagSelect={onHashtagSelect} />
      </div>

      {/* Posts */}
      <div className=" space-y-2 sm:space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found matching your criteria.</p>
          </div>
        ) : (
          posts.map((post) => {
            if (post.type === "property") {
              return (
                <PropertyPost
                  key={post.id}
                  type="property"
                  title={post.title}
                  location={post.location!}
                  price={post.price!}
                  description={post.description}
                  timestamp={post.timestamp}
                  authorName={post.authorName}
                  authorImage={post.authorImage}
                  images={post.images || []}
                  likes={post.likes}
                  comments={post.comments}
                />
              )
            } else if (post.type === "project") {
              return (
                <PropertyPost
                key={post.id}
                  type="project"
                  title={post.title}
                  location={post.location!}
                  price={post.price!}
                  description={post.description}
                  timestamp={post.timestamp}
                  authorName={post.authorName}
                  authorImage={post.authorImage}
                  images={post.images || []}
                  likes={post.likes}
                  comments={post.comments}
                />
              )
            } else {
              return (
                <RequirementPost
                  key={post.id}
                  title={post.title}
                  budget={post.budget!}
                  location={post.location!}
                  description={post.description}
                  timestamp={post.timestamp}
                  authorName={post.authorName}
                  authorImage={post.authorImage}
                  likes={post.likes}
                  comments={post.comments}
                />
              )
            }
          })
        )}
      </div>
    </div>
  )
}

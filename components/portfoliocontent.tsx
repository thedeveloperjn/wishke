"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Smile, Send, Filter } from "lucide-react"
import StorySection from "@/components/story-section"
import CategoryTabs from "@/components/category-tabs"
import ForYouPosts from "@/components/for-you-posts"
import FollowingPosts from "@/components/following-posts"
import ConnectSection from "@/components/connect-section"
import FilterComponent from "@/components/filter-component"
import AddPost from "./addpost"
import PortfolioPost from "./portfolio-post"

export default function MainContent() {
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
      className={`flex-1 overflow-y-auto h-[calc(100vh-96px)] no-scrollbar  transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div>
        <AddPost />

        <PortfolioPost
          authorName="James Lee"
          authorImage="/stylish-profile-picture.png"
          timestamp="26 April at 3:30 PM"
          title="The Future of Urban Living: Integrating Nature into City Spaces"
          description="Exploring how urban environments can coexist with nature is crucial. Here's a look at my recent initiatives..."
          images={[
            { type: "video", url: "/property-1.mp4" },
            { type: "image", url: "/modern-apartment-exterior.png" },
            { type: "image", url: "/luxury-tower-pool.png" },
          ]}
          likes={1200}
          comments={30}
        />
        <PortfolioPost
          authorName="Jamie Parker"
          authorImage="/jamie-parker.png"
          timestamp="25 April at 11:00 AM"
          title="Sustainable High-Rise Projects"
          description="Sharing my latest high-rise project that focuses on sustainability and community spaces."
          images={[
            { type: "image", url: "/luxury-bungalow-pool.png" },
            { type: "image", url: "/luxury-lobby.png" },
          ]}
          likes={980}
          comments={18}
        />
        <PortfolioPost
          authorName="Chris Morgan"
          authorImage="/chris-morgan.png"
          timestamp="24 April at 9:15 AM"
          title="Modern Office Complex Design"
          description="A sneak peek into my latest office complex design, blending glass and greenery for a productive environment."
          images={[
            { type: "image", url: "/diverse-group-outdoors.png" },
            { type: "image", url: "/diverse-group-four.png" },
            { type: "image", url: "/diverse-group-five.png" },
          ]}
          likes={760}
          comments={12}
        />
        <PortfolioPost
          authorName="Sam Taylor"
          authorImage="/sam-taylor.png"
          timestamp="23 April at 2:45 PM"
          title="Revitalizing Urban Spaces"
          description="Transforming underutilized urban spaces into vibrant community hubs. Here's how we did it!"
          images={[
            { type: "image", url: "/diverse-group-six.png" },
            { type: "video", url: "/property-2.mp4" },
          ]}
          likes={540}
          comments={8}
        />
        <PortfolioPost
          authorName="Alex Carter"
          authorImage="/alex-carter.png"
          timestamp="22 April at 5:10 PM"
          title="Green Roof Initiatives"
          description="Highlighting the benefits and process of implementing green roofs in city buildings."
          images={[
            { type: "image", url: "/modern-apartment-exterior.png" },
          ]}
          likes={320}
          comments={5}
        />
      </div>

      <FilterComponent isOpen={showFilter} onClose={() => setShowFilter(false)} />
    </div>
  )
}

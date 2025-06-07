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
      className={`flex-1 overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div>
        <div className={`flex-1 py-2 sm:py-6 sm:mb-6 overflow-y-auto bg-white  no-scrollbar  transition-all duration-200 ${
          isScrolled ? "rounded-b-lg" : "rounded-lg"
        }`}>
          <StorySection />
        </div>
       
       <AddPost />

        <div className="border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex w-[100%]">
              <button 
                className={` px-6 py-3 text-[16px] w-[33%] font-medium ${
                  activeTab === "for-you" 
                    ? "border-b-[2px] sm:border-b-[3px] border-gray-900 sm:border-purple-500 text-gray-900 sm:text-purple-500" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("for-you")}
              >
                For You
              </button>
              <button 
                className={` px-6 py-3 text-[16px] w-[34%] font-medium ${
                  activeTab === "following" 
                    ? "border-b-[2px] sm:border-b-[3px] border-gray-900 sm:border-purple-500 text-gray-900 sm:text-purple-500"  
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
              <button 
                className={` px-6 py-3 text-[16px] w-[33%] font-medium ${
                  activeTab === "connect" 
                    ? "border-b-[2px] sm:border-b-[3px] border-gray-900 sm:border-purple-500 text-gray-900 sm:text-purple-500" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("connect")}
              >
                Connect
              </button>
            </div>
            <button
              className="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted/50"
              onClick={() => setShowFilter(true)}
            >
              <span>Filter</span>
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-0 sm:mt-4">
          {activeTab === "for-you" && <ForYouPosts />}
          {activeTab === "following" && <FollowingPosts />}
          {activeTab === "connect" && <ConnectSection />}
        </div>
      </div>

      <FilterComponent isOpen={showFilter} onClose={() => setShowFilter(false)} />
    </div>
  )
}

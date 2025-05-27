"use client"

import { useState } from "react"
import Image from "next/image"
import { Smile, Send, Filter } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import PropertyPost from "@/components/property-post"
import RequirementPost from "@/components/requirement-post"
import ProjectPost from "@/components/project-post"
import FilterComponent from "@/components/filter-component"

export default function FollowingPage() {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 no-scrollbar">
      <Header />
      <div className="flex flex-1 p-4 gap-4 overflow-hidden no-scrollbar">
        <Sidebar />

        <main className="flex-1 overflow-y-auto h-[calc(100vh-96px)] no-scrollbar bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4">
            <div className="my-4 rounded-lg border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src="/diverse-group-profile.png" alt="Profile" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Post, What's on your mind?"
                    className="w-full border-none bg-transparent outline-none"
                  />
                </div>
                <button className="text-muted-foreground">
                  <Smile className="h-5 w-5" />
                </button>
                <button className="rounded-md bg-teal-500 px-4 py-2 text-white">
                  <div className="flex items-center gap-2">
                    <span>Post</span>
                    <Send className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>

            <div className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <button
                    className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => (window.location.href = "/")}
                  >
                    For You
                  </button>
                  <button className="border-b-2 border-purple-500 px-6 py-3 text-sm font-medium text-purple-500">
                    Following
                  </button>
                  <button
                    className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => (window.location.href = "/connect")}
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

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">Posts from people you follow</h2>

              <PropertyPost
                type="property"
                title="5BHK Residential-Bungalow"
                location="Malabar Hill, Mumbai"
                price="₹1.7L per Month"
                description="Luxury bunsgalow with stunning views of the Arabian Sea. This property features 5 bedrooms, a private pool, and a spacious garden."
                timestamp="22 April at 09:15 AM"
                authorName="John Manual"
                authorImage="/john-manual.png"
                images={["/luxury-bungalow-pool.png"]}
                likes={76}
                comments={24}
              />

              <ProjectPost
                title="Horizon Tower • 2, 3 BHK Flats"
                developer="Lodha Group"
                location="Worli, Mumbai"
                priceRange="₹2.5 Cr - 5 Cr"
                description="Introducing the new Horizon Tower at Worli, offering stunning sea views and world-class amenities in the heart of Mumbai's business district."
                timestamp="23 April at 15:32 PM"
                authorName="Alex Carter"
                authorImage="/alex-carter.png"
                images={["/luxury-tower-pool.png", "/luxury-lobby.png", "/modern-apartment-exterior.png"]}
                likes={45}
                comments={12}
              />

              <RequirementPost
                title="Need 3BHK Flat for Family"
                budget="₹40K - 60K per Month"
                location="Powai, Hiranandani"
                description="Family of four looking for a spacious 3BHK apartment in Powai area, preferably in Hiranandani complex. Need good schools nearby and play area for kids."
                timestamp="24 April at 14:23 PM"
                authorName="Sam Taylor"
                authorImage="/sam-taylor.png"
                likes={24}
                comments={12}
              />
            </div>
          </div>
        </main>

        <MessagesSidebar />
      </div>

      <FilterComponent isOpen={showFilter} onClose={() => setShowFilter(false)} />
    </div>
  )
}

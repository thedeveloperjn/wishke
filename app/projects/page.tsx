"use client"
import { useState } from "react"
import Image from "next/image"
import { Smile, Send, Filter, FolderKanban } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import FeedTabs from "@/components/feed-tabs"
import ProjectPost from "@/components/project-post"
import FilterModal from "@/components/filter-modal"

export default function ProjectsPage() {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 no-scrollbar">
      <Header />
      <div className="flex flex-1 p-4 gap-4 overflow-hidden no-scrollbar">
        <Sidebar />

        <main className="flex-1 overflow-y-auto h-[calc(100vh-96px)] no-scrollbar bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FolderKanban className="h-6 w-6 text-purple-500" />
                <h1 className="text-2xl font-bold">Projects</h1>
              </div>
              <button
                className="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted/50"
                onClick={() => setShowFilter(true)}
              >
                <span>Filter</span>
                <Filter className="h-4 w-4" />
              </button>
            </div>

            <div className="my-4 rounded-lg border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src="/diverse-group-profile.png" alt="Profile" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Post a project..."
                    className="w-full border-none bg-transparent outline-none"
                  />
                </div>
                <button className="text-muted-foreground">
                  <Smile className="h-5 w-5" />
                </button>
                <button className="rounded-md bg-purple-500 px-4 py-2 text-white">
                  <div className="flex items-center gap-2">
                    <span>Post</span>
                    <Send className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>

            <FeedTabs />

            <div className="mt-4">
              <ProjectPost
                title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
                developer="Godrej Properties"
                location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
                priceRange="₹21 Cr - 40 Cr"
                description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
                timestamp="24 April at 12:16 PM"
                authorName="Mark Russel"
                authorImage="/john-manual.png"
                images={["/luxury-tower-pool.png", "/modern-apartment-exterior.png", "/luxury-lobby.png"]}
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
                authorName="Jennifer Smith"
                authorImage="/stylish-profile-picture.png"
                images={["/luxury-tower-pool.png", "/luxury-lobby.png", "/modern-apartment-exterior.png"]}
                likes={45}
                comments={12}
              />

              <ProjectPost
                title="Green Valley • 3, 4 BHK Villas"
                developer="Prestige Group"
                location="Powai, Mumbai"
                priceRange="₹8 Cr - 12 Cr"
                description="Luxurious eco-friendly villas surrounded by lush greenery, offering a perfect blend of modern living and natural beauty with excellent connectivity."
                timestamp="22 April at 09:47 AM"
                authorName="Robert Wilson"
                authorImage="/sam-taylor.png"
                images={["/luxury-bungalow-pool.png", "/modern-apartment-exterior.png", "/luxury-lobby.png"]}
                likes={38}
                comments={9}
              />
            </div>
          </div>
        </main>

        <MessagesSidebar />
      </div>

      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} type="project" />
    </div>
  )
}

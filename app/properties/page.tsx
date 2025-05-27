"use client"
import { useState } from "react"
import Image from "next/image"
import { Smile, Send, Filter, Building2 } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import FeedTabs from "@/components/feed-tabs"
import PropertyPost from "@/components/property-post"
import FilterModal from "@/components/filter-modal"

export default function PropertiesPage() {
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
                <Building2 className="h-6 w-6 text-teal-500" />
                <h1 className="text-2xl font-bold">Properties</h1>
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
                    placeholder="Post a property..."
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

            <FeedTabs />

            <div className="mt-4">
              <PropertyPost
                type="property"
                title="3BHK Residential-Flat"
                location="Andheri, Mumbai"
                price="₹75K per Month"
                description="Discover your dream home in the heart of Andheri, Mumbai! This stunning 3BHK flat is located in a secure gated community with modern amenities and spacious rooms."
                timestamp="23 April at 10:23 AM"
                authorName="Samantha Rivers"
                authorImage="/stylish-profile-picture.png"
                images={["/modern-apartment-exterior.png"]}
                likes={654}
                comments={122}
              />

              <PropertyPost
                type="property"
                title="5BHK Residential-Bungalow"
                location="Malabar Hill, Mumbai"
                price="₹1.7L per Month"
                description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
                timestamp="24 April at 12:21 PM"
                authorName="Malvika Willson"
                authorImage="/diverse-group-profile.png"
                images={["/luxury-bungalow-pool.png", "/luxury-lobby.png", "/modern-apartment-exterior.png"]}
                likes={76}
                comments={24}
              />

              <PropertyPost
                type="property"
                title="2BHK Residential-Flat"
                location="Mahalaxi, Mumbai West"
                price="₹30,000 per Month"
                description="Find your new home in Mahalaxi, Mumbai West! This cozy 2BHK flat is available for ₹30,000 per month. Enjoy a spacious layout in a lively neighborhood with easy access to transport, shops, and eateries."
                timestamp="22 April at 09:42 AM"
                authorName="Alex Carter"
                authorImage="/alex-carter.png"
                images={["/modern-apartment-exterior.png"]}
                likes={32}
                comments={18}
              />
            </div>
          </div>
        </main>

        <MessagesSidebar />
      </div>

      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} type="property" />
    </div>
  )
}

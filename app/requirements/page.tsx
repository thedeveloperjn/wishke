"use client"
import { useState } from "react"
import Image from "next/image"
import { Smile, Send, Filter, FileText } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import FeedTabs from "@/components/feed-tabs"
import RequirementPost from "@/components/requirement-post"
import FilterModal from "@/components/filter-modal"

export default function RequirementsPage() {
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
                <FileText className="h-6 w-6 text-orange-500" />
                <h1 className="text-2xl font-bold">Requirements</h1>
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
                    placeholder="Post a requirement..."
                    className="w-full border-none bg-transparent outline-none"
                  />
                </div>
                <button className="text-muted-foreground">
                  <Smile className="h-5 w-5" />
                </button>
                <button className="rounded-md bg-orange-500 px-4 py-2 text-white">
                  <div className="flex items-center gap-2">
                    <span>Post</span>
                    <Send className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>

            <FeedTabs />

            <div className="mt-4">
              <RequirementPost
                title="Looking for 2/3 BHK Apartment"
                budget="₹50K - 80K per Month"
                location="Bandra, Juhu, or Andheri"
                description="I'm looking for a well-maintained apartment in a good locality with 24/7 security, covered parking, and modern amenities. Prefer a family-friendly community."
                timestamp="25 April at 9:42 AM"
                authorName="Alex Carter"
                authorImage="/alex-carter.png"
                likes={32}
                comments={18}
              />

              <RequirementPost
                title="Need 3BHK Flat for Family"
                budget="₹40K - 60K per Month"
                location="Powai, Hiranandani"
                description="Family of four looking for a spacious 3BHK apartment in Powai area, preferably in Hiranandani complex. Need good schools nearby and play area for kids."
                timestamp="24 April at 14:23 PM"
                authorName="Sarah Johnson"
                authorImage="/stylish-profile-picture.png"
                likes={24}
                comments={12}
              />

              <RequirementPost
                title="Seeking 2BHK Flat for Bachelor"
                budget="₹25K - 35K per Month"
                location="Mahalaxi, Mumbai West"
                description="IT professional looking for a clean, well-maintained 2BHK flat in Mahalaxi area. Need furnished place with good internet connectivity and nearby convenience stores."
                timestamp="23 April at 11:15 AM"
                authorName="Mike Thompson"
                authorImage="/sam-taylor.png"
                likes={19}
                comments={8}
              />
            </div>
          </div>
        </main>

        <MessagesSidebar />
      </div>

      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} type="requirement" />
    </div>
  )
}

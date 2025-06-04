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
    <div className="min-w-[51%] xl:max-w-[51%]">
      

        <main className="flex-1 overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  rounded-lg">

      
              <RequirementPost
                title="Looking for 2/3 BHK Apartment"
                budget="₹50K - 80K per Month"
                location="Bandra, Juhu, or Andheri"
                description="I'm looking for a well-maintained apartment in a good locality with 24/7 security, covered parking, and modern amenities. Prefer a family-friendly community."
                timestamp="25 April at 9:42 AM"
                authorName="Alex Carter"
                authorImage="/jamie-parker.png"
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
         
        </main>



      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} type="requirement" />
    </div>
  )
}

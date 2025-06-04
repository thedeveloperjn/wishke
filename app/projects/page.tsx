"use client"
import { useState } from "react"
import Image from "next/image"
import PropertyPost from "@/components/property-post"
import { Smile, Send, Filter, FolderKanban } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import FeedTabs from "@/components/feed-tabs"
import FilterModal from "@/components/filter-modal"
import AddPost from "@/components/addpost"

export default function ProjectsPage() {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div className="min-w-[51%] xl:max-w-[51%]">
      

        <main className="flex-1 overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  rounded-lg">
        <PropertyPost
      type="project"
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
  
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        price="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
        authorName="Mark Russel"
        authorImage="/jamie-parker.png"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
      />
       <PropertyPost
      type="project"
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
  
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        price="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
        authorName="Mark Russel"
        authorImage="/jamie-parker.png"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
      />
       <PropertyPost
      type="project"
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
  
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        price="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
        authorName="Mark Russel"
        authorImage="/jamie-parker.png"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
      />
       <PropertyPost
      type="project"
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
  
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        price="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
        authorName="Mark Russel"
        authorImage="/jamie-parker.png"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
      />
       <PropertyPost
      type="project"
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
  
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        price="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
        authorName="Mark Russel"
        authorImage="/jamie-parker.png"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
      />
        </main>

       

      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} type="project" />
    </div>
  )
}

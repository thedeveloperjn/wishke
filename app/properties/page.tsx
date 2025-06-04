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
    <div className="min-w-[51%] xl:max-w-[51%]">
      

        <main className="flex-1 overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  rounded-lg">

     
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
           
        </main>

      
      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} type="property" />
    </div>
  )
}

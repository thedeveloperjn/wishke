"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import { Smile, Send, Filter } from "lucide-react"
import HashtagNavigation from "@/components/hashtag-navigation"
import FilterComponent from "@/components/filter-component"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import MainContent from "@/components/discovercomp"

const samplePosts = [
  {
    id: 1,
    type: "property" as const,
    title: "3BHK Residential-Flat",
    location: "Andheri, Mumbai",
    price: "₹75K per Month",
    description:
      "Discover your dream home in the heart of Andheri, Mumbai! This stunning 3BHK flat is located in a secure gated community with modern amenities and spacious rooms. #RealEstate #Mumbai #Rental #ModernLiving #GatedCommunity",
    timestamp: "23 April at 10:23 AM",
    authorName: "Samantha Rivers",
    authorImage: "/placeholder.svg?height=40&width=40",
    images: [{ type: "image", url: "/placeholder.svg?height=400&width=600" }],
    likes: 654,
    comments: 122,
    hashtags: ["RealEstate", "Mumbai", "Rental", "ModernLiving", "GatedCommunity"],
  },
  {
    id: 2,
    type: "project" as const,
    title: "Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow",
    developer: "Godrej Properties",
    location: "Godrej Evenue 11, Mahalaxmi, Mumbai South",
    priceRange: "₹21 Cr - 40 Cr",
    description:
      "For athletes, high altitude produces two contradictory effects on performance. Luxury living redefined with world-class amenities. #LuxuryLiving #GodrejProperties #Mumbai #PremiumHomes #RealEstateIndia",
    timestamp: "24 April at 12:16 PM",
    authorName: "Mark Russel",
    authorImage: "/placeholder.svg?height=40&width=40",
    images: [
      { type: "image", url: "/placeholder.svg?height=400&width=600" },
      { type: "image", url: "/placeholder.svg?height=400&width=600" },
      { type: "image", url: "/placeholder.svg?height=400&width=600" },
    ],
    likes: 76,
    comments: 24,
    hashtags: ["LuxuryLiving", "GodrejProperties", "Mumbai", "PremiumHomes", "RealEstateIndia"],
  },
  {
    id: 3,
    type: "requirement" as const,
    title: "Looking for 2/3 BHK Apartment",
    budget: "₹50K - 80K per Month",
    location: "Bandra, Juhu, or Andheri",
    description:
      "I'm looking for a well-maintained apartment in a good locality with 24/7 security, covered parking, and modern amenities. Prefer a family-friendly community. #PropertySearch #Mumbai #Rental #FamilyFriendly #HomeSweetHome",
    timestamp: "25 April at 9:42 AM",
    authorName: "Alex Carter",
    authorImage: "/placeholder.svg?height=40&width=40",
    likes: 32,
    comments: 18,
    hashtags: ["PropertySearch", "Mumbai", "Rental", "FamilyFriendly", "HomeSweetHome"],
  },
]


export default function Home() {
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

  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = samplePosts.filter((post) => {
    const matchesHashtag = !selectedHashtag || post.hashtags.includes(selectedHashtag)
    const matchesSearch =
      !searchQuery ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.hashtags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesHashtag && matchesSearch
  })

  return (
    <div className="min-w-[51%] xl:max-w-[51%]">
        <MainContent posts={filteredPosts} selectedHashtag={selectedHashtag} onHashtagSelect={setSelectedHashtag} />
     
      </div>
      
  
  )
}

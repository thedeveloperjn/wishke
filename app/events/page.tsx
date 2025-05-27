"use client"

import { useState , useEffect,useRef } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import EventsContent from "@/components/events-content"
import MessagesSidebar from "@/components/messages-sidebar"

const sampleEvents = [
  {
    id: 1,
    title: "Join us for our Food Donation Drive!",
    description: "Everyone is welcome to contribute—simply select the number of food packages you'd like to donate.",
    date: "12 May 2025",
    time: "11 AM - 7 PM",
    location: "Green Avenue, Mumbai",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&h=300&fit=crop",
    category: "Real Estate",
    organizer: "Malvika Willson",
    organizerImage: "/placeholder.svg?height=40&width=40",
    attendees: 45,
    hashtags: ["Community", "Donation", "RealEstate", "Mumbai", "SocialGood"],
  },
  {
    id: 2,
    title: "Participate in our Annual Health Fair!",
    description: "Free health screenings and wellness workshops available for all community members.",
    date: "15 June 2025",
    time: "10 AM - 6 PM",
    location: "Yellow Boulevard, Mumbai",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&h=300&fit=crop",
    category: "Real Estate",
    organizer: "Mark Russel",
    organizerImage: "/placeholder.svg?height=40&width=40",
    attendees: 78,
    hashtags: ["Health", "Community", "Wellness", "RealEstate", "Mumbai"],
  },
  {
    id: 3,
    title: "Attend our Back-to-School Supply Drive!",
    description: "Help us gather supplies for underprivileged students in our community.",
    date: "30 August 2025",
    time: "8 AM - 4 PM",
    location: "Blue Lane, Mumbai",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
    category: "Real State",
    organizer: "Alex Carter",
    organizerImage: "/placeholder.svg?height=40&width=40",
    attendees: 32,
    hashtags: ["Education", "Community", "BackToSchool", "RealEstate", "Mumbai"],
  },
  {
    id: 4,
    title: "Celebrate our Cultural Festival!",
    description: "Enjoy food, music, and performances from various cultures in our diverse community.",
    date: "22 September 2025",
    time: "1 PM - 9 PM",
    location: "Red Street, Mumbai",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
    category: "Real State",
    organizer: "Samantha Rivers",
    organizerImage: "/placeholder.svg?height=40&width=40",
    attendees: 156,
    hashtags: ["Culture", "Festival", "Community", "RealEstate", "Mumbai"],
  },
  {
    id: 5,
    title: "Property Investment Seminar",
    description: "Learn about the latest trends in real estate investment and market opportunities.",
    date: "5 July 2025",
    time: "2 PM - 5 PM",
    location: "Business Center, Andheri",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=500&h=300&fit=crop",
    category: "Real State",
    organizer: "Jordan Lee",
    organizerImage: "/placeholder.svg?height=40&width=40",
    attendees: 89,
    hashtags: ["Investment", "RealEstate", "Seminar", "Business", "Mumbai"],
  },
  {
    id: 6,
    title: "Home Buyers Workshop",
    description: "First-time home buyer workshop covering loans, legal processes, and market insights.",
    date: "18 August 2025",
    time: "10 AM - 3 PM",
    location: "Community Hall, Bandra",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&h=300&fit=crop",
    category: "Real State",
    organizer: "Chris Morgan",
    organizerImage: "/placeholder.svg?height=40&width=40",
    attendees: 67,
    hashtags: ["HomeBuying", "Workshop", "RealEstate", "FirstTime", "Mumbai"],
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
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

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesSearch =
      !searchQuery ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.hashtags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesSearch
  })

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
        <Sidebar />
        <EventsContent events={filteredEvents} />
        <MessagesSidebar />
      </div>
    </div>
  )
}

"use client"

import { useState , useEffect,useRef } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import EventsContent from "@/components/events-content"
import MessagesSidebar from "@/components/messages-sidebar"

export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  category: string
  organizer: string
  organizerImage: string
  attendees: number
  hashtags: string[]
  fullDescription: string
  venue: string
  ticketPrice: string
}

export const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Luxury Living Expo 2025 - Mumbai Edition",
    description:
      "Discover the latest trends in luxury real estate and premium lifestyle products at Mumbai's premier expo.",
    date: "June 20-22, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Jio World Convention Centre, BKC, Mumbai",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&h=300&fit=crop",
    category: "Real Estate",
    organizer: "Symor Karos",
    organizerImage: "/placeholder.svg?height=40&width=40&text=SK",
    attendees: 2500,
    hashtags: ["#LuxuryLiving", "#RealEstate", "#Mumbai", "#Expo2025"],
    fullDescription: `Wherever you are in your career, you can still build it on your terms.

Caroline A. Wanga didn't follow a traditional career path — she made her own. She rose from camp counselor to Target C-suite executive to president and CEO of Essence Ventures, building a career by chasing experiences, embracing failure and refusing to shrink when she was so fit expectations.

In her upcoming memoir "I'm Highly Percent Sure," she shares the unfiltered lessons that shaped her journey and why she believes that, no matter where you are in your career, the real path to success.

Now, in this exclusive event for Premium subscribers, Caroline is bringing those lessons to life to help you take control of your next move.

Join us live on May 8 to learn how to:

• Map your career around experiences, not job titles
• Turn failure into your competitive advantage  
• Move forward without negotiating who you are`,
    venue: "Jio World Convention Centre, BKC, Mumbai",
    ticketPrice: "₹2,500 - ₹15,000",
  },
  {
    id: 2,
    title: "PropTech Innovation Summit 2025",
    description: "Explore cutting-edge technology solutions transforming the real estate industry.",
    date: "July 15-16, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "India Expo Centre, Greater Noida",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&h=300&fit=crop",
    category: "Technology",
    organizer: "Tech Innovators",
    organizerImage: "/placeholder.svg?height=40&width=40&text=TI",
    attendees: 1800,
    hashtags: ["#PropTech", "#Innovation", "#RealEstate", "#Technology"],
    fullDescription: `Wherever you are in your career, you can still build it on your terms.

Caroline A. Wanga didn't follow a traditional career path — she made her own. She rose from camp counselor to Target C-suite executive to president and CEO of Essence Ventures, building a career by chasing experiences, embracing failure and refusing to shrink when she was so fit expectations.

In her upcoming memoir "I'm Highly Percent Sure," she shares the unfiltered lessons that shaped her journey and why she believes that, no matter where you are in your career, the real path to success.

Now, in this exclusive event for Premium subscribers, Caroline is bringing those lessons to life to help you take control of your next move.

Join us live on May 8 to learn how to:

• Map your career around experiences, not job titles
• Turn failure into your competitive advantage  
• Move forward without negotiating who you are`,
  venue: "India Expo Centre, Greater Noida",
    ticketPrice: "₹3,000 - ₹12,000",
  },
  {
    id: 3,
    title: "Sustainable Architecture Conference",
    description: "Learn about eco-friendly building practices and sustainable design principles.",
    date: "August 10-12, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Bangalore International Exhibition Centre",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
    category: "Architecture",
    organizer: "Green Building Council",
    organizerImage: "/placeholder.svg?height=40&width=40&text=GBC",
    attendees: 1200,
    hashtags: ["#Sustainable", "#Architecture", "#GreenBuilding", "#EcoFriendly"],
    fullDescription: `Wherever you are in your career, you can still build it on your terms.

    Caroline A. Wanga didn't follow a traditional career path — she made her own. She rose from camp counselor to Target C-suite executive to president and CEO of Essence Ventures, building a career by chasing experiences, embracing failure and refusing to shrink when she was so fit expectations.
    
    In her upcoming memoir "I'm Highly Percent Sure," she shares the unfiltered lessons that shaped her journey and why she believes that, no matter where you are in your career, the real path to success.
    
    Now, in this exclusive event for Premium subscribers, Caroline is bringing those lessons to life to help you take control of your next move.
    
    Join us live on May 8 to learn how to:
    
    • Map your career around experiences, not job titles
    • Turn failure into your competitive advantage  
    • Move forward without negotiating who you are`,
     venue: "Bangalore International Exhibition Centre",
    ticketPrice: "₹1,500 - ₹8,000",
  },
]


export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
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
    <div className="min-w-[51%] xl:max-w-[51%]">
        <EventsContent events={filteredEvents} />
       
    </div>
  )
}

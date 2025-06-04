"use client"

import { useState } from "react"
import { useParams } from "next/navigation"


import Image from "next/image"
import {  MessageCircle, Share, ArrowLeft } from "lucide-react"
import Link from "next/link"
import UpcomingEvents from "@/components/upcoming-events"
import {Heart, BookmarkSimple ,CalendarDots , MapPinIcon, CalendarDot} from "@phosphor-icons/react"
import { ShareFat } from "@phosphor-icons/react"
import { ChatCircle } from "@phosphor-icons/react"
import { PaperPlaneTilt } from "@phosphor-icons/react"
 
 interface Event {
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
  
   const sampleEvents: Event[] = [
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

  👉🏽 Map your career around experiences, not job titles
      👉🏽 Turn failure into your competitive advantage  
      👉🏽 Move forward without negotiating who you are`,
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
  
👉🏽 Map your career around experiences, not job titles
      👉🏽 Turn failure into your competitive advantage  
      👉🏽 Move forward without negotiating who you are`,
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
      
      👉🏽 Map your career around experiences, not job titles
      👉🏽 Turn failure into your competitive advantage  
      👉🏽 Move forward without negotiating who you are`,
       venue: "Bangalore International Exhibition Centre",
      ticketPrice: "₹1,500 - ₹8,000",
    },
  ]
  

  export default function EventDetailPage() {
    const [activeSection, setActiveSection] = useState("events")
    const [liked, setLiked] = useState(false)
    const params = useParams()
    const eventId = Number.parseInt(params.id as string)
    const event = sampleEvents.find((item) => item.id === eventId)
  
    const toggleLike = () => setLiked(!liked)

    if (!event) {
      return <div>Event not found</div>
    }

  return (
  <div className="min-w-[51%] xl:max-w-[51%]">
          {/* Back button */}
          <main className="flex-1  overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  rounded-lg">
          
          <Link href="/events" className="sticky top-0 p-4  flex items-center  bg-white z-[5] text-[20px] font-semibold gap-2 text-gray-900 hover:text-gray-900 ">
            <ArrowLeft className="w-4 h-4" />
            Event Detail
          </Link>
<div className="bg-white rounded-lg  overflow-hidden pt-0">
          {/* Article content */}
         {/* Event content */}
         <article className="bg-white rounded-lg  overflow-hidden">
            {/* Organizer info */}
            <div className="p-4 pb-0">
              <div className="flex items-center gap-3">
                <Image
                  src={event.organizerImage || "/placeholder.svg"}
                  alt={event.organizer}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{event.organizer}</p>
                  <p className="text-sm text-gray-500">24 April at 12:01 PM</p>
                </div>
              </div>
            </div>

            {/* Event title and details */}
            <div className="p-4 pb-0">
              <h1 className="text-[20px] font-bold text-gray-900 mb-2">{event.title}</h1>

              <div className="flex text-[16px] items-center gap-2 text-gray-900 mb-2">
              June 20–22, 2025 (11:00 AM – 7:00 PM)
              </div>

              <div className="flex items-center text-[16px] gap-2 text-gray-600 mb-6">
                <MapPinIcon size={20} />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Event image */}
            <div className="px-4">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
            </div>

            {/* Event description */}
            <div className="p-6">
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.fullDescription}</p>
              </div>

             <div className="flex items-center justify-between   border-t pt-4">
            <div className="flex items-center gap-6">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 ${liked ? "text-red-500" : "text-gray-500"}`}
              >
                <Heart size={20} weight={liked ? "fill" : "regular"} />
                <span className="text-sm">{liked ? event.attendees + 1 : event.attendees} Likes</span>
              </button>

              <button className="flex items-center gap-2 text-gray-500">
                <ChatCircle size={20} />
                <span className="text-sm">{event.attendees} Comments</span>
              </button>

              <button className="flex items-center gap-2 text-gray-500">
                <PaperPlaneTilt size={20} />
                <span className="text-sm">Message</span>
              </button>

              <button className="flex items-center gap-2 text-gray-500">
                < ShareFat  size={20} />
                <span className="text-sm">Share</span>
              </button>
            </div>

            <button className="text-gray-500">
              <BookmarkSimple   size={20} />
            </button>
          </div>
            </div>
          </article>
          </div>
          <div className="my-6">
          <UpcomingEvents events={sampleEvents} />
          </div>
          </main>
          
        </div>
    
  )
}

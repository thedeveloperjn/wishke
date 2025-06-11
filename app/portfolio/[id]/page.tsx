"use client"

import type React from "react"
import Postedby from "@/components/postedby"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  ChatCircle,
  Building ,
  ShareNetwork,
  Ruler ,
  BookmarkSimple,
  MapPin,
  Buildings,
  Bed,
  Bathtub,
  Wind ,
  Car,
  Elevator,
  ShareFat ,
  Shield,
  PaperPlaneTilt,
  Fire,
  Lightning,
  Drop,
  Leaf,
  CheckCircle,
  Phone,
  ChatTeardrop,
  Couch,
  SunHorizon,
  CarSimple,
  UserCircle,
  ArrowsOut,
  BuildingOffice,
  ClockCountdown,
  UsersThree,
  Person,
  ChefHat,
  Clover,
  FireExtinguisher,
  SecurityCamera,
  CarBattery,
  Warehouse,
  PhoneCall,
  ChatTeardropText,
  ArrowsLeftRight,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

interface ProjectDetailContentProps {
  projectId: number
}

export default function ProjectDetailContent({ projectId }: ProjectDetailContentProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [comments, setComments] = useState(0)
  const [share, setShare] = useState(0)
  const [shareout, setShareout] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const [activeTab, setActiveTab] = useState("Description")

  // Refs for scroll sections
  const descriptionRef = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Mock project data matching the image
  const project = {
    id: projectId,
    title: "3, 4, 5 BHK Flats",
    priceRange: "₹21 Cr - 40 Cr",
    location: "Godrej Evenue 11, Mahalaxmi, Mumbai South",
    images: [
      "/modern-apartment-exterior.png",
      "/luxury-lobby.png",
      "/modern-apartment-exterior.png",
    ],
    likes: 1000,
    comments: 24,
    description:
      "Introducing Godrej Evenue 11, located in the vibrant Mahalaxmi area of South Mumbai. This project offers a remarkable opportunity for those seeking a luxurious residential experience, priced starting from 21 Crores. The property is ready to move in, offering a seamless transition to your new home. Residents will enjoy a plethora of facilities, including state-of-the-art amenities, ensuring a comfortable and convenient lifestyle. With excellent connectivity to major thoroughfares, everything you need is just moments away.",
    specifications: {
      propertyType: "Apartment",
      bedrooms: "05",
      bathrooms: "03",
      balcony: "02",
      furnishingType: "Semi Furnished",
      facing: "East",
      propertyStatus: "Ready to Move",
      carParking: "02",
      totalArea: "3200 sq ft",
      buildupArea: "2700 sq ft",
      carpetArea: "3200 sq ft",
      totalFloors: "10",
      availableFloor: "06",
      ageOfProperty: "New",
      preferredTenant: "Anyone",
      genderPreference: "Anyone",
      postedBy: "Owner",
    },
    amenities: [
      { icon: ChefHat , name: "Modular Kitchen" },
      { icon: Clover , name: "Garden" },
      { icon: FireExtinguisher, name: "Fire Fighting System" },
      { icon: SecurityCamera  , name: "24×7 Security" },
      { icon: Elevator, name: "Fast Elevators" },
      { icon: CarBattery, name: "Power Backup" },
      { icon: Warehouse, name: "Covered Parking" },
      { icon: Lightning, name: "EV Charging" },
      { icon: Drop, name: "24×7 Water Supply" },
    ],
    highlights: [
      "5 minutes from Indore Bus Stand",
      "5 minutes from Indore Bus Stand",
      "5 minutes from Indore Bus Stand",
      "5 minutes from Indore Bus Stand",
      "5 minutes from Indore Bus Stand",
      "5 minutes from Indore Bus Stand",
    ],
    postedBy: {
      name: "Mark Russel",
      username: "@malvikawill",
      company: "Mark Agency - Real State",
      avatar: "/imagesstatic/malvika.jpg",
    },
  }

  const tabs = [
    { id: "Description", ref: descriptionRef },
    { id: "Overview", ref: overviewRef },
    { id: "Amenities", ref: amenitiesRef },
    { id: "Highlights", ref: highlightsRef },
    { id: "Contact", ref: contactRef },
  ]

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, tabId: string) => {
    setActiveTab(tabId)
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const container = contentRef.current
      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight

      // Find which section is most visible
      let activeSection = tabs[0].id
      let maxVisibleArea = 0

      tabs.forEach((tab) => {
        const section = tab.ref.current
        if (!section) return

        // Get section position relative to the container
        const sectionTop = section.offsetTop - container.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionBottom = sectionTop + sectionHeight

        // Calculate visible area of this section
        const visibleTop = Math.max(sectionTop, scrollTop + 100) // 100px offset for sticky header
        const visibleBottom = Math.min(sectionBottom, scrollTop + containerHeight)
        const visibleArea = Math.max(0, visibleBottom - visibleTop)

        // If this section has more visible area, make it active
        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea
          activeSection = tab.id
        }
      })

      setActiveTab(activeSection)
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)
      // Call once to set initial state
      handleScroll()
      return () => contentElement.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLike = () => {
    setLiked(!liked)
    setLikesCount(prev => liked ? prev - 1 : prev + 1)
  }

  return (
    <div className="min-w-[51%] xl:max-w-[51%] h-full bg-white rounded-lg overflow-hidden">
      <div ref={contentRef} className="h-[calc(100vh-96px)] overflow-y-auto no-scrollbar">
        <div className="px-4 pb-4">
          {/* Header */}
          <Link href="/news" className="sticky top-0 py-4  flex items-center  bg-white z-[5] text-[20px] font-semibold gap-2 text-gray-900 hover:text-gray-900 ">
            <ArrowLeft className="w-4 h-4" />
            Portfolio Detail
          </Link>

          {/* Project Title and Price */}
          <div className="mb-6 mt-4 flex  gap-3">
                <Image
                  src="/jamie-parker.png"
                  alt="image"
                  width={40}
                  height={40}
                  className="rounded-full h-[40px] w-[40px] object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Chris Jordan</p>
                  <p className="text-sm text-gray-500">24 April at 12:01 PM</p>
                </div>
              </div>
            <div className="mb-6">
            <h1 className="text-[18px] font-bold text-gray-900 mb-2">Luxury Living Expo 2025 - Mumbai Edition</h1>
            <p className="16px text-gray-600">Welcome to my real estate portfolio showcase. Over the past few years, I've had the privilege of working on diverse residential and commercial—transforming</p>
          </div>

          {/* Project Images - Horizontal Scroll */}
          <div className="mb-6 overflow-hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative flex-shrink-0 w-[80%] aspect-[16/9] rounded-lg overflow-hidden ${
                    currentImageIndex === index ? "" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Project Image ${index + 1}`}
                    fill
                    className="object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

       

          {/* All Content Sections */}

          {/* Description Section */}
          <div ref={descriptionRef} className="space-y-4 mb-6">
        <h3 className="text-gray-900 font-[500]">About This Post:</h3>  
            <p className="text-gray-600 leading-relaxed">
           
Welcome to my real estate portfolio showcase. Over the past few years, I've had the privilege of working on diverse residential and commercial projects—transforming empty lots into thriving living spaces and investment opportunities. This post highlights a few of my key achievements, properties I've handled, and links to explore more about each one. Whether you're looking for inspiration, collaboration, or consultation—this is a glimpse into what I bring to the real estate table.

            </p>

<h3 className="text-gray-900 font-[500]">Achievements at a Glance:</h3>
            <ul className="text-gray-600">
                <li>25+ Projects Completed across Maharashtra, Goa & Gujarat</li>
<li>₹120+ Cr Total Property Value Managed</li>
<li>5+ Premium Villas Sold in 2024 Alone</li>
<li>3 Commercial Spaces Fully Occupied within 3 Months of Launch</li>
<li>Recognized as "Emerging Real Estate Professional of the Year 2023" by UrbanScape Awards</li>
            </ul>
          </div>

           {/* Action Buttons */}
           <div className="         flex items-center justify-between border-t pt-4 no-post-click">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${liked ? "text-red-500" : "text-gray-500"}`}
          >
            <Heart size={20} weight={liked ? "fill" : "regular"} />
            <span className="text-sm flex gap-2">{likesCount} <span className="hidden sm:block">Likes</span></span>
          </button>

          <button className="flex items-center gap-2 text-gray-500">
            <ChatCircle size={20} />
            <span className="text-sm flex gap-2">{comments}<span className="hidden sm:block">Comments</span></span>
          </button>

          <button className="block sm:hidden flex items-center gap-2 text-gray-500">
            <ArrowsLeftRight size={20} />
            <span className="text-sm flex gap-2">{share} <span className="hidden sm:block">Message</span></span>
          </button>
          <button className="flex items-center gap-2 text-gray-500">
            <PaperPlaneTilt size={20} />
            <span className="text-sm flex gap-2">{share} <span className="hidden sm:block">Message</span></span>
          </button>

          <button className="hidden sm:flex items-center gap-2 text-gray-500">
            <ShareFat size={20} />
            <span className="text-sm flex gap-2">{shareout}<span className="hidden sm:block">Share</span></span>
          </button>
        </div>

        <button 
          className="hidden sm:block text-gray-500"
          onClick={(e) => {
            e.stopPropagation()
            setBookmarked(!bookmarked)
          }}
        >
          <BookmarkSimple size={20} weight={bookmarked ? "fill" : "regular"} />
        </button>
        <button className="block sm:hidden flex items-center gap-2 text-gray-500">
            <ShareFat size={20} />
            <span className="text-sm"><span className="hidden sm:block">Share</span></span>
          </button>
      </div>

        </div>
      </div>
    </div>
  )
}

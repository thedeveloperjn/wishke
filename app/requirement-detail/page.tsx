"use client"

import type React from "react"
import Postedby from "@/components/postedby"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  ChatCircle,
  Building,
  ShareNetwork,
  Ruler,
  BookmarkSimple,
  MapPin,
  Buildings,
  Bed,
  Bathtub,
  Wind,
  Car,
  Elevator,
  ShareFat,
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
  DotsThreeVertical,
  PencilSimpleLine,
  EyeSlash,
  Trash,
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
  const [bookmarked, setBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(1000)
  const [activeTab, setActiveTab] = useState("Description")
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Refs for scroll sections
  const descriptionRef = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Mock project data matching the image
  const project = {
    id: projectId,
    title: "Spacious 2BHK Flat",
    priceRange: "₹30,000/Month",
    location: "Mahalaxmi, Mumbai West",
    likes: 1000,
    comments: 24,
    description:
      "Find your new home in Mahalaxmi, Mumbai West! This cozy 2BHK flat is available for ₹30,000 per month. Enjoy a spacious layout in a lively neighborhood with easy access to transport, shops, and eateries. Perfect for families or professionals seeking a comfortable city retreat.",
    specifications: {
      category: "Residential",
      propertyType: "Apartment",
      lookingfor: "Rent",
      bedrooms: "02",
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
      { icon: Clover, name: "Garden" },
      { icon: SecurityCamera, name: "24×7 Security" },
      { icon: Elevator, name: "Fast Elevators" },
      { icon: Warehouse, name: "Covered Parking" },
      { icon: Lightning, name: "EV Charging" },
      { icon: Drop, name: "24×7 Water Supply" },
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

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-w-[51%] xl:max-w-[51%] w-full h-full bg-white rounded-lg overflow-hidden">
      <div ref={contentRef} className="h-[calc(100vh-96px)] overflow-y-auto no-scrollbar">
        <div className="p-6 pt-0">
          {/* Header */}
          <div className="sticky top-0 py-4 flex items-center justify-between w-full bg-white z-[5]">
            <button
              onClick={() => router.back()}
              className="flex items-center text-[20px] font-semibold gap-2 text-gray-900 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Requirement Detail
            </button>
            <div className="relative dropdown-container flex" ref={dropdownRef}>
              <button 
                className="text-muted-foreground hover:text-foreground"
                onClick={toggleDropdown}
              >
                <DotsThreeVertical className="h-10 w-10 hover:bg-gray-100 p-2 rounded-[6px]" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-[8px] bg-white shadow-lg z-10">
                  <div className="py-1 px-4">
                    <button 
                      className="block w-full flex gap-3 py-3 text-[16px] text-gray-500 hover:text-gray-700 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowsLeftRight size={22}/> Matchings
                    </button>
                    <button 
                      className="block w-full flex gap-3 py-3 text-[16px] text-gray-500 hover:text-gray-700 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PencilSimpleLine size={22}/> Edit
                    </button>
                    <button 
                      className="block w-full flex gap-3 py-3 text-[16px] text-gray-500 hover:text-gray-700 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EyeSlash size={22} /> Hide Post
                    </button>
                    <button 
                      className="block w-full flex gap-3 py-3 text-[16px] text-red-500 border-t hover:text-red-500 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash size={22} /> Delete Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Title and Price */}
          <div className="mb-6 mt-4 flex justify-between">
            <div>
              <h1 className="text-[20px] font-bold text-gray-900 mb-2">{project.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin size={16} />
                <span className="text-[16px]">{project.location}</span>
              </div>
            </div>
            <p className="text-[20px] font-bold text-gray-900">{project.priceRange}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
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
                <span className="text-sm flex gap-2">{project.comments} <span className="hidden sm:block">Comments</span></span>
              </button>

              <button className="block sm:hidden flex items-center gap-2 text-gray-500">
                <ArrowsLeftRight size={20} />
                <span className="text-sm flex gap-2">210 <span className="hidden sm:block">Message</span></span>
              </button>

              <button className="flex items-center gap-2 text-gray-500">
                <PaperPlaneTilt size={20} />
                <span className="text-sm flex gap-2">210 <span className="hidden sm:block">Message</span></span>
              </button>

              <button className="hidden sm:flex items-center gap-2 text-gray-500">
                <ShareFat size={20} />
                <span className="text-sm flex gap-2">120 <span className="hidden sm:block">Share</span></span>
              </button>
            </div>

            <div className="flex items-center gap-4">
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

          {/* Sticky Tabs */}
          <div className="sticky top-[60px] bg-white border-b mb-6 z-10">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`pb-3 px-1 w-[25%] border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600 font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => scrollToSection(tab.ref, tab.id)}
                >
                  {tab.id}
                </button>
              ))}
            </div>
          </div>

          {/* All Content Sections */}

          {/* Description Section */}
          <div ref={descriptionRef} className="space-y-4 mb-12">
            <h3 className="text-xl font-semibold border-b pb-4 mb-6 text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Overview Section */}
          <div ref={overviewRef} className="space-y-6 mb-12">
            <h3 className="text-xl font-semibold border-b pb-4 mb-6 text-gray-900">Overview</h3>

            <div className="grid grid-cols-3 gap-6 px-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Buildings size={22} />
                  <span className="text-[16px]">Property Category</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.category}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Buildings size={22} />
                  <span className="text-[16px]">Property Type</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.propertyType}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Bed size={22} />
                  <span className="text-[16px]">Looking for</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.lookingfor}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Bed size={22} />
                  <span className="text-[16px]">Bedrooms</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.bedrooms}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Bathtub size={22} />
                  <span className="text-[16px]">Bathrooms</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.bathrooms}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Couch size={22} />
                  <span className="text-[16px]">Furnishing Type</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.furnishingType}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Ruler size={22} />
                  <span className="text-[16px]">Total Area</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.totalArea}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <ArrowsOut size={22} />
                  <span className="text-[16px]">Buildup Area</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.buildupArea}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <ArrowsOut size={22} />
                  <span className="text-[16px]">Carpet Area</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.carpetArea}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <SunHorizon size={22} />
                  <span className="text-[16px]">Facing</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.facing}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <UsersThree size={22} />
                  <span className="text-[16px]">Preferred Tenant</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.preferredTenant}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <UserCircle size={22} />
                  <span className="text-[16px]">Posted By</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.postedBy}</p>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div ref={amenitiesRef} className="space-y-6 mb-12">
            <h3 className="text-xl font-semibold border-b pb-4 mb-6 text-gray-900">Amenities</h3>
            <div className="grid grid-cols-3 gap-6 px-4">
              {project.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <amenity.icon size={28} className="text-gray-700" />
                  <span className="text-[16px] text-gray-700">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div ref={contactRef} className="space-y-4 mb-12">
            <Postedby
              avatar={project.postedBy.avatar || "/placeholder.svg"}
              name={project.postedBy.name}
              username={project.postedBy.username}
              company={project.postedBy.company}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
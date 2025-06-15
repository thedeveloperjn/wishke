"use client"

import type React from "react"
import Postedby from "./postedby"
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
  DotsThreeVertical,
  ChatTeardropText,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"


interface ProjectDetailContentProps {
  projectId: number
}

export default function ProjectDetailContent({ projectId }: ProjectDetailContentProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("Description")
  const [isScrolled, setIsScrolled] = useState(false)

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
    location: "Malabar Hills, Mumbai",
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
      { icon: ChefHat, name: "Modular Kitchen" },
      { icon: Clover, name: "Garden" },
      { icon: FireExtinguisher, name: "Fire Fighting System" },
      { icon: SecurityCamera, name: "24×7 Security" },
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
    const content = contentRef.current
    if (!content) return

    const handleScroll = () => {
      setIsScrolled(content.scrollTop > 0)

      const container = content
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

    content.addEventListener("scroll", handleScroll)
    // Call once to set initial state
    handleScroll()
    return () => content.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <div
    ref={contentRef}
    className={`flex-1 overflow-y-auto  sm:h-[calc(85vh)] bg-white  no-scrollbar transition-all duration-200  ${
      isScrolled ? "rounded-b-lg" : "rounded-lg"
    }`}
    style={{
      borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
      borderTopRightRadius: isScrolled ? 0 : "0.5rem",
    }}
  >
      <div ref={contentRef} className="flex-1 overflow-y-auto  no-scrollbar">
        <div className="sm:p-6 pt-0">
          {/* Mobile Header */}
          <div className="block sm:hidden fixed top-0 z-[50] w-full bg-white border-b">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
              <h1 className="text-[20px] font-medium">Property Detail</h1>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <DotsThreeVertical size={20} />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden sm:block sticky top-0 z-[50] w-full bg-white border-b mb-4">
            <div className="flex items-center justify-between pb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-[20px] font-semibold text-gray-900 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Property Detail
              </button>
            </div>
          </div>

          {/* Project Title and Price */}
          <div className="mt-[25px] sm:mt-0 p-2 sm:p-0 sm:mb-6 flex justify-between">
            <div>
              <h1 className="text-[18px] sm:text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin size={16} />
                <span className="text-[16px]">{project.location}</span>
              </div>
            </div>
            <p className="text-[18px] sm:text-2xl font-bold text-gray-900">{project.priceRange}</p>
          </div>

          {/* Project Images - Horizontal Scroll */}
          <div className="sm:mb-6 p-2 sm:p-0 overflow-hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative flex-shrink-0 w-[80%] sm:w-[60%] aspect-[16/9] rounded-lg overflow-hidden ${
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

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-6 p-3 sm:p-0 pb-4 sm:pb-4 border-b">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 ${liked ? "text-red-500" : "text-gray-500"}`}
              >
                <Heart size={20} weight={liked ? "fill" : "regular"} />
                <span className="text-sm hidden sm:inline">{liked ? project.likes + 1 : project.likes} Likes</span>
              </button>

              <button className="flex items-center gap-2 text-gray-500">
                <ChatCircle size={20} />
                <span className="text-sm hidden sm:inline">{project.comments} Comments</span>
              </button>

              <button className="flex items-center gap-2 text-gray-500">
                <PaperPlaneTilt size={20} />
                <span className="text-sm hidden sm:inline">Message</span>
              </button>

              <button className="flex items-center gap-2 text-gray-500">
                <ShareFat size={20} />
                <span className="text-sm hidden sm:inline">Share</span>
              </button>
            </div>

            <button className="text-gray-500">
              <BookmarkSimple size={20} />
            </button>
          </div>

          {/* Sticky Tabs */}
          <div className="sticky top-[15px] sm:top-[60px] sm:top-[85px] bg-white border-b mb-6 z-10">
            <div className="flex gap-0 sm:gap-8 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`pb-3 px-3 sm:px-1 whitespace-nowrap border-b-2 transition-colors ${
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
          <div ref={descriptionRef} className="space-y-4 mb-12 px-4 sm:px-0">
            <h3 className="text-xl font-semibold border-b pb-4 mb-6 text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Overview Section */}
          <div ref={overviewRef} className="space-y-6 mb-12 px-4 sm:px-0">
            <h3 className="text-xl font-semibold border-b pb-4 mb-6 text-gray-900">Overview</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 px-0 sm:px-4">
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
                  <Wind size={22} />
                  <span className="text-[16px]">Balcony</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.balcony}</p>
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
                  <SunHorizon size={22} />
                  <span className="text-[16px]">Facing</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.facing}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <SunHorizon size={22} />
                  <span className="text-[16px]">Property Status</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.propertyStatus}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <CarSimple size={22} />
                  <span className="text-[16px]">Car Parking</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.carParking}</p>
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
                  <Building size={22} />
                  <span className="text-[16px]">Total Floors</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.totalFloors}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <BuildingOffice size={22} />
                  <span className="text-[16px]">Available Floor</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.availableFloor}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <ClockCountdown size={22} />
                  <span className="text-[16px]">Age of Property</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.ageOfProperty}</p>
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
                  <Person size={22} />
                  <span className="text-[16px]">Gender Preference</span>
                </div>
                <p className="font-[500] text-[16px]">{project.specifications.genderPreference}</p>
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
          <div ref={amenitiesRef} className="space-y-6 mb-12 px-4 sm:px-0">
            <h3 className="text-xl font-semibold border-b pb-4 mb-6 text-gray-900">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 px-0 sm:px-4">
              {project.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <amenity.icon size={28} className="text-gray-700" />
                  <span className="text-[16px] text-gray-700">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Section */}
          <div ref={highlightsRef} className="space-y-6 mb-12 px-4 sm:px-0">
            <h3 className="text-xl font-semibold border-b pb-4 mb-6 text-gray-900">Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 px-0 sm:px-4">
                  <CheckCircle size={24} className="text-[#01A76F]" weight="fill" />
                  <span className="text-[16px] text-gray-900">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div ref={contactRef} className="space-y-4 mb-12 px-4 sm:px-0">
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
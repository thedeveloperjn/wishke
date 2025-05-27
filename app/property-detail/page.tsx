"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  FileText,
  Home,
  User,
  PlayCircle,
  CheckCircle,
  MapPin,
  Calendar,
  Building2,
  Users,
  DollarSign,
  Star,
} from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"

export default function PropertyDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("description")
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(16)
  const [isSticky, setIsSticky] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    const element = document.getElementById(tabId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const tabsElement = document.getElementById("tabs-container")
      if (tabsElement) {
        const rect = tabsElement.getBoundingClientRect()
        setIsSticky(rect.top <= 0)
      }

      // Update active tab based on scroll position
      const sections = ["description", "overview", "amenities", "highlights", "contact"]
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(sectionId)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 p-4 gap-4 overflow-hidden no-scrollbar">
        <Sidebar />

        <main className="flex-1 overflow-y-auto h-[calc(100vh-96px)] no-scrollbar bg-white shadow-sm rounded-lg">
          <div className="p-4">
            {/* Back button */}
            <div className="mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            </div>

            {/* Property header */}
            <div className="pb-4">
              <h1 className="text-xl font-bold">5BHK Residential-Bungalow</h1>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Malabar Hill, Mumbai
                </span>
                <span className="ml-auto font-bold text-base">₹1.7L per Month</span>
              </div>
            </div>

            {/* Property image */}
            <div className="relative w-full h-[300px]">
              <Image
                src="/luxury-bungalow-pool.png"
                alt="5BHK Residential-Bungalow"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-black bg-opacity-50 rounded-full p-3 text-white">
                  <PlayCircle className="h-10 w-10" />
                </button>
              </div>
            </div>

            {/* Actions bar */}
            <div className="flex justify-between items-center py-4 border-b">
              <div className="flex space-x-5">
                <button
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="text-sm">{likesCount}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">24</span>
                </button>
              </div>
              <div className="flex space-x-4">
                <button className="text-muted-foreground hover:text-foreground">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div id="tabs-container" className={`bg-white ${isSticky ? "fixed top-0 left-0 right-0 z-[100] shadow-md" : ""}`}>
              <div className="flex gap-8 border-b max-w-[1200px] mx-auto px-4">
                {["description", "overview", "amenities", "highlights", "contact"].map((tabId) => (
                  <button
                    key={tabId}
                    onClick={() => handleTabClick(tabId)}
                    className={`py-4 text-[16px] font-medium border-b-2 transition-colors ${
                      activeTab === tabId
                        ? "border-purple-500 text-purple-500"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tabId.charAt(0).toUpperCase() + tabId.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Add a placeholder div to prevent content jump when tabs become fixed */}
            {isSticky && <div className="h-[57px]"></div>}

            {/* Content Sections */}
            <div className="space-y-8 py-6">
              {/* Description Section */}
              <section id="description" className="space-y-6">
                <h2 className="text-[16px] font-bold">Description</h2>
                <p className="text-[16px] text-muted-foreground">
                  This plot is situated in Andheri, Mumbai, making it a prime choice for residential living. Nestled
                  within a secure gated community, it provides a safe and thoughtfully designed environment for
                  families. The location offers excellent connectivity to key landmarks and attractions in the bustling
                  city. Key amenities such as shopping malls, hospitals, and parks are just a short distance away,
                  promoting a convenient lifestyle for residents. This 5BHK flat is available at an attractive price
                  point, making it a compelling option for discriminating buyers seeking luxurious accommodations in
                  this vibrant area of Mumbai.
                </p>
              </section>

              {/* Overview Section */}
              <section id="overview" className="space-y-6">
                <h2 className="text-[16px] font-bold">Overview</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <Home className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Property Type</p>
                      <p className="text-sm font-medium">Apartment</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 5V19M21 5V19M3 12H21M6 5H18M6 19H18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                      <p className="text-sm font-medium">05</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 10V18M3 14H21M21 10V18M7 10V6C7 4.89543 7.89543 4 9 4H15C16.1046 4 17 4.89543 17 6V10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                      <p className="text-sm font-medium">03</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 9H2M22 9V15C22 18.3137 19.3137 21 16 21H8C4.68629 21 2 18.3137 2 15V9M22 9C22 5.68629 19.3137 3 16 3H8C4.68629 3 2 5.68629 2 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Balcony</p>
                      <p className="text-sm font-medium">02</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 11V5C9 3.89543 9.89543 3 11 3H21C22.1046 3 23 3.89543 23 5V19C23 20.1046 22.1046 21 21 21H11C9.89543 21 9 20.1046 9 19V17M9 11H5M9 11C7.89543 11 7 11.8954 7 13C7 14.1046 7.89543 15 9 15H13M16 15L13 18M13 12L16 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Furnishing Type</p>
                      <p className="text-sm font-medium">Semi Furnished</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999C12.6327 21.681 11.3677 21.6814 10.5866 20.9003L7.34375 17.6575M5 15.3137L8.24264 12.0711C9.02354 11.2902 9.02354 10.0244 8.24264 9.24353L6.82843 7.82932C6.04753 7.04842 4.78178 7.04842 4.00088 7.82932L2.58667 9.24353C1.80577 10.0244 1.80577 11.2902 2.58667 12.0711L5 14.4844"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.0707 7.07072L19.8991 9.89916C20.6802 10.6802 20.6802 11.9459 19.8991 12.727L18.4854 14.1407C17.7045 14.9216 16.4387 14.9216 15.6578 14.1407L14.2436 12.7265C13.4627 11.9456 13.4627 10.6798 14.2436 9.89893L15.6573 8.48522C16.4382 7.70432 17.7039 7.70432 18.4848 8.48522"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Facing</p>
                      <p className="text-sm font-medium">East</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Property Status</p>
                      <p className="text-sm font-medium">Ready to Move</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L2 9L2 21H6V9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 9H10V21H14V9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 9H18V21H22V9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V9H5V5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Car Parking</p>
                      <p className="text-sm font-medium">02</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 col-span-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Area</p>
                      <p className="text-sm font-medium">3200 sq ft</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 11V14M9 17L12 14L15 17M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7M3 7L12 13L21 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Buildup Area</p>
                      <p className="text-sm font-medium">2700 sq ft</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Carpet Area</p>
                      <p className="text-sm font-medium">3200 sq ft</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 17H15M12 12V17M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Floors</p>
                      <p className="text-sm font-medium">10</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 14L12 7L5 14M5 21H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Available Floor</p>
                      <p className="text-sm font-medium">06</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Age of Property</p>
                      <p className="text-sm font-medium">New</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Preferred Tenant</p>
                      <p className="text-sm font-medium">Anyone</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gender Preference</p>
                      <p className="text-sm font-medium">Anyone</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 10L11 14L9 12M12 3L9 9H3L7.5 13.5L6 21L12 17.25L18 21L16.5 13.5L21 9H15L12 3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Posted By</p>
                      <p className="text-sm font-medium">Owner</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Amenities Section */}
              <section id="amenities" className="space-y-6">
                <h2 className="text-[16px] font-bold">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 10V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V10M3 10V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V10M3 10H21M16 14H18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span>Modular Kitchen</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22V18M12 6V2M6 12H2M22 12H18M19.0781 19.0781L16.25 16.25M19.0781 4.92188L16.25 7.75M4.92188 19.0781L7.75 16.25M4.92188 4.92188L7.75 7.75"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Garden</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 12H20M4 12H6M12 6V4M12 20V18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Fire Fighting System</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 6L13 6M4 10L13 10M4 14H11M4 18H11M15 10.5V20.5M15 20.5L19 16.5M15 20.5L11 16.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>24x7 Security</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 14C8 14 9 15 12 15C15 15 16 14 16 14M19 10H5M21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Fast Elevators</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 9H13.764C14.4888 9 15.1004 9.53339 15.1963 10.2449L16.1648 17.2449C16.2787 18.0967 15.6481 18.8723 14.7962 18.9861C14.7322 18.9954 14.6679 19 14.6036 19H5.39635C4.54211 19 3.84635 18.3043 3.84635 17.45C3.84635 17.3858 3.85094 17.3215 3.86013 17.2575L4.82864 10.2575C4.92456 9.546 5.53585 9.01262 6.26018 9.01262L7 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 9V6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6V9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 20V22M16 9V6C16 4.34315 17.3431 3 19 3C20.6569 3 22 4.34315 22 6V10C22 11.6569 20.6569 13 19 13H17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Power Backup</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 10V16M12 10L9 13M12 10L15 13M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Covered Parking</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11 7.5H13V16.5H11V7.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 8L19 12L15 16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 16L5 12L9 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>EV Charging</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 14C20 17.3137 16.4183 20 12 20C7.58172 20 4 17.3137 4 14M20 10C20 13.3137 16.4183 16 12 16C7.58172 16 4 13.3137 4 10M20 6C20 9.31371 16.4183 12 12 12C7.58172 12 4 9.31371 4 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>24x7 Water Supply</span>
                  </div>
                </div>
              </section>

              {/* Highlights Section */}
              <section id="highlights" className="space-y-6">
                <h2 className="text-[16px] font-bold">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5 minutes from Indore Bus Stand</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5 minutes from Indore Bus Stand</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5 minutes from Indore Bus Stand</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5 minutes from Indore Bus Stand</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5 minutes from Indore Bus Stand</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5 minutes from Indore Bus Stand</span>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="space-y-6">
                <h2 className="text-[16px] font-bold">Contact</h2>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image src="/diverse-group-profile.png" alt="Malvika Willson" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-lg">Malvika Willson</h4>
                        <span className="text-gray-500 text-sm ml-2">@malvikawill</span>
                      </div>
                      <p className="text-sm text-gray-600">Real State Agency</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold mb-3 text-center">Contact Owner for More Details</h3>
                  <p className="text-center text-sm text-gray-500 mb-4">Get in touch with the owner</p>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-purple-600 text-white py-3 rounded-md flex items-center justify-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22 16.92V19.84C22 20.36 21.5 20.8 20.9 20.8C10.44 20.8 2 12.36 2 1.9C2 1.4 2.43 0.9 2.96 0.9H5.87C6.4 0.9 6.83 1.33 6.83 1.86C6.83 3.38 7.1 4.86 7.62 6.21C7.77 6.64 7.66 7.13 7.3 7.42L5.9 8.53C7.38 11.53 9.69 13.95 12.69 15.43L13.76 14.01C14.07 13.65 14.57 13.53 15 13.7C16.36 14.21 17.84 14.47 19.35 14.47C19.87 14.47 20.3 14.9 20.3 15.43"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Contact
                    </button>
                    <button className="flex-1 border border-purple-600 text-purple-600 py-3 rounded-md flex items-center justify-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 10H8.01M12 10H12.01M16 10H16.01M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8C21 6.89543 20.1046 6 19 6H8L3 1V5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Message
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        <MessagesSidebar />
      </div>
    </div>
  )
}

"use client"

import { Search, Bell, MessageCircle, Settings, Filter, Clock, Calendar, TrendingUp, X, Bookmark ,ChevronDown, UserCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Gear, UserCircleIcon } from "@phosphor-icons/react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import LoginModal from "./login-modal"
import Link from "next/link"
export default function Header() {
  const [isClient, setIsClient] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [activeNotificationTab, setActiveNotificationTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const savedRef = useRef<HTMLDivElement>(null)
  const router = useRouter()


  const handleProfileMouseEnter = () => {
    setShowProfileDropdown(true)
  }

  const handleProfileMouseLeave = () => {
    setShowProfileDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])



  useEffect(() => {
    setIsClient(true)
  }, [])
 
   
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (savedRef.current && !savedRef.current.contains(event.target as Node)) {
        setShowSaved(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const recentSearches = ["malabar hill", "3bhk flat", "bungalow adheri east", "independent house in mumbai"]

  const events = [
    {
      title: "Realtors: 17 Ways To Generate New Business",
      date: "12 May 2025",
    },
    {
      title: "Builders causing delays in Mumbai's redevelopment...",
      date: "20 May 2025",
    },
  ]

  const trending = [
    "A rise in property prices in luxury segments - Malabar East",
    "Builders causing delays in Mumbai's redevelopment will face co...",
    "Mumbai: MHADA cuts RR charges for additional",
  ]

  const notifications = [
    {
      id: 1,
      type: "chat_request",
      user: "Sam Taylor",
      avatar: "/imagesstatic/1.jpg",
      message: "has accepted your chat request.",
      time: "Just now",
      isNew: true,
    },
    {
      id: 2,
      type: "friend_request",
      user: "Jessica Lee",
      avatar: "/imagesstatic/2.jpg",
      message: "sent you a friend request.",
      subtext: "Subtext for any notification",
      time: "5 min ago",
      isNew: true,
      hasActions: true,
    },
    {
      id: 3,
      type: "chat_request",
      user: "Arjun Patel",
      avatar: "/imagesstatic/3.jpg",
      initial: "A",
      message: "has accepted your chat request",
      subtext: "Subtext for any notification",
      time: "2 hours ago",
      isNew: false,
    },
    {
      id: 4,
      type: "news",
      user: "Real estate update",
      initial: "A",
      message: "[News Headline].",
      subtext: "Subtext for any notification",
      time: "3:15 PM",
      isNew: false,
      isYesterday: true,
    },
    {
      id: 5,
      type: "friend_request",
      user: "Jessica Lee",
      avatar: "/imagesstatic/5.jpg",
      message: "sent you a friend request.",
      subtext: "Subtext for any notification",
      time: "Yesterday",
      isNew: false,
      isYesterday: true,
    },
  ]

  const savedProperties = [
    {
      id: 1,
      title: "Luxury Villa in Bandra",
      price: "₹2.5 Cr",
      location: "Bandra West, Mumbai",
      type: "Villa",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 2,
      title: "3BHK Apartment",
      price: "₹1.8 Cr",
      location: "Andheri East, Mumbai",
      type: "Apartment",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 3,
      title: "Commercial Space",
      price: "₹5.2 Cr",
      location: "Lower Parel, Mumbai",
      type: "Commercial",
      image: "/placeholder.svg?height=60&width=80",
    },
  ]

  const removeRecentSearch = (index: number) => {
    // Logic to remove recent search
  }

  const handlePropertyClick = (propertyId: number) => {
    router.push(`/properties/${propertyId}`)
    setShowSaved(false)
  }

  const handleNotificationAction = (action: string, notificationId: number) => {
    // Handle notification actions
    console.log(`${action} notification ${notificationId}`)
  }


 
      
    
  return (

<header className="sticky top-0 z-50 flex h-[85px] items-center justify-between bg-white px-4 md:px-6">
      <div className="container flex h-16 items-center justify-between px-4">
      {/* <div className="w-[60%] flex h-[85px] items-center justify-between  bg-white px-4 md:px-6"> */}
      <div className="hidden sm:flex items-center z-[80] gap-2">
        <Image src="/whiskelogo.svg" alt="WISHKE Logo" width={160} height={60} />
      </div>

    
        {/* Search Bar */}
        <div className=" hidden flex-1 max-w-[570px] px-4 md:block" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full !py-6  rounded-[8px] !text-[16px] !border-none !bg-[#F8F8FA] pl-12"
              suppressHydrationWarning={true}
              key={isClient ? "client" : "server"}
            />
           
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full  mt-2 bg-white rounded-lg shadow-lg border p-4 w-full max-w-[546px] max-h-auto overflow-y-auto">
              {/* Recent Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Recent</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">Clear</button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3 p-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-[14px] text-gray-700">{search}</span>
                      </div>
                      <button
                        onClick={() => removeRecentSearch(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Events</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">See All</button>
                </div>
                <div className="space-y-3">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 p-2">
                      <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="flex justify-between">
                        <p className="text-[14px] text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Trending</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">See All</button>
                </div>
                <div className="space-y-3">
                  {trending.map((trend, index) => (
                    <div key={index} className="flex items-start gap-3 p-2">
                      <TrendingUp className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-[14px] text-gray-700 flex-1">{trend}</p>
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
              suppressHydrationWarning={true}
            >
             <Bell className="h-6 w-6 text-muted-foreground" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs">15</Badge>
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border max-h-[100vh] overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-6">
                    {["All", "Requests", "My Posts", "Mentions"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveNotificationTab(tab)}
                        className={`text-sm pb-2 border-b-2 transition-colors ${
                          activeNotificationTab === tab
                            ? "text-purple-600 border-purple-600"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                    <Filter className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {/* Today Section */}
                  <div className="p-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">TODAY</h4>
                    <div className="space-y-4">
                      {notifications
                        .filter((n) => !n.isYesterday)
                        .map((notification) => (
                          <div key={notification.id} className="flex items-start gap-3">
                            <div className="relative">
                              {notification.avatar ? (
                                <Image
                                  src={notification.avatar || "/placeholder.svg"}
                                  alt={notification.user}
                                  width={40}
                                  height={40}
                                  className="rounded-full h-[40px] w-[40px] object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-sm font-medium">{notification.initial}</span>
                                </div>
                              )}
                              {notification.isNew && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">
                                <span className="font-medium">{notification.user}</span> {notification.message}
                              </p>
                              {notification.subtext && (
                                <p className="text-xs text-gray-500 mt-1">{notification.subtext}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>

                              {notification.hasActions && (
                                <div className="flex gap-2 mt-2">
                                  <button
                                    onClick={() => handleNotificationAction("decline", notification.id)}
                                    className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50"
                                  >
                                    Decline
                                  </button>
                                  <button
                                    onClick={() => handleNotificationAction("accept", notification.id)}
                                    className="px-3 py-1 text-xs bg-purple-600 text-white rounded-full hover:bg-purple-700"
                                  >
                                    Accept
                                  </button>
                                </div>
                              )}

                              {!notification.hasActions && !notification.isNew && (
                                <button
                                  onClick={() => handleNotificationAction("view", notification.id)}
                                  className="mt-2 px-3 py-1 text-xs border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50"
                                >
                                  View
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Yesterday Section */}
                  <div className="p-4 border-t">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">YESTERDAY</h4>
                    <div className="space-y-4">
                      {notifications
                        .filter((n) => n.isYesterday)
                        .map((notification) => (
                          <div key={notification.id} className="flex items-start gap-3">
                            <div className="relative">
                              {notification.avatar ? (
                                <Image
                                  src={notification.avatar || "/placeholder.svg"}
                                  alt={notification.user}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-sm font-medium">{notification.initial}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">
                                <span className="font-medium">{notification.user}</span> {notification.message}
                              </p>
                              {notification.subtext && (
                                <p className="text-xs text-gray-500 mt-1">{notification.subtext}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>

                              <button
                                onClick={() => handleNotificationAction("view", notification.id)}
                                className="mt-2 px-3 py-1 text-xs border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

         
          {/* Saved Properties */}
          <div className="relative hidden sm:block " ref={savedRef}>
            <Button variant="ghost" size="sm" onClick={() => setShowSaved(!showSaved)} suppressHydrationWarning={true}>
              
        <Bookmark className="h-6 w-6 text-muted-foreground" />
            </Button>

            {/* Saved Dropdown */}
            {showSaved && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border max-h-96 overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Saved Properties</h3>
                    <button onClick={() => setShowSaved(false)}>
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {savedProperties.map((property) => (
                      <div
                        key={property.id}
                        onClick={() => handlePropertyClick(property.id)}
                        className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          width={80}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{property.title}</h4>
                          <p className="text-sm font-semibold text-green-600 mt-1">{property.price}</p>
                          <p className="text-xs text-gray-500 mt-1">{property.location}</p>
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded mt-2">
                            {property.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t">
                    <button
                      onClick={() => router.push("/saved-properties")}
                      className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View All Saved Properties
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          

          <div
          className="relative"
          ref={profileDropdownRef}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <Link href="/profile">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowLoginModal(true)}
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src="/imagesstatic/malvika.jpg" alt="Profile" fill className="object-cover" />
              </div>
              <div className="hidden md:block">
                <span className="text-sm font-medium">Malvika Willson</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block " />
            </div>
          </Link>
          {showProfileDropdown && (
            <div className="absolute right-0  w-56 rounded-[8px] bg-white shadow-lg z-10">
              <div className="py-1">
              <button
                  className="block w-full py-3 gap-3 flex text-[16px] text-gray-500 px-4 hover:bg-green-50 text-left"
                  onClick={() => {
                    setShowProfileDropdown(false)
                    setShowLoginModal(true)
                  }}
                >
                <UserCircleIcon weight="fill" fill="black"  color="black" size={22}/>  Login/Signup
                </button>
                <Link href="/profile">
                  <button
                    className="block w-full py-3 gap-3  px-4 flex text-[16px] text-gray-500  hover:bg-green-50 text-left"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                   <UserCircleIcon size={22}/> Profile
                  </button>
                </Link>
                
                <button
                  className="block w-full py-3 gap-3 flex text-[16px] text-gray-500 px-4 hover:bg-green-50 text-left"
                 
                >
                  <Gear size={22} /> Account Setting
                </button>
                
              </div>
            </div>
          )}
        </div>
        
      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </div>
      </div>
    </header>
  )
}

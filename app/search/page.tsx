"use client"

import { useState, useRef, useEffect } from "react"
import { MagnifyingGlass, ArrowLeft, X, Clock, Calendar, TrendUp } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { CalendarDots } from "@phosphor-icons/react/dist/ssr"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(true)
  const searchRef = useRef<HTMLDivElement>(null)

  // Mock recent searches
  const recentSearches = [
    "2BHK in Mumbai",
    "Apartment for rent",
    "Commercial property",
    "Villa in Pune"
  ]

  // Mock events
  const events = [
    { title: "Property Expo 2024", date: "Mar 15" },
    { title: "Real Estate Summit", date: "Mar 20" },
    { title: "Investment Workshop", date: "Mar 25" }
  ]

  // Mock trending searches
  const trending = [
    "Luxury apartments in Mumbai",
    "Commercial properties",
    "New project launches",
    "Investment opportunities"
  ]

  const removeRecentSearch = (index: number) => {
    // Implement remove functionality
    console.log("Remove search at index:", index)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowDropdown(false)
    // Implement search functionality here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowDropdown(true)
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="h-screen bg-white flex flex-col w-full overflow-hidden">
      {/* Fixed Search Bar */}
      <div className="fixed top-[0px] left-0 right-0 bg-white border-b z-[50]">
        <div className="flex items-center gap-2 p-4 w-full">
          <button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.back()
            }} 
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="relative flex-1 w-full" ref={searchRef}>
            <div className="relative w-full">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search properties, requirements..."
                value={searchQuery}
                onChange={handleInputChange}
                onClick={handleInputClick}
                className="pl-10 pr-10 py-4 text-[16px] bg-gray-100 !border-0 w-full"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSearchQuery("")
                    setShowDropdown(true)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full pb-16">
        <div className="w-full">
          {/* Recent Section */}
          <div className="py-6 border-b px-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Recent</h3>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Clear recent searches
                }} 
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSearch(search)
                  }}
                  className="flex items-center justify-between group w-full"
                >
                  <div className="flex items-center gap-3 p-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-[14px] text-gray-700">{search}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removeRecentSearch(index)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </button>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div className="py-6 border-b px-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Events</h3>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Handle see all events
                }} 
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                See All
              </button>
            </div>
            <div className="space-y-3">
              {events.map((event, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSearch(event.title)
                  }}
                  className="flex items-start gap-3 p-2 w-full"
                >
                  <CalendarDots size={24} className="text-gray-400 mt-0.5" />
                  <div className="flex justify-between w-full">
                    <p className="text-[14px] text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Section */}
          <div className="py-6 px-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Trending</h3>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Handle see all trending
                }} 
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                See All
              </button>
            </div>
            <div className="space-y-3">
              {trending.map((trend, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSearch(trend)
                  }}
                  className="flex items-start gap-3 p-2 w-full"
                >
                  <TrendUp className="h-4 w-4 text-gray-400 mt-0.5" />
                  <p className="text-[14px] text-gray-700 flex-1">{trend}</p>
                  <TrendUp className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
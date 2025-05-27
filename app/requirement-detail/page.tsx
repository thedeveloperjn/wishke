"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, MessageCircle, Share2, Map, Home, CheckCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"

export default function RequirementDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("description")
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(16)

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

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

            {/* Requirement header */}
            <div className="pb-4">
              <h1 className="text-xl font-bold">Looking for 2/3 BHK Apartment</h1>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span className="flex items-center">
                  <Map className="h-4 w-4 mr-1" />
                  Bandra, Juhu, or Andheri
                </span>
                <span className="ml-auto font-medium text-base">₹50K - 80K per Month</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex border-b pb-4 mb-4">
              <div className="flex gap-4">
                <button
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="text-sm">{likesCount} Likes</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">24 Comments</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 bg-white border-b h-auto p-0">
                <TabsTrigger
                  value="description"
                  className={`py-3 border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none`}
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="overview"
                  className={`py-3 border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none`}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className={`py-3 border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none`}
                >
                  Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-4">
                <h3 className="font-bold mb-3">Description</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm looking for a well-maintained apartment in a good locality with 24/7 security, covered parking,
                  and modern amenities. Prefer a family-friendly community with easy access to schools, hospitals, and
                  shopping centers. The apartment should have good ventilation and natural light. Looking for a
                  long-term rental agreement with a reputable owner or property manager.
                </p>
              </TabsContent>

              <TabsContent value="overview" className="p-4">
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-100 mb-6">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Property Type:</span>
                      <span className="text-sm">2/3 BHK Apartment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Budget Range:</span>
                      <span className="text-sm">₹50K - 80K per Month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Preferred Areas:</span>
                      <span className="text-sm">Bandra, Juhu, or Andheri</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Move-in Timeline:</span>
                      <span className="text-sm">Within 2 months</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold mb-3">Overview</h3>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Property Category</span>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">Residential</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Property Type</span>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 21H7C4.79086 21 3 19.2091 3 17V8.5L12 2L21 8.5V17C21 19.2091 19.2091 21 17 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm font-medium">Apartment</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Looking For</span>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 9V7C14 5.89543 13.1046 5 12 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H12C13.1046 19 14 18.1046 14 17V15M9 12H20M20 12L17 9M20 12L17 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm font-medium">Rent</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Bedrooms</span>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
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
                      <span className="text-sm font-medium">2-3</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Bathrooms</span>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
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
                      <span className="text-sm font-medium">2</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Furnishing Type</span>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
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
                      <span className="text-sm font-medium">Semi Furnished</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold mb-3">Required Amenities</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">24x7 Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Covered Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Power Backup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Lift Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Children's Play Area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Gym</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="p-4">
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Posted by</h3>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image src="/alex-carter.png" alt="Alex Carter" fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-bold text-lg">Alex Carter</h4>
                          <span className="text-gray-500 text-sm ml-2">@alexcarter</span>
                        </div>
                        <p className="text-sm text-gray-600">Looking for property</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-3 text-center">Contact Member for More Details</h3>
                  <p className="text-center text-sm text-gray-600 mb-4">Get in touch with the requester</p>

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path
                          d="M22 16.92V19.84C22 20.36 21.5 20.8 20.9 20.8C10.44 20.8 2 12.36 2 1.9C2 1.4 2.43 0.9 2.96 0.9H5.87C6.4 0.9 6.83 1.33 6.83 1.86C6.83 3.38 7.1 4.86 7.62 6.21C7.77 6.64 7.66 7.13 7.3 7.42L5.9 8.53C7.38 11.53 9.69 13.95 12.69 15.43L13.76 14.01C14.07 13.65 14.57 13.53 15 13.7C16.36 14.21 17.84 14.47 19.35 14.47C19.87 14.47 20.3 14.9 20.3 15.43"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Contact
                    </Button>
                    <Button variant="outline" className="flex-1 border-orange-500 text-orange-500">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path
                          d="M8 10H8.01M12 10H12.01M16 10H16.01M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8C21 6.89543 20.1046 6 19 6H8L3 1V5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Message
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <MessagesSidebar />
      </div>
    </div>
  )
}

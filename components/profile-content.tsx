"use client"

import { useState ,useEffect, useRef } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, MapPin, Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PencilSimpleLine, SealCheck } from "@phosphor-icons/react/dist/ssr"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PropertyPost from "./property-post"
import RequirementPost from "./requirement-post"
import { useRouter } from "next/navigation"
import ProfileReelsSection from "./profile-reel-section"
import DynamicReels from "./dynamicreels"
export default function ProfileContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("posts")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const profileData = {
    id: 1,
    name: "Malvika Wilson",
    username: "@malvikawill",
    location: "Mumbai, India",
    bio: "Adventurer | Coffee Lover | Tech Enthusiast | Sharing my journey one post at a time!",
    stats: {
      posts: 32,
      followers: "1.2k",
      following: 500,
    },
    avatar: "/placeholder.svg?height=120&width=120&query=malvika profile",
    coverImage: "/placeholder.svg?height=200&width=800&query=gradient background",
  }

   const reelsData: ReelData[] = [
    {
      id: 1,
      user: { name: "Malvika Wilson", image: "/imagesstatic/malvika.jpg" ,id:"@malvikawilson"},
      videoUrl: "/property-1.mp4",
      thumbnailUrl: "/luxury-lobby.png",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      likes: 9900,
      comments: 451,
      shares: 10,
    },
    {
      id: 2,
      user: { name: "Malvika Wilson", image: "/imagesstatic/malvika.jpg" ,id:"@malvikawilson"},
      videoUrl: "/property-2.mp4",
      thumbnailUrl: "/luxury-bungalow-pool.png",
      caption: "Check out this amazing property in downtown!",
      likes: 5600,
      comments: 230,
      shares: 45,
    },
    {
      id: 3,
      user: { name: "Malvika Wilson", image: "/imagesstatic/malvika.jpg" ,id:"@malvikawilson"},
      videoUrl: "/property-3.mp4",
      thumbnailUrl: "/luxury-tower-pool.png",
      caption: "Luxury living at its finest. 5 bedrooms, pool, views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    // Add more reels as needed
  ]

  const comments = [
    {
      id: 1,
      postTitle: "Beautiful 2BHK in Bandra",
      comment: "This looks amazing! Is it still available?",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      postTitle: "Investment Tips for 2024",
      comment: "Great insights! Thanks for sharing.",
      timestamp: "1 week ago",
    },
  ]

  const likes = [
    {
      id: 1,
      postTitle: "Modern Architecture Trends",
      author: "Alex Carter",
      timestamp: "3 days ago",
    },
    {
      id: 2,
      postTitle: "Mumbai Property Market Update",
      author: "Jordan Lee",
      timestamp: "1 week ago",
    },
  ]

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <div className="space-y-2 sm:space-y-6">
             
             <RequirementPost
        title="Looking for 2/3 BHK Apartment"
        budget="₹50K - 80K per Month"
        location="Bandra, Juhu, or Andheri"
        description="I'm looking for a well-maintained apartment in a good locality with 24/7 security, covered parking, and modern amenities. Prefer a family-friendly community."
        timestamp="25 April at 9:42 AM"
        authorName="Malvika Wilson"
        authorImage="/imagesstatic/malvika.jpg"
        likes={32}
        comments={18}
        userProfileUrl="/profile"
      />

      <PropertyPost
        type="property"
        title="3BHK Residential-Flat"
        location="Andheri, Mumbai"
        price="₹75K per Month"
        description="Discover your dream home in the heart of Andheri, Mumbai! This stunning 3BHK flat is located in a secure gated community with modern amenities and spacious rooms."
        timestamp="23 April at 10:23 AM"
        authorName="Malvika Wilson"
        authorImage="/imagesstatic/malvika.jpg"
        images={[{ type: "image", url: "/modern-apartment-exterior.png" }]}
        likes={654}
        comments={122}
        userProfileUrl="/profile"
      />

      {/* Project post with multiple images */}
      <PropertyPost
      type="project"
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
  
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        price="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
         authorName="Malvika Wilson"
        authorImage="/imagesstatic/malvika.jpg"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
        userProfileUrl="/profile"
      />



     
          </div>
        )

      case "reels":
        return <DynamicReels reels={reelsData} />

      case "comments":
        return (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Image
                      src={profileData.avatar || "/placeholder.svg"}
                      alt={profileData.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{comment.postTitle}</p>
                      <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">{comment.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "likes":
        return (
          <div className="space-y-4">
            {likes.map((like) => (
              <Card key={like.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-red-500 fill-current" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{like.postTitle}</p>
                      <p className="text-xs text-gray-500">
                        by {like.author} • {like.timestamp}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      default:
        return null
    }
  }  
  const contentRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFilter, setShowFilter] = useState(false)


  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const handleScroll = () => {
      setIsScrolled(content.scrollTop > 0)
    }

    content.addEventListener("scroll", handleScroll)
    return () => content.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={contentRef}
      className={`flex-1 overflow-y-auto h-[94vh] sm:h-[calc(85vh)] pb-6 no-scrollbar transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="flex items-center gap-3  bg-white  p-0 sm:p-4 pb-0">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-[24px] font-semibold">{profileData.name}&apos;s Profile</span>
      </div>
          
      {/* Profile Header */}
      <div className="relative bg-white p-3 sm:p-4 rounded-[12px]  pb-8">
    

        <div className="h-36 md:h-48 bg-gradient-to-r from-[#C8FAD6] to-[#F2DEFF] rounded-lg relative overflow-hidden">
        
          
        </div>

        {/* Profile Info */}
        <div className="relative -mt-16 ml-6">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Image
                src="/imagesstatic/malvika.jpg"
                alt={profileData.name}
                width={150}
                height={150}
                className="rounded-full h-[110px] w-[110px] sm:h-[150px] sm:w-[150px] object-cover  border-4 border-white"
                priority
              />
  
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                
                <div className=" flex items-center justify-center">
                  <SealCheck size={22} weight="fill" className="text-green-500" />
                </div>
              </div>
              <Button
            onClick={handleEditProfile}
            className="absolute top-[72px] sm:top-20 right-0 sm:right-4 gap-2 bg-white text-[16px] text-purple-600 hover:bg-white border-[2px] border-purple-500"
            size="lg"
            suppressHydrationWarning={true}
          >
            <PencilSimpleLine size={22}/>
            Edit Profile
          </Button>
              <div className="flex items-center gap-2 text-gray-600 mb-0 sm:mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profileData.location}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{profileData.username}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-bold">{profileData.stats.posts}</span>
                  <span className="text-gray-600 ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-bold">{profileData.stats.followers}</span>
                  <span className="text-gray-600 ml-1">followers</span>
                </div>
                <div>
                  <span className="font-bold">{profileData.stats.following}</span>
                  <span className="text-gray-600 ml-1">following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 ml-2">
            <p className="text-gray-700">{profileData.bio}</p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="border-b bg-white mb-0 sm:mb-6 px-4">
        <div className="flex relative">
          {/* Animated underline - moved before the buttons for proper layering */}
          <div 
            className="absolute bottom-0 h-[2px] bg-gray-900 sm:bg-purple-500 transition-all duration-300 ease-in-out z-10"
            style={{
              width: '25%',
              transform: `translateX(${['posts', 'reels', 'comments', 'likes'].indexOf(activeTab) * 100}%)`
            }}
          />
          {[
            { id: "posts", label: "Posts" },
            { id: "reels", label: "Reels" },
            { id: "comments", label: "Comments" },
            { id: "likes", label: "Likes" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`pb-3 px-1 w-[25%] transition-colors relative z-20 ${
                activeTab === tab.id
                  ? "text-gray-900 sm:text-purple-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
              suppressHydrationWarning
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}
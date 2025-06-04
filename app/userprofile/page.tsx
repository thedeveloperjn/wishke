"use client"

import { useState ,useEffect, useRef } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, MapPin, Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PencilSimpleLine ,DotsThree,ShareFat } from "@phosphor-icons/react/dist/ssr"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import ProfileReelsSection from "@/components/profile-reel-section"
import PropertyPost from "@/components/property-post"
import RequirementPost from "@/components/requirement-post"
import DynamicReels from "@/components/dynamicreels"
export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("home")
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("posts")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const profileData = {
    id: 1,
    name: "Alex Carter",
    username: "@alexcarter",
    location: "Mumbai, India",
    bio: "Adventurer | Coffee Lover | Tech Enthusiast | Sharing my journey one post at a time!",
    stats: {
      posts: 32,
      followers: "1.2k",
      following: 500,
    },
    avatar: "/imagesstatic/3.jpg",
    coverImage: "/imagesstatic/3.jpg",
  }


   const reelsData: ReelData[] = [
    {
      id: 1,
      user: { name: "Alex Carter", image: "/imagesstatic/3.jpg" ,id:"@alexcarter"},
      videoUrl: "/property-8.mp4",
      thumbnailUrl: "/luxury-lobby.png",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      likes: 9900,
      comments: 451,
      shares: 10,
    },
    {
      id: 2,
      user: {name: "Alex Carter", image: "/imagesstatic/3.jpg" ,id:"@alexcarter"},
      videoUrl: "/property-7.mp4",
      thumbnailUrl: "/luxury-bungalow-pool.png",
      caption: "Check out this amazing property in downtown!",
      likes: 5600,
      comments: 230,
      shares: 45,
    },
    {
      id: 3,
      user: { name: "Alex Carter", image: "/imagesstatic/3.jpg" ,id:"@alexcarter"},
      videoUrl: "/property-6.mp4",
      thumbnailUrl: "/luxury-tower-pool.png",
      caption: "Luxury living at its finest. 5 bedrooms, pool, views.",
      likes: 7800,
      comments: 320,
      shares: 67,
    },
    // Add more reels as needed
  ]

  const posts = [
    {
      id: 1,
      type: "property",
      content: {
        title: "3BHK Residential-Bungalow",
        location: "Malabar Hill, Mumbai",
        price: "₹1.7L per Month",
        description:
          "For athletes, high altitude produces two contradictory effects on performance. For explosive events...",
        image: "/placeholder.svg?height=300&width=500&query=luxury bungalow",
      },
      stats: { likes: 24, comments: 8, shares: 3 },
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "reel",
      content: {
        title: "Property Tour - Modern Villa",
        thumbnail: "/placeholder.svg?height=300&width=500&query=modern villa tour",
        duration: "0:45",
      },
      stats: { likes: 156, comments: 23, shares: 12 },
      timestamp: "1 day ago",
    },
    {
      id: 3,
      type: "post",
      content: {
        text: "Just closed another amazing property deal! 🏠✨ The real estate market in Mumbai is thriving. Grateful for all the trust my clients put in me.",
        image: "/placeholder.svg?height=300&width=500&query=property handshake deal",
      },
      stats: { likes: 89, comments: 15, shares: 7 },
      timestamp: "3 days ago",
    },
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
          <div className="space-y-6">
             
             <RequirementPost
        title="Looking for 2/3 BHK Apartment"
        budget="₹50K - 80K per Month"
        location="Bandra, Juhu, or Andheri"
        description="I'm looking for a well-maintained apartment in a good locality with 24/7 security, covered parking, and modern amenities. Prefer a family-friendly community."
        timestamp="25 April at 9:42 AM"
        authorName="Alex Carter"
        authorImage="/imagesstatic/3.jpg"
        likes={32}
        comments={18}
        userProfileUrl="/userprofile"
      />

      <PropertyPost
        type="property"
        title="3BHK Residential-Flat"
        location="Andheri, Mumbai"
        price="₹75K per Month"
        description="Discover your dream home in the heart of Andheri, Mumbai! This stunning 3BHK flat is located in a secure gated community with modern amenities and spacious rooms."
        timestamp="23 April at 10:23 AM"
        authorName="Alex Carter"
        authorImage="/imagesstatic/3.jpg"
        images={[{ type: "image", url: "/modern-apartment-exterior.png" }]}
        likes={654}
        comments={122}
        userProfileUrl="/userprofile"
      />

      {/* Project post with multiple images */}
      <PropertyPost
      type="project"
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
  
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        price="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
        authorName="Alex Carter"
        authorImage="/imagesstatic/3.jpg"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
        userProfileUrl="/userprofile"
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
    <div className=" min-w-[51%] rounded-[12px]  overflow-y-auto h-[calc(85vh)] pb-6 no-scrollbar  xl:max-w-[51%]">
     
          
      {/* Profile Header */}
      <div className="relative bg-white p-4 rounded-[10px]  pb-8">
    
      <div className="flex items-center gap-3  pb-4">
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
        <div className="h-48 bg-gradient-to-r from-[#61F3F3] to-[#FED766] rounded-lg relative overflow-hidden">
        
          
        </div>

        {/* Profile Info */}
        <div className="relative -mt-16 ml-6">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Image
                src="/imagesstatic/3.jpg"
                alt={profileData.name}
                width={150}
                height={150}
                className="rounded-full h-[150px] w-[150px] object-cover  border-4 border-white"
                priority
              />
  
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                
                <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-20 right-4 gap-2 flex">
              <Button
           
            className=" bg-white text-[16px] text-gray-500 px-3 hover:bg-white border-[2px] border-gray-300"
            size="lg"
            suppressHydrationWarning={true}
          >
            <ShareFat size={22}/>
          </Button>
          <Button
           
            className="bg-white text-[16px] text-gray-500 px-3 hover:bg-white border-[2px] border-gray-300"
            size="lg"
            suppressHydrationWarning={true}
          >
            <DotsThree size={22}/>
          </Button>
          </div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
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
      <div className="border-b bg-white mb-6 px-4">
        <div className="flex gap-8">
          {[
            { id: "posts", label: "Posts" },
            { id: "reels", label: "Reels" },
            { id: "comments", label: "Comments" },
            { id: "likes", label: "Likes" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`pb-3 px-1 border-b-2 w-[25%] transition-colors ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
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
"use client"

import { useState ,useEffect, useRef } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, MapPin, Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PencilSimpleLine } from "@phosphor-icons/react/dist/ssr"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import ProfileReelsSection from "./profile-reel-section"

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
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={profileData.avatar || "/placeholder.svg"}
                        alt={profileData.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-sm">{profileData.name}</h4>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  {post.type === "property" && (
                    <div>
                      <div className="px-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            Property
                          </Badge>
                          <span className="text-sm text-gray-600">{post.content.title}</span>
                          <span className="text-sm text-gray-600">•</span>
                          <span className="text-sm text-gray-600">{post.content.location}</span>
                          <span className="text-sm text-gray-600">•</span>
                          <span className="text-sm font-semibold text-teal-600">{post.content.price}</span>
                        </div>
                        <p className="text-sm text-gray-700">{post.content.description}</p>
                      </div>
                      <Image
                        src={post.content.image || "/placeholder.svg"}
                        alt="Property"
                        width={500}
                        height={300}
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  {post.type === "reel" && (
                    <div className="relative">
                      <Image
                        src={post.content.thumbnail || "/placeholder.svg"}
                        alt="Reel"
                        width={500}
                        height={300}
                        className="w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-3">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {post.content.duration}
                      </div>
                    </div>
                  )}

                  {post.type === "post" && (
                    <div>
                      <div className="px-4 mb-4">
                        <p className="text-sm text-gray-700">{post.content.text}</p>
                      </div>
                      {post.content.image && (
                        <Image
                          src={post.content.image || "/placeholder.svg"}
                          alt="Post"
                          width={500}
                          height={300}
                          className="w-full object-cover"
                        />
                      )}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-2 ${likedPosts.includes(post.id) ? "text-red-500" : "text-gray-500"}`}
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                          {post.stats.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
                          <MessageCircle className="h-4 w-4" />
                          {post.stats.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
                          <Share className="h-4 w-4" />
                          {post.stats.shares}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "reels":
        return <ProfileReelsSection userId={profileData.id} />

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
      className={`flex-1 overflow-y-auto h-[calc(100vh-96px)] no-scrollbar bg-white  transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="flex items-center gap-3 p-4 pb-0">
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
      <div className="relative bg-white p-4 rounded-[10px]  pb-8">
    

        <div className="h-48 bg-gradient-to-r from-[#C8FAD6] to-[#F2DEFF] rounded-lg relative overflow-hidden">
        
          
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
              <Button
            onClick={handleEditProfile}
            className="absolute top-20 right-4 gap-2 bg-white text-[16px] text-purple-600 hover:bg-white border-[2px] border-purple-500"
            size="lg"
            suppressHydrationWarning={true}
          >
            <PencilSimpleLine size={22}/>
            Edit Profile
          </Button>
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
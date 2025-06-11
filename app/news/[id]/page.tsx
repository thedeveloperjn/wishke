"use client"

import { useState } from "react"
import { useParams } from "next/navigation"


import Image from "next/image"
import {  MessageCircle, Share, ArrowLeft,MoreHorizontal, MoreVertical } from "lucide-react"
import Link from "next/link"
import {Heart, BookmarkSimple, ArrowsLeftRight } from "@phosphor-icons/react"
import { ShareFat } from "@phosphor-icons/react"
import { ChatCircle } from "@phosphor-icons/react"
import { PaperPlaneTilt } from "@phosphor-icons/react"
  
interface NewsItem {
    id: number
    title: string
    description: string
    image: string
    source: string
    content: string
    author: string
    authorImage: string
    publishedAt: string
    likes: number
    comments: number
    shares: number
  }
  
   const hotNews: NewsItem[] = [
    {
      id: 1,
      title: "Owning Properties, and profit from 70-75% on Q4 TVS",
      description: "Real estate market shows promising growth with significant returns expected in the fourth quarter.",
      image: "/news.png",
      source: "Property Times",
      content: `Real estate market shows promising growth with significant returns expected in the fourth quarter. Industry experts predict a bullish trend continuing into the next fiscal year.
  
  The property sector has witnessed unprecedented growth, with residential and commercial segments both showing strong performance. Market analysts suggest that strategic investments made now could yield substantial returns.
  
  Key factors driving this growth include:
  
  1. Favorable Government Policies: The government's pro-business stance and various incentives for real estate development have created a conducive environment for growth.
  
  2. Low Interest Rates: Financing has become more accessible with competitive interest rates, making property investments more attractive.
  
  3. Market Consolidation: The sector is witnessing consolidation with stronger players emerging, leading to better quality developments and improved market confidence.
  
  4. Infrastructure Development: Ongoing infrastructure projects are enhancing connectivity and increasing property values in previously underserved areas.
  
  Experts recommend conducting thorough due diligence before making investment decisions, considering factors such as location, developer credibility, and long-term growth potential.`,
      author: "John Smith",
      authorImage: "/jamie-parker.png",
      publishedAt: "2 hours ago",
      likes: 156,
      comments: 24,
      shares: 12,
    },
    {
      id: 2,
      title: "New Infrastructure Projects Boost Real Estate Demand",
      description: "Major infrastructure developments are driving increased demand in suburban real estate markets.",
      image: "/news.png",
      source: "Urban Development",
      content: `Real estate market shows promising growth with significant returns expected in the fourth quarter. Industry experts predict a bullish trend continuing into the next fiscal year.
  
      The property sector has witnessed unprecedented growth, with residential and commercial segments both showing strong performance. Market analysts suggest that strategic investments made now could yield substantial returns.
      
      Key factors driving this growth include:
      
      1. Favorable Government Policies: The government's pro-business stance and various incentives for real estate development have created a conducive environment for growth.
      
      2. Low Interest Rates: Financing has become more accessible with competitive interest rates, making property investments more attractive.
      
      3. Market Consolidation: The sector is witnessing consolidation with stronger players emerging, leading to better quality developments and improved market confidence.
      
      4. Infrastructure Development: Ongoing infrastructure projects are enhancing connectivity and increasing property values in previously underserved areas.
      
      Experts recommend conducting thorough due diligence before making investment decisions, considering factors such as location, developer credibility, and long-term growth potential.`,
          author: "Sarah Johnson",
      authorImage: "/imagesstatic/malvika.jpg",
      publishedAt: "5 hours ago",
      likes: 89,
      comments: 15,
      shares: 8,
    },
    {
      id: 3,
      title: "Smart City Initiatives Transform Urban Living",
      description: "Technology integration in urban planning is revolutionizing how we live and work in cities.",
      image: "/news.png",
      source: "Tech Urban",
      content: `Real estate market shows promising growth with significant returns expected in the fourth quarter. Industry experts predict a bullish trend continuing into the next fiscal year.
  
      The property sector has witnessed unprecedented growth, with residential and commercial segments both showing strong performance. Market analysts suggest that strategic investments made now could yield substantial returns.
      
      Key factors driving this growth include:
      
      1. Favorable Government Policies: The government's pro-business stance and various incentives for real estate development have created a conducive environment for growth.
      
      2. Low Interest Rates: Financing has become more accessible with competitive interest rates, making property investments more attractive.
      
      3. Market Consolidation: The sector is witnessing consolidation with stronger players emerging, leading to better quality developments and improved market confidence.
      
      4. Infrastructure Development: Ongoing infrastructure projects are enhancing connectivity and increasing property values in previously underserved areas.
      
      Experts recommend conducting thorough due diligence before making investment decisions, considering factors such as location, developer credibility, and long-term growth potential.`,
          author: "Mike Chen",
      authorImage: "/placeholder.svg?height=40&width=40&text=MC",
      publishedAt: "1 day ago",
      likes: 234,
      comments: 45,
      shares: 23,
    },
  ]

  
const otherNews: NewsItem[] = [
    {
      id: 7,
      title: "Real Estate Trends: Apex Realty Enjoys a 15.75% Boost in Q4 FY25 Earnings",
      description: "Mumbai's Sunset Gathering is here: Over 128,000 Members are Uniting to Celebrate the Twilight Beauty.",
      image: "/news.png",
      source: "Times Now",
      content: "Mumbai's Sunset Gathering is here: Over 128,000 Members are Uniting to Celebrate the Twilight Beauty.",
      author: "Times Now",
      content: `Real estate market shows promising growth with significant returns expected in the fourth quarter. Industry experts predict a bullish trend continuing into the next fiscal year.
  
      The property sector has witnessed unprecedented growth, with residential and commercial segments both showing strong performance. Market analysts suggest that strategic investments made now could yield substantial returns.
      
      Key factors driving this growth include:
      
      1. Favorable Government Policies: The government's pro-business stance and various incentives for real estate development have created a conducive environment for growth.
      
      2. Low Interest Rates: Financing has become more accessible with competitive interest rates, making property investments more attractive.
      
      3. Market Consolidation: The sector is witnessing consolidation with stronger players emerging, leading to better quality developments and improved market confidence.
      
      4. Infrastructure Development: Ongoing infrastructure projects are enhancing connectivity and increasing property values in previously underserved areas.
      
      Experts recommend conducting thorough due diligence before making investment decisions, considering factors such as location, developer credibility, and long-term growth potential.`,
         
      authorImage: "/placeholder.svg?height=40&width=40",
      publishedAt: "3 hours ago",
      likes: 0,
      comments: 0,
      shares: 0
    },
    {
      id: 8,
      title: "Market Insights: Apex Realty Reports a 15.75% Increase in Q4 FY25...",
      description: "Mystic Moonlight Gala in Mumbai: A Night of Stars, Gourmet Delights, and Mesmerizing Performances.",
      image: "/news.png",
      source: "Mint",
      content: "Mystic Moonlight Gala in Mumbai: A Night of Stars, Gourmet Delights, and Mesmerizing Performances.",
      author: "Mint",
      content: `Real estate market shows promising growth with significant returns expected in the fourth quarter. Industry experts predict a bullish trend continuing into the next fiscal year.
  
      The property sector has witnessed unprecedented growth, with residential and commercial segments both showing strong performance. Market analysts suggest that strategic investments made now could yield substantial returns.
      
      Key factors driving this growth include:
      
      1. Favorable Government Policies: The government's pro-business stance and various incentives for real estate development have created a conducive environment for growth.
      
      2. Low Interest Rates: Financing has become more accessible with competitive interest rates, making property investments more attractive.
      
      3. Market Consolidation: The sector is witnessing consolidation with stronger players emerging, leading to better quality developments and improved market confidence.
      
      4. Infrastructure Development: Ongoing infrastructure projects are enhancing connectivity and increasing property values in previously underserved areas.
      
      Experts recommend conducting thorough due diligence before making investment decisions, considering factors such as location, developer credibility, and long-term growth potential.`,
         
      authorImage: "/placeholder.svg?height=40&width=40",
      publishedAt: "4 hours ago",
      likes: 0,
      comments: 0,
      shares: 0
    }
  ];
  

export default function NewsDetailPage() {
  const [activeSection, setActiveSection] = useState("news")
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [comments, setComments] = useState(0)
  const [share, setShare] = useState(0)
  const [shareout, setShareout] = useState(0)
  const params = useParams()
  const newsId = Number.parseInt(params.id as string)
  const news = hotNews.find((item) => item.id === newsId)

  const handleLike = () => {
    setLiked(!liked)
    setLikesCount(prev => liked ? prev - 1 : prev + 1)
  }

  if (!news) {
    return <div>News not found</div>
  }

  return (
  <div className="min-w-[51%] xl:max-w-[51%]">
          {/* Back button */}
          <main className="flex-1  overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  rounded-lg">
          
          <Link href="/news" className="sticky top-0 p-4  flex items-center  bg-white z-[5] text-[20px] font-semibold gap-2 text-gray-900 hover:text-gray-900 ">
            <ArrowLeft className="w-4 h-4" />
            News Detail
          </Link>
<div className="bg-white p-4 pt-0">
          {/* Article content */}
          <article className=" overflow-hidden">
            {/* Article image */}
            <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 mb-4">
                <Image
                  src={news.authorImage || "/placeholder.svg"}
                  alt={news.author}
                  width={40}
                  height={40}
                  className="rounded-full h-[34px] w-[34px] sm:h-[40px] sm:w-[40px] object-cover"
                />
                <div>
                  <p className="font-semibold text-[16px] sm:text-[20px] text-gray-900">{news.author}</p>
                  <p className="text-[13px] sm:text-[14px] text-gray-500">{news.publishedAt}</p>
                </div>
              </div>
              <button 
            className="text-muted-foreground hover:text-foreground no-post-click"
            // onClick={toggleDropdown}
          >
            
            <MoreVertical className="items-start  h-10 w-10 text-green-600 hover:bg-gray-100 p-2 rounded-[6px]" />
          </button>
          </div>
            <div className="relative rounded-[8px] overflow-hidden h-[240px] sm:h-[300px] w-full">
              <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
            </div>

            {/* Article content */}
            <div className="pt-4">
              {/* Author info */}
              

              {/* Title */}
              <h1 className="text-[18px] font-semibold text-gray-900 mb-4 leading-tight">{news.title}</h1>

              {/* Content */}
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{news.content}</p>
              </div>

              {/* Engagement bar */}
             
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
          </article>
          </div>
          <div className="bg-white rounded-[12px] p-4 mt-2 sm:mt-6">
        <h2  className="text-lg  border-b border-gray-200 pb-3 font-bold text-gray-900 mb-4">Other News</h2>
        <div className="space-y-0">
          {hotNews.map((news, idx) => (
            <Link href={`/news/${news.id}`} key={news.id}>
            <div
              key={news.id}
              className={`flex gap-3 items-start p-1 py-3 sm:p-3   transition-colors ${idx !== otherNews.length - 1 ? " border-b border-gray-100" : ""}`}
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-[80px] h-[60px] object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-[16px] line-clamp-1">{news.title}</h4>
                <p className="text-[14px] text-gray-600 line-clamp-2">{news.description}</p>
              </div>
              <div>
              <button 
            className="text-muted-foreground hover:text-foreground no-post-click"
            // onClick={toggleDropdown}
          >
            
            <MoreHorizontal className="  h-8 w-8 sm:h-10 sm:w-10 text-green-600 hover:bg-gray-100 p-2 rounded-[6px]" />
          </button>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
          </main>
          
        </div>
    
  )
}

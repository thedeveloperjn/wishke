"use client";
import { useRef, useState, useEffect } from "react";
import NewsCard from "./news-card";
import Link from "next/link";
import { link } from "fs";


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
    authorImage: "/placeholder.svg?height=40&width=40&text=JS",
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
    authorImage: "/placeholder.svg?height=40&width=40&text=SJ",
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

export default function NewsContent() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const handleScroll = () => setIsScrolled(content.scrollTop > 0);
    content.addEventListener("scroll", handleScroll);
    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      ref={contentRef}
      className={`flex-1 rounded-[12px] overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="bg-white rounded-[12px] p-4">
        <h2  className="text-lg  border-b border-gray-200 pb-3 font-bold text-gray-900 mb-4">Hot News</h2>
        <div className="flex gap-3 flex-wrap pb-2">
        {hotNews.map((news) => (
              <Link className="bg-white rounded-lg border  w-[49%] flex-shrink-0 overflow-hidden" key={news.id} href={`/news/${news.id}`}>
                <NewsCard news={news} />
              </Link>
            ))}
        </div>
      </div>
      <div className="bg-white rounded-[12px] p-4 mt-6">
        <h2  className="text-lg  border-b border-gray-200 pb-3 font-bold text-gray-900 mb-4">Other News</h2>
        <div className="space-y-0">
          {hotNews.map((news, idx) => (
            <Link href={`/news/${news.id}`} key={news.id}>
            <div
              key={news.id}
              className={`flex gap-3 items-start p-3   transition-colors ${idx !== otherNews.length - 1 ? " border-b border-gray-100" : ""}`}
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
            </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 
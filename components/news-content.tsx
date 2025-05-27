"use client";
import { useRef, useState, useEffect } from "react";
import NewsCard from "./news-card";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  source: string;
}

const hotNews: NewsItem[] = [
  {
    id: 1,
    title: "Godrej Properties' net profit dips 20.83% in Q4 FY25",
    description:
      "NEW DELHI: Godrej Properties (GPL) has recently announced a notable decline of 20.83 percent in...",
    image: "/news.png",
    source: "Economic Times",
  },
  {
    id: 2,
    title: "Godrej Properties aims for 30% growth in FY26",
    description:
      "Despite the dip, the company is optimistic, targeting a significant growth in the upcoming fi...",
    image: "/news.png",
    source: "Business Standard",
  },
];

const otherNews: NewsItem[] = [
  {
    id: 3,
    title: "Real Estate Trends: Apex Realty Enjoys a 15.75% Boost in Q4 FY25 Earnings",
    description:
      "Mumbai's Sunset Gathering is here: Over 128,000 Members are Uniting to Celebrate the Twilight Beauty.",
    image: "/news.png",
    source: "Times Now",
  },
  {
    id: 4,
    title: "Market Insights: Apex Realty Reports a 15.75% Increase in Q4 FY25...",
    description:
      "Mystic Moonlight Gala in Mumbai: A Night of Stars, Gourmet Delights, and Mesmerizing Performances.",
    image: "/news.png",
    source: "Mint",
  },
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
      className={`flex-1 rounded-[12px] overflow-y-auto h-[calc(100vh-96px)] no-scrollbar transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="bg-white rounded-[12px] p-4">
        <h2  className="text-lg  border-b border-gray-200 pb-3 font-bold text-gray-900 mb-4">Hot News</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {hotNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-[12px] p-4 mt-6">
        <h2  className="text-lg  border-b border-gray-200 pb-3 font-bold text-gray-900 mb-4">Other News</h2>
        <div className="space-y-0">
          {otherNews.map((news, idx) => (
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
          ))}
        </div>
      </div>
    </main>
  );
} 
"use client"
import Image from "next/image"
import { Search, Edit } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Smile, Send, Filter } from "lucide-react"
const vendors = [
  {
    id: 1,
    image: "/jamie-parker.png",
    price: "₹1.75 Lakh",
    oldPrice: "₹2.05 Lakh",
    title: "Classic L-Shaped Modular Kitchen",
    location: "Mumbai, Maharashtra",
  },
  {
    id: 2,
    image: "/jamie-parker.png",
    price: "₹2.00 Lakh",
    oldPrice: "₹2.50 Lakh",
    title: "Modern U-Shaped Modular Kitchen",
    location: "Pune, Maharashtra",
  },
  {
    id: 3,
    image: "/jamie-parker.png",
    price: "₹1.90 Lakh",
    oldPrice: "₹2.20 Lakh",
    title: "Minimalist Straight Modular Kitchen",
    location: "Bangalore, Karnataka",
  },
  {
    id: 4,
    image: "/jamie-parker.png",
    price: "₹2.10 Lakh",
    oldPrice: "₹2.40 Lakh",
    title: "Contemporary Parallel Modular Kitchen",
    location: "Delhi, Delhi NCR",
  },
  {
    id: 5,
    image: "/jamie-parker.png",
    price: "₹1.85 Lakh",
    oldPrice: "₹2.15 Lakh",
    title: "Scandinavian Modular Kitchen",
    location: "Hyderabad, Telangana",
  },
  {
    id: 6,
    image: "/jamie-parker.png",
    price: "₹2.30 Lakh",
    oldPrice: "₹2.60 Lakh",
    title: "Luxury Island Modular Kitchen",
    location: "Chennai, Tamil Nadu",
  },
]

export default function VendorsContent() {
    const contentRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [activeTab, setActiveTab] = useState("for-you")
  
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
      className={`flex-1 overflow-y-auto h-[calc(100vh-96px)] no-scrollbar p-4 bg-white transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="flex items-center gap-4 bg-white rounded-xl pb-4">
        <div className="relative flex  items-center gap-2 flex-1">
        <Search className="absolute left-3  top-3.5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none border bg-transparent py-3 rounded-xl  flex-1 px-10 text-gray-700 text-base"
          />
        </div>
        <button className="text-gray-600 text-sm flex items-center gap-1">
          Filter
          <Image src="/filter.svg" alt="Filter" width={18} height={18} />
        </button>
        <button className="text-gray-600 text-sm flex items-center gap-1">
          Sort by
          <Image src="/sort.svg" alt="Sort" width={18} height={18} />
        </button>
      </div>
      {/* Vendors Grid */}
      <div className="flex flex-wrap gap-3 mb-4">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white   overflow-hidden">
            <div className="relative w-full  h-[230px] w-[240px]">
              <Image src={vendor.image} alt={vendor.title} fill className="object-cover rounded-lg" />
            </div>
            <div className="space-y-1 mt-2 w-[240px]">
              <div className="flex items-center mb-1 gap-2">
                <span className="font-semibold text-lg">{vendor.price}</span>
                <span className="text-[#909EAB] line-through  ">{vendor.oldPrice}</span>
              </div>
              <div className="font-medium text-[#454F5B] text-[14px] leading-[20px] font-lighter  mb-1">{vendor.title}</div>
              <div className="text-[#909EAB] text-[14px] mb-2">{vendor.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
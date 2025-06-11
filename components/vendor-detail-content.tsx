"use client"

import { useState ,useEffect,useRef} from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneCall ,ChatTeardropText } from "@phosphor-icons/react/dist/ssr";
import Postedby from "./postedby"
import { PhoneCallIcon } from "@phosphor-icons/react"
interface VendorDetailContentProps {
  vendorId: number
}

export default function VendorDetailContent({ vendorId }: VendorDetailContentProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mainImage, setMainImage] = useState("/imagesstatic/sofa1.png")
  const [thumbnails, setThumbnails] = useState([
    "/imagesstatic/sofa2.png",
    "/imagesstatic/sofa2.png",
    "/imagesstatic/sofa2.png",
    "/imagesstatic/sofa2.png",
  ])
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Mock vendor data matching the image
  const vendor = {
    id: vendorId,
    title: "Classic L-Shaped Modular Kitchen",
    price: "₹1.75 Lakh",
    oldPrice: "₹2.05 Lakh",
    subtitle: "Premium Quality",
    mainImage: "/imagesstatic/sofa1.png",
    thumbnails: [
      "/imagesstatic/sofa2.png",
      "/imagesstatic/sofa2.png",
      "/imagesstatic/sofa2.png",
      "/imagesstatic/sofa2.png",
    ],
    vendor: {
      name: "Samantha Rivers",
      username: "@samantha11",
      company: "Sleek Modular Kitchens - by Asian Paints",
      avatar: "/jamie-parker.png",
    },
  }
 const contentRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleSwipe = (direction: 'left' | 'right') => {
    const allImages = [mainImage, ...thumbnails]
    let newIndex = currentImageIndex

    if (direction === 'left') {
      newIndex = (currentImageIndex + 1) % allImages.length
    } else {
      newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length
    }

    // Update main image and thumbnails
    const newMainImage = allImages[newIndex]
    const newThumbnails = allImages.filter((_, i) => i !== newIndex)
    setMainImage(newMainImage)
    setThumbnails(newThumbnails)
    setCurrentImageIndex(newIndex)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleSwipe('left')
    }
    if (isRightSwipe) {
      handleSwipe('right')
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const handleThumbnailClick = (index: number) => {
    const allImages = [mainImage, ...thumbnails]
    const newMainImage = thumbnails[index]
    const newThumbnails = allImages.filter((_, i) => i !== index + 1)
    setMainImage(newMainImage)
    setThumbnails(newThumbnails)
    setCurrentImageIndex(index + 1)
  }

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
      className={`flex-1 overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar w-full transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="p-4  bg-white ">
        <div className="flex items-center  gap-3 mb-0">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-lg font-semibold">Product Details</h1>
            </div>
      <div className="flex flex-col md:flex-row gap-8 relative">
        
        {/* Main Product Area - Left Side (50% of vendor detail content) */}
        <div className="w-full md:w-1/2 md:sticky md:top-4 md:max-h-[calc(100vh-2rem)]">
          <div className="py-4">
            {/* Product Image */}
            <div className="mb-6 h-[60vh] md:h-[65vh]">
              <div 
                className="relative h-full w-full max-w-lg mx-auto rounded-2xl mb-4 cursor-grab active:cursor-grabbing"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <Image
                  src={mainImage}
                  alt={vendor.title}
                  fill
                  className="object-cover rounded-lg select-none"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  draggable={false}
                />
                {/* Swipe Indicators */}
                <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white">
                    ←
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white">
                    →
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-3">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index + 1 ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Product Info & Description (50% of vendor detail content) */}
        <div className="w-full md:w-1/2 md:pl-4">
          <div className="py-4 mt-4  sm:mt-0 sm:p-4">
            {/* Product Title */}
            <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-800 mb-2 sm:mb-6 leading-tight">
              ErgoFlex Premium Ergonomic Office Chair
            </h1>

            {/* Price Section */}
            <div className="flex items-center gap-3 mb-4 sm:mb-8">
              <span className="text-2xl font-bold text-gray-900">₹12,499</span>
              <span className="text-xl text-gray-400 line-through">₹15,499</span>
              <span className="text-gray-500">(Set of 4)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 font-medium">
                <PhoneCallIcon size={20} /> Contact
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-purple-200 text-purple-600 rounded-lg py-3 font-medium"
              >
                <ChatTeardropText size={20}/> Message
              </Button>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900">Description</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Product Overview:</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Designed for modern professionals, the ErgoFlex blends comfort, functionality, and style into one
                    sleek seating solution ideal for long working hours.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Comfort & Breathability:</h3>
                  <p className="text-gray-400 leading-relaxed">
                    This chair features a high-density molded foam seat and a breathable mesh backrest that ensures
                    superior ventilation throughout the day. The adjustable lumbar support system adapts to your spine's
                    natural curve, promoting better posture and reducing fatigue.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Adjustability & Functionality:</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Equipped with a synchro-tilt mechanism and 3D adjustable armrests, the ErgoFlex provides a fully
                    customizable seating experience. Its hydraulic height lift offers precise posture adjustment to suit
                    any desk height or user preference.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Mobility & Stability:</h3>
                  <p className="text-gray-400 leading-relaxed">
                    The nylon base and dual-wheel casters offer strong support and silent, smooth movement on any
                    surface—whether carpet, tile, or wood.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Use Case & Aesthetics:</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Perfect for home offices, workstations, or creative studios, the ErgoFlex combines ergonomic design
                    with minimalist aesthetics making it an ideal choice for users who value comfort without
                    compromising on style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="bg-white p-4 mt-2 sm:mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Posted By Section */}
          <div className="w-full md:w-1/2">
            <Postedby 
              avatar={vendor.vendor.avatar} 
              name={vendor.vendor.name}   
              username={vendor.vendor.username} 
              company={vendor.vendor.company} 
            />
          </div>

          {/* Location Section */}
          <div className="w-full md:w-1/2">
            <h4 className="font-semibold mb-4 text-[22px] border-b pb-3 text-gray-900">Location</h4>
            <div className="bg-white overflow-hidden rounded-lg h-[325px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1849989694943!2d81.6591832!3d21.2553351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd4e17a09c69%3A0xc94046f4512afde5!2sTechnolitics%20India!5e0!3m2!1sen!2sin!4v1685807905426!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-[8px]"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useState ,useEffect,useRef } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import EventCard from "@/components/event-card"
// import TrendingSection from "@/components/trending-section"
import UpcomingEvents from "@/components/upcoming-events"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  category: string
  organizer: string
  organizerImage: string
  attendees: number
  hashtags: string[]
}

interface EventsContentProps {
  events: Event[]
}

export default function EventsContent({ events }: EventsContentProps) {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }


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
    <main
      ref={contentRef}
      className={`flex-1  rounded-[12px] overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar  transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
        <div className="bg-white rounded-[12px]">
      <div className="flex border-b  border-gray-200 items-center p-4 gap-3">
        <Button variant="ghost" size="sm" className="p-2" onClick={handleBackClick}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl  font-semibold text-gray-900">Events</h1>
      </div>

      {/* Recent Events */}
      <div className="mb-4 p-4">
        <h2 className="text-lg  border-b border-gray-200 pb-3 font-bold text-gray-900 mb-4">Recent Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.slice(0, 4).map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
            <EventCard key={event.id} event={event} />
            </Link>
          ))}
        </div>
      </div>
</div>
      {/* Trending Section */}
      {/* <div className="mb-8">
        <TrendingSection />
      </div> */}

      {/* Upcoming Events */}
      <div className="bg-white rounded-[12px]">
        <UpcomingEvents events={events} />
      </div>
    </main>
  )
}

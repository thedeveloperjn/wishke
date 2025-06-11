import { Calendar, MapPin } from "lucide-react"
import { Buildings,CalendarDots    } from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/card"
import Image from "next/image"

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

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="bg-white  max-w-[320px] sm:max-w-full overflow-hidden transition-shadow border rounded-[8px]">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={240}
          className="w-full h-46 sm:h-60 object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-white rounded-[8px] px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <Buildings className="w-6 h-6 text-gray-600" />
            <span className="text-[14px] font-medium text-gray-900">{event.category}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Date and Time */}
        <div className="flex items-center gap-2 text-gray-500 mb-3">
          <CalendarDots className="w-4 h-4" />
          <span className="text-[14px]">
            {event.time} {event.date}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{event.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-[22px] font-bold text-gray-900 mb-3 leading-tight">{event.title}</h3>

        {/* Description */}
        <p className="text-[16px] text-sm leading-relaxed">{event.description}</p>
      </div>
    </Card>
  )
}

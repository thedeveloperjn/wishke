
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { Buildings, BuildingsIcon, CalendarDots,MapPin     } from "@phosphor-icons/react/dist/ssr";
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

interface UpcomingEventsProps {
  events: Event[]
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    
    <Card className="bg-white border-0 ">
      <CardHeader className="!p-5 !pb-0 ">
        <CardTitle className="text-lg  border-b border-gray-200 pb-3 font-bold text-gray-900 mb-4">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {events.map((event) => (
          <Link key={event.id} className="flex gap-3 p-0 rounded-lg hover:bg-gray-50 transition-colors" href={`/events/${event.id}`}>
        
            <div className="w-[180px] h-[120px] relative bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
            <Badge variant="secondary" className="text-gray-700 !rounded-[6px] mt-2 absolute text-xs ml-2">
                 <BuildingsIcon className="h-5 w-5" /> {event.category}
                </Badge>
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <CalendarDots  size={24} className="text-gray-600" />
                  <p className="text-[#909EAB] text-[15px]">{event.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin  size={24} className="text-gray-600" />
                  <p className="text-[#909EAB] text-[15px] truncate">{event.location}</p>
                </div>
              </div>

              <div className="flex flex-col items-start space-y-1 justify-between mb-1">
                <h4 className="font-medium text-gray-900 text-[22px] line-clamp-1">{event.title}</h4>
                <p className="text-[16px] text-gray-600">{event.description}</p>
               
              </div>
              
              
            </div>
       
           </Link>
        ))}
      </CardContent>
    </Card>
   
  )
}

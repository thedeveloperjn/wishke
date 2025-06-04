"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Search, Edit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function MessagesSidebar() {
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const handleScroll = () => {
      setIsScrolled(sidebar.scrollTop > 0)
    }

    sidebar.addEventListener("scroll", handleScroll)
    return () => sidebar.removeEventListener("scroll", handleScroll)
  }, [])

  const contacts = [
    { id: 1, name: "John Manual", status: "online", unreadCount: 2 },
    { id: 2, name: "Alex Carter", status: "online" },
    { id: 3, name: "Sam Taylor", status: "" },
    { id: 4, name: "Jordan Lee", status: "", unreadCount: 1 },
    { id: 5, name: "Chris Morgan", status: "" },
    { id: 6, name: "Jamie Parker", status: "" },
    { id: 7, name: "Robbin Michel", status: "", unreadCount: 3 },
    { id: 8, name: "Taylor Quinn", status: "" },
  ]

  const handleContactClick = (contactId: number) => {
    router.push(`/chat/${contactId}`)
  }

  return (
    <aside
      ref={sidebarRef}
      className={`hidden w-[24%] flex-col bg-white p-4 lg:flex overflow-y-auto h-[calc(85vh)] no-scrollbar shadow-sm transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Messages</h2>
        <button>
          <Edit className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search" className="w-full rounded-md text-md border-none bg-[#F8F8FA] pl-8" />
      </div>

      <div className="mb-4 flex border-b">
        <button className="flex-1 border-b-2 border-teal-500 px-4 py-2 text-sm font-medium text-teal-500">
          Primary
        </button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground">General</button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-purple-500">Requests</button>
      </div>

      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-3 rounded-md p-2 hover:bg-muted/50 cursor-pointer"
            onClick={() => handleContactClick(contact.id)}
          >
            <div className="relative h-10 w-10">
              <Image
                src={`/stylish-profile-picture.png?height=40&width=40&query=profile picture ${contact.id}`}
                alt={contact.name}
                fill
                className="rounded-full object-cover"
              />
              {contact.status === "online" && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#FF5631]"></span>
              )}
            </div>
            <span className="text-[16px] font-medium flex-1">{contact.name}</span>
            {contact.unreadCount && (
              <span className="bg-teal-500 text-white text-[16px] rounded-full h-5 w-5 flex items-center justify-center">
                {contact.unreadCount}
              </span>
            )}
          </div>
        ))}

        <button className="mt-2 w-full text-center text-sm text-muted-foreground hover:text-foreground">
          View All
        </button>
      </div>
    </aside>
  )
}

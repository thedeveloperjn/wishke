"use client"

import { useState } from "react"
import { ArrowLeft, MagnifyingGlass, DotsThreeVertical } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function MessagesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Mark Russel",
      username: "@markrussel",
      avatar: "/imagesstatic/malvika.jpg",
      lastMessage: "Hi, I'm interested in your property",
      timestamp: "2m ago",
      unread: 2
    },
    {
      id: 2,
      name: "Sarah Wilson",
      username: "@sarahw",
      avatar: "/imagesstatic/malvika.jpg",
      lastMessage: "When can we schedule a visit?",
      timestamp: "1h ago",
      unread: 0
    },
    {
      id: 3,
      name: "John Doe",
      username: "@johndoe",
      avatar: "/imagesstatic/malvika.jpg",
      lastMessage: "The property is still available?",
      timestamp: "3h ago",
      unread: 1
    },
    // Add more conversations as needed
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[20px] font-semibold">Messages</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <DotsThreeVertical size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-[16px] bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => router.push(`/messages/${conversation.id}`)}
            className="w-full p-4 hover:bg-gray-50 flex items-start gap-3"
          >
            <div className="relative">
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              {conversation.unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-[16px] truncate">{conversation.name}</h3>
                <span className="text-sm text-gray-500">{conversation.timestamp}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 
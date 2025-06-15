"use client"

import { useState } from "react"
import { ArrowLeft, MagnifyingGlass, DotsThreeVertical } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function MessagesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Function to truncate message and add "You: " prefix if needed
  const formatLastMessage = (message: string, isFromMe: boolean) => {
    const prefix = isFromMe ? "You: " : ""
    const truncatedMessage = message.length > 40 ? message.substring(0, 40) + "..." : message
    return prefix + truncatedMessage
  }

  // Mock conversations data with last messages
  const conversations = [
    {
      id: 1,
      name: "John Manual",
      status: "online",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "Perfect! Can we schedule a viewing this weekend?",
      lastMessageFromMe: false,
      timestamp: "10:42 AM",
      unread: 2
    },
    {
      id: 2,
      name: "Alex Carter",
      status: "online",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "I'm doing great! Thanks for asking. How about you?",
      lastMessageFromMe: true,
      timestamp: "9:20 AM",
      unread: 0
    },
    {
      id: 3,
      name: "Sam Taylor",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "You're welcome! Let me know if you need any more information.",
      lastMessageFromMe: true,
      timestamp: "Yesterday",
      unread: 1
    },
    {
      id: 4,
      name: "Jordan Lee",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "Wow, these look fantastic! The design is exactly what I had in mind.",
      lastMessageFromMe: true,
      timestamp: "2:05 PM",
      unread: 0
    },
    {
      id: 5,
      name: "Chris Morgan",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "I've completed the interior design mockups for the living room and bedroom.",
      lastMessageFromMe: false,
      timestamp: "11:30 AM",
      unread: 0
    },
    {
      id: 6,
      name: "Jamie Parker",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "The location looks great for the new property development.",
      lastMessageFromMe: false,
      timestamp: "2 days ago",
      unread: 0
    },
    {
      id: 7,
      name: "Robbin Michel",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "Can we discuss the pricing for the construction project?",
      lastMessageFromMe: false,
      timestamp: "3 days ago",
      unread: 3
    },
    {
      id: 8,
      name: "Taylor Quinn",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "I'm interested in this property. Can you help with the legal documentation?",
      lastMessageFromMe: false,
      timestamp: "1 week ago",
      unread: 0
    },
    {
      id: 9,
      name: "Jordan Lee",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "Wow, these look fantastic! The design is exactly what I had in mind.",
      lastMessageFromMe: true,
      timestamp: "2:05 PM",
      unread: 0
    },
    {
      id: 10,
      name: "Chris Morgan",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "I've completed the interior design mockups for the living room and bedroom.",
      lastMessageFromMe: false,
      timestamp: "11:30 AM",
      unread: 0
    },
    {
      id: 11,
      name: "Jamie Parker",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "The location looks great for the new property development.",
      lastMessageFromMe: false,
      timestamp: "2 days ago",
      unread: 0
    },
    {
      id: 12,
      name: "Robbin Michel",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "Can we discuss the pricing for the construction project?",
      lastMessageFromMe: false,
      timestamp: "3 days ago",
      unread: 3
    },
    {
      id: 13,
      name: "Taylor Quinn",
      status: "",
      avatar: "/stylish-profile-picture.png",
      lastMessage: "I'm interested in this property. Can you help with the legal documentation?",
      lastMessageFromMe: false,
      timestamp: "1 week ago",
      unread: 0
    }
  ]

  return (
    <div className="  min-h-screen w-full bg-white">
      {/* Header */}
      <div className="fixed top-0 z-[50] w-full bg-white border-b z-10">
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
              className="pl-10 py-4 text-[16px] border-0 bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y w-full pt-16">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => router.push(`/chat/${conversation.id}`)}
            className="w-full p-4 hover:bg-gray-50 flex items-start gap-3"
          >
            <div className="relative flex-shrink-0">
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              {conversation.status === "online" && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#FF5631]"></span>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-medium text-[16px] truncate">{conversation.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                  {conversation.unread > 0 && (
                    <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 truncate text-left">
                {formatLastMessage(conversation.lastMessage, conversation.lastMessageFromMe)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
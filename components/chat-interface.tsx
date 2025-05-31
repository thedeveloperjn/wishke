"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Send, Paperclip, Smile, MoreVertical, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ImageIcon, Microphone } from "@phosphor-icons/react/dist/ssr"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "me" | "other"
  timestamp: string
}

interface Contact {
  id: number
  name: string
  status: string
  avatar: string
}

interface ChatInterfaceProps {
  selectedContactId: number
}

export default function ChatInterface({ selectedContactId }: ChatInterfaceProps) {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [messageId, setMessageId] = useState(1000)
  

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const handleScroll = () => {
      setIsScrolled(content.scrollTop > 0)
    }

    content.addEventListener("scroll", handleScroll)
    return () => content.removeEventListener("scroll", handleScroll)
  }, [])

  const [contextMenu, setContextMenu] = useState<{
    show: boolean
    x: number
    y: number
    messageId: number
    message: Message
  } | null>(null)

  const contacts: Record<number, Contact> = {
    1: {
      id: 1,
      name: "John Manual",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40&query=john profile",
    },
    2: {
      id: 2,
      name: "Alex Carter",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40&query=alex profile",
    },
    3: { id: 3, name: "Sam Taylor", status: "", avatar: "/placeholder.svg?height=40&width=40&query=sam profile" },
    4: { id: 4, name: "Jordan Lee", status: "", avatar: "/placeholder.svg?height=40&width=40&query=jordan profile" },
    5: { id: 5, name: "Chris Morgan", status: "", avatar: "/placeholder.svg?height=40&width=40&query=chris profile" },
    6: { id: 6, name: "Jamie Parker", status: "", avatar: "/placeholder.svg?height=40&width=40&query=jamie profile" },
    7: { id: 7, name: "Robbin Michel", status: "", avatar: "/placeholder.svg?height=40&width=40&query=robbin profile" },
    8: { id: 8, name: "Taylor Quinn", status: "", avatar: "/placeholder.svg?height=40&width=40&query=taylor profile" },
  }

  // My profile data
  const myProfile = {
    name: "Malvika Willson",
    avatar: "/placeholder.svg?height=40&width=40&query=malvika profile",
  }

  const dummyConversations: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        text: "Hey! I saw your property listing in Andheri, Mumbai. It looks amazing!",
        sender: "other",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        text: "Hi John! Thanks for your interest. Yes, it's a beautiful 3BHK flat in a prime location.",
        sender: "me",
        timestamp: "10:32 AM",
      },
      { id: 3, text: "What's the rent per month?", sender: "other", timestamp: "10:33 AM" },
      {
        id: 4,
        text: "It's ₹75K per month. The flat comes with modern amenities and is in a secure gated community.",
        sender: "me",
        timestamp: "10:35 AM",
      },
      {
        id: 5,
        text: "That's a good deal. Do you know if parking is included?",
        sender: "other",
        timestamp: "10:37 AM",
      },
      {
        id: 6,
        text: "Yes, parking is included! Each flat gets one dedicated parking space. There's also visitor parking available.",
        sender: "me",
        timestamp: "10:40 AM",
      },
      {
        id: 7,
        text: "Perfect! Can we schedule a viewing this weekend?",
        sender: "other",
        timestamp: "10:42 AM",
      },
      {
        id: 8,
        text: "I'm available on Saturday and Sunday. What time works best for you?",
        sender: "me",
        timestamp: "10:45 AM",
      },
    ],
    2: [
      { id: 1, text: "Hey! How are you doing?", sender: "other", timestamp: "9:15 AM" },
      { id: 2, text: "I'm doing great! Thanks for asking. How about you?", sender: "me", timestamp: "9:20 AM" },
    ],
    3: [
      { id: 1, text: "Thanks for sharing the property details", sender: "other", timestamp: "Yesterday" },
      {
        id: 2,
        text: "You're welcome! Let me know if you need any more information.",
        sender: "me",
        timestamp: "Yesterday",
      },
    ],
    4: [
      {
        id: 1,
        text: "I've finished the architectural plans for your new project. Take a look!",
        sender: "other",
        timestamp: "2:00 PM",
      },
      {
        id: 2,
        text: "Wow, these look fantastic! The design is exactly what I had in mind.",
        sender: "me",
        timestamp: "2:05 PM",
      },
    ],
    5: [
      {
        id: 1,
        text: "I've completed the interior design mockups for the living room and bedroom.",
        sender: "other",
        timestamp: "11:30 AM",
      },
    ],
    6: [
      {
        id: 1,
        text: "The location looks great for the new property development.",
        sender: "other",
        timestamp: "2 days ago",
      },
    ],
    7: [
      {
        id: 1,
        text: "Can we discuss the pricing for the construction project?",
        sender: "other",
        timestamp: "3 days ago",
      },
    ],
    8: [
      {
        id: 1,
        text: "I'm interested in this property. Can you help with the legal documentation?",
        sender: "other",
        timestamp: "1 week ago",
      },
    ],
  }

  const currentContact = contacts[selectedContactId]
  const currentMessages = messages.length > 0 ? messages : dummyConversations[selectedContactId] || []

  useEffect(() => {
    setMessages(dummyConversations[selectedContactId] || [])
  }, [selectedContactId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages, isTyping])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messageId,
        text: message,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, newMessage])
      setMessageId((id) => id + 1)
      setMessage("")

      // Simulate typing indicator and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)

        const responses = [
          "kuch khaya aapne",
          "chlo thik h thda rest kr lena",
          "thda time mil jaye to mujhse mil bhi lena .",
          "thik h call to kar hi sakte ho na ",
          "acha h kam se kam baat to hoye",
          "pata h mere paas aapke liye ek surprise h",
          "Surprise h abhi nhi bta rhi milo fir btati",
          "Okay byee aap kaam krlo  mai bhi chlti hu ",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const responseMessage: Message = {
          id: messageId + 1,
          text: randomResponse,
          sender: "other",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, responseMessage])
        setMessageId((id) => id + 1)
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleMessageClick = (e: React.MouseEvent, message: Message) => {
    e.preventDefault()
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      messageId: message.id,
      message: message,
    })
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  useEffect(() => {
    const handleScroll = () => {
      if (contextMenu) {
        setContextMenu(null)
      }
    }

    const messagesContainer = messagesEndRef.current?.parentElement
    if (messagesContainer) {
      messagesContainer.addEventListener("scroll", handleScroll)
      return () => messagesContainer.removeEventListener("scroll", handleScroll)
    }
  }, [contextMenu])

  if (!currentContact) {
    return (
         <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Contact not found</h3>
          <Button onClick={handleBackToHome}>Back to Home</Button>
        </div>
      </div>
    )
  }

  return (
   <div
        ref={contentRef}
        className={`flex-1 bg-white  overflow-y-auto min-h-[85vh] no-scrollbar transition-all duration-200 ${
          isScrolled ? "rounded-b-lg" : "!rounded-lg"
        }`}
        style={{
          borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
          borderTopRightRadius: isScrolled ? 0 : "0.5rem",
        }}
      >
      {/* Chat Header - Fixed at top */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleBackToHome}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="relative h-10 w-10">
            <Image
              src="/stylish-profile-picture.png"
              alt={currentContact.name}
              fill
              className="rounded-full object-cover"
            />
            {currentContact.status === "online" && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#ff5631]"></span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{currentContact.name}</h3>
            <p className="text-sm text-gray-500">
              {currentContact.status === "online" ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area - Flexible height, bottom aligned when few messages */}
      <div className="flex-1 overflow-y-auto h-[66vh] bg-white">
        <div className="min-h-full flex flex-col justify-end p-6">
          <div className="space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-3 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                {/* Profile Picture for Other User */}
                {msg.sender === "other" && (
                  <div className="relative h-8 w-8 flex-shrink-0">
                    <Image
                      src="/stylish-profile-picture.png"
                      alt={currentContact.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 cursor-pointer transition-all ${
                    msg.sender === "me"
                      ? "bg-[#8E33FF] text-white rounded-br-md"
                      : "bg-[#EFF8F4] text-gray-900 rounded-bl-md"
                  }`}
                  onClick={(e) => handleMessageClick(e, msg)}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>

                {/* Profile Picture for My Messages */}
                {msg.sender === "me" && (
                  <div className="relative h-8 w-8 flex-shrink-0">
                    <Image
                      src="/imagesstatic/malvika.jpg"
                      alt={myProfile.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="relative h-8 w-8 flex-shrink-0">
                  <Image
                    src="/stylish-profile-picture.png"
                    alt={currentContact.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="bg-[#EFF8F4] rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center border border-gray-200 bg-[#F8F8FA] rounded-full px-4 py-2 shadow-sm w-full">
          <Smile className="h-5 w-5 text-gray-400 mr-2" />
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none text-base placeholder-gray-400"
          />
          <Button variant="ghost" size="icon" className="ml-2">
            <Image src="/image.svg" alt="Add Image" width={20} height={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <Image src="/mic.svg" alt="Mic" width={20} height={20} />
          </Button>
          {message.trim() && (
            <Button
              onClick={handleSendMessage}
              className="rounded-full bg-[#8E33FF] hover:bg-[#7A2EE6] px-4 py-2 ml-2"
              size="icon"
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div className="bg-white fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
          <div
            className="fixed z-50 bg-white rounded-lg shadow-xl border py-2 min-w-[180px]"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
              transform: "translate(-50%, -10px)",
            }}
          >
            <button
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
              onClick={() => {
                alert(`Message sent at: ${contextMenu.message.timestamp}`)
                setContextMenu(null)
              }}
            >
              <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-xs font-medium">i</span>
              </div>
              <span>{contextMenu.message.timestamp}</span>
            </button>

            <button
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
              onClick={() => {
                console.log("Forward message:", contextMenu.message.text)
                setContextMenu(null)
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
              Forward
            </button>

            <button
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
              onClick={() => {
                navigator.clipboard.writeText(contextMenu.message.text)
                setContextMenu(null)
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </button>

            {contextMenu.message.sender === "me" && (
              <button
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-red-500"
                onClick={() => {
                  setMessages((prev) => prev.filter((m) => m.id !== contextMenu.messageId))
                  setContextMenu(null)
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Unsend Message
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

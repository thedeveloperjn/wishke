"use client"

import { useParams } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import ChatInterface from "@/components/chat-interface"
import { useState } from "react"

export default function ChatPage() {
  const params = useParams()
  const contactId = Number.parseInt(params.contactId as string)
  const [activeSection, setActiveSection] = useState("home")

  const handleContactSelect = (newContactId: number) => {
    // Navigate to new contact's chat page
    window.location.href = `/chat/${newContactId}`
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
      <Header />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
        <Sidebar />

        {/* Main Chat Content Area */}
        <main className="flex-1 ">
          <div className=" bg-white rounded-[12px]">
            <ChatInterface selectedContactId={contactId} />
          </div>
        </main>

        {/* Right Messages Sidebar */}
        <MessagesSidebar selectedContactId={contactId} onContactSelect={handleContactSelect} />
      </div>
    </div>
  )
}


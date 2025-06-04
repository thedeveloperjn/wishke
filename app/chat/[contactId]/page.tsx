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
    
      
          
            <ChatInterface selectedContactId={contactId} />
       
      
  )
}


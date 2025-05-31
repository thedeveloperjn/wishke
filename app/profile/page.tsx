"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import ProfileContent from "@/components/profile-content"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
      <Header />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
        <Sidebar />

          <ProfileContent />
        
        {/* Right Messages Sidebar */}
        <MessagesSidebar />
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import ProfileContent from "@/components/profile-content"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="min-w-[51%] xl:max-w-[51%]">
<ProfileContent />
    </div>
        
  )
}

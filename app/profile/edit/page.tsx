"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import EditProfileContent from "@/components/edit-profile-content"

export default function EditProfilePage() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
    <Header />
    <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
      <Sidebar />

    

        {/* Main Edit Profile Content Area */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <EditProfileContent />
        </main>
      </div>
    </div>
  )
}

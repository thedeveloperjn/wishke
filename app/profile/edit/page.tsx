"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import EditProfileContent from "@/components/edit-profile-content"

export default function EditProfilePage() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    

        <main className="flex-1  overflow-y-auto h-[calc(85vh)] pb-0">
          <EditProfileContent />
        </main>

  )
}

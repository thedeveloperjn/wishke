"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import ProjectDetailContent from "@/components/project-detail-content"
import MessagesSidebar from "@/components/messages-sidebar"


export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = Number.parseInt(params.id as string)
  const [activeSection, setActiveSection] = useState("projects")
  const [selectedContactId, setSelectedContactId] = useState<number | undefined>()

  const handleContactSelect = (contactId: number) => {
    setSelectedContactId(contactId)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
    <Header />
    <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Project Detail Content - Only in middle section */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="h-full">
            <ProjectDetailContent projectId={projectId} />
          </div>
        </main>

        {/* Right Messages Sidebar */}
        <MessagesSidebar />
      </div>
    </div>
  )
}

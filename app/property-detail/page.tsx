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

        <main className="min-w-[51%] xl:max-w-[51%] flex-1  sm:h-[85vh]">
          <div className="h-full">
            <ProjectDetailContent projectId={projectId} />
          </div>
        </main>

  )
}

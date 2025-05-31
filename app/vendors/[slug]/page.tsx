"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import VendorDetailContent from "@/components/vendor-detail-content"

export default function VendorDetailPage() {
  const params = useParams()
  const vendorId = Number.parseInt(params.id as string)
  const [activeSection, setActiveSection] = useState("vendors")

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
      <Header />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
        {/* Left Sidebar - Fixed width */}
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Vendor Detail Content - Takes all remaining space */}
        <div className="flex-1 ">
          <VendorDetailContent vendorId={vendorId} />
        </div>
      </div>
    </div>
  )
}

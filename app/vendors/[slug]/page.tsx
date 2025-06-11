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
    <div className="w-full md:max-w-[74%]">
          <VendorDetailContent vendorId={vendorId} />
        </div>
     
  )
}

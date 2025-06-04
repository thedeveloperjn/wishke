// components/layout-client.tsx
"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideSidebarRoutes = ["/profile/edit", "/vendors/[slug]"]

  // To handle dynamic route like /vendor/123, match partially
  const shouldHideSidebars = hideSidebarRoutes.some(route =>
    route.includes("[") ? pathname.startsWith("/vendors/") : pathname === route
  )

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
    <Header />
    
    <div className="flex flex-1 p-6 gap-6 pb-[50px] max-h-[86vh] overflow-hidden no-scrollbar">
         <Sidebar />
        {children}
        {!shouldHideSidebars && <MessagesSidebar />}
      </div>
    </div>
  )
}

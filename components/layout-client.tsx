"use client"

import React, { useState ,useEffect } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MessagesSidebar from "@/components/messages-sidebar"
import LoginModal from "./login-modal"
import BottomBar from "./bottom-bar"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideSidebarRoutes = ["/profile/edit", "/vendors/[slug]"]
  const [showLoginModal, setShowLoginModal] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const shouldHideSidebars = hideSidebarRoutes.some(route =>
    route.includes("[") ? pathname.startsWith("/vendors/") : pathname === route
  )
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);
  return (
    <div className="flex min-h-screen-safe  flex-col bg-[#F8F8FA]  no-scrollbar">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <div className="flex flex-1 sm:p-6 sm:pb-0 sm:gap-6 pb-[50px]  h-94vh-safe sm:h-[84vh] overflow-hidden no-scrollbar">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {children}
        {!shouldHideSidebars && <MessagesSidebar />}
        
      </div>
      <BottomBar/>
    </div>
  )
}
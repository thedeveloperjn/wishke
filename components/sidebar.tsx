"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MagnifyingGlass, Compass, FilmReel, Key, Buildings, MagicWand, Cube, UserCircleCheck, Newspaper, CalendarDots, X } from "@phosphor-icons/react/dist/ssr"
import { usePathname, useRouter } from "next/navigation"
import { Home, Film, Building2, FolderKanban, FileText, Users, Briefcase, Calendar, CheckCircle } from "lucide-react"

interface SidebarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps = {}) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const handleScroll = () => {
      setIsScrolled(sidebar.scrollTop > 0)
    }

    sidebar.addEventListener("scroll", handleScroll)
    return () => sidebar.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavigation = (path: string) => {
    router.push(path)
    onClose?.()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isOpen) return
    const touchEnd = e.touches[0].clientX
    if (touchStart - touchEnd > 100) { // Swipe left to close
      onClose?.()
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black bg-opacity-50 z-[998] transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
   
      {/* Close button for mobile - only visible when sidebar is open */}
      <button
        className={`fixed top-4 right-4 p-1 md:hidden z-[1000] bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        onClick={handleClose}
      >
        <X size={24} />
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-[999] md:relative md:z-40 w-[280px] md:w-auto xl:w-[24%] min-w-[80px] flex-col md:flex overflow-y-auto h-[100vh]  sm:h-[calc(100vh-96px)] no-scrollbar transition-transform duration-200 ${
          isScrolled ? "rounded-b-lg" : "rounded-lg"
        } bg-white sm:bg-transparent ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{
          borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
          borderTopRightRadius: isScrolled ? 0 : "0.5rem",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="bg-white p-4 pb-0 sm:pb-4 sm:mb-6 rounded-lg p-3">
          {/* Profile header with image and name */}
          <Link href="/profile">
            <div className="sm:bg-[#F8F8FA] block sm:hidden xl:block gap-2 rounded-lg p-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full flex-shrink-0">
                  <Image src="/imagesstatic/malvika.jpg" alt="Profile" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <h3 className="text-lg font-bold">Malvika Willson</h3>
                    <CheckCircle className="h-5 w-5 text-teal-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">@malvikawill</p>
                </div>
              </div>

              {/* Stats row */}
              <div className=" justify-between hidden xl:flex py-4 px-7">
                <div className="flex flex-col items-center">
                  <span className="font-bold">2.3k</span>
                  <span className="text-xs text-muted-foreground">Follower</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">235</span>
                  <span className="text-xs text-muted-foreground">Following</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">38</span>
                  <span className="text-xs text-muted-foreground">Post</span>
                </div>
              </div>
            </div>
          </Link>
        </div>


      <nav className="bg-white rounded-lg p-4  !mb-10 space-y-2">
        <NavItem
          href="/"
          icon={<MagnifyingGlass  className="min-w-6"  size={24}/>}
          label="Home"
          active={pathname === "/"}
          onClick={() => handleNavigation("/")}
        />
        <NavItem
          href="/discover"
          icon={<Compass  className="min-w-6"  size={24}/>}
          label="Discover"
          active={pathname === "/discover"}
          onClick={() => handleNavigation("/discover")}
        />
        <NavItem
          href="/reels"
          icon={<FilmReel className="min-w-6"  size={24} />}
          label="Reels"
          active={pathname === "/reels"}
          onClick={() => handleNavigation("/reels")}
        />
        <NavItem
          href="/properties"
          icon={<Key className="min-w-6"  size={24} />}
          label="Properties"
          active={pathname === "/properties"}
          onClick={() => handleNavigation("/properties")}
        />
        <NavItem
          href="/projects"
          icon={<Buildings className="min-w-6"  size={24} />}
          label="Projects"
          active={pathname === "/projects"}
          onClick={() => handleNavigation("/projects")}
        />
        <NavItem
          href="/requirements"
          icon={<MagicWand className="min-w-6"  size={24} /> }
          label="Requirements"
          active={pathname === "/requirements"}
          onClick={() => handleNavigation("/requirements")}
        />
        <NavItem
          href="/vendors"
          icon={<Cube className="min-w-6"  size={24} />}
          label="Vendors"
          active={pathname === "/vendors"}
          onClick={() => handleNavigation("/vendors")}
        />
        <NavItem
          href="/portfolio"
          icon={<UserCircleCheck className="min-w-6"  size={24} />}
          label="Portfolios"
          active={pathname === "/portfolio"}
          onClick={() => handleNavigation("/portfolio")}
        />
        <NavItem
          href="/events"
          icon={<CalendarDots className="min-w-6" size={24} />}
          label="Events"
          active={pathname === "/events"}
          onClick={() => handleNavigation("/events")}
        />
        <NavItem
          href="/news"
          icon={<Newspaper className="min-w-6" size={24} />}
          label="News"
          active={pathname === "/news"}
          onClick={() => handleNavigation("/news")}
        />
      </nav>
    </aside>
      </>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  href: string
  onClick?: () => void
}

function NavItem({ icon, label, active, href, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[16px] font-medium ${
        active ? "bg-[#EFF8F4] text-[#01A76F]" : "text-muted-foreground hover:bg-[#000000] hover:bg-opacity-[3%] hover:text-foreground"
      }`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {icon}
     <p className="block sm:hidden xl:block hover:block">{label}</p> 
    </Link>
  )
}
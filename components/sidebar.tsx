"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MagnifyingGlass,Compass, FilmReel, Key, Buildings, MagicWand, Cube, UserCircleCheck,
  Newspaper, CalendarDots     } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Film,
  Building2,
  FolderKanban,
  FileText,
  Users,
  Briefcase,
  Calendar,
  CheckCircle,
 
} from "lucide-react"

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps = {}) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
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

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <aside
      ref={sidebarRef}
      className={`hidden w-[24%] flex-col  md:flex  overflow-y-auto h-[calc(100vh-96px)] no-scrollbar  transition-all duration-200 ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="bg-white  p-4 mb-6 rounded-lg  p-3">
        {/* Profile header with image and name */}
        <Link href="/profile" >
        <div className="bg-[#F8F8FA] gap-2 rounded-lg p-2">
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
        <div className="flex justify-between py-4 px-7">
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
          icon={<MagnifyingGlass  size={24}/>}
          label="Home"
          active={pathname === "/"}
          onClick={() => handleNavigation("/")}
        />
        <NavItem
          href="/discover"
          icon={<Compass  size={24}/>}
          label="Discover"
          active={pathname === "/discover"}
          onClick={() => handleNavigation("/discover")}
        />
        <NavItem
          href="/reels"
          icon={<FilmReel size={24} />}
          label="Reels"
          active={pathname === "/reels"}
          onClick={() => handleNavigation("/reels")}
        />
        <NavItem
          href="/properties"
          icon={<Key size={24} />}
          label="Properties"
          active={pathname === "/properties"}
          onClick={() => handleNavigation("/properties")}
        />
        <NavItem
          href="/projects"
          icon={<Buildings size={24} />}
          label="Projects"
          active={pathname === "/projects"}
          onClick={() => handleNavigation("/projects")}
        />
        <NavItem
          href="/requirements"
          icon={<MagicWand size={24} /> }
          label="Requirements"
          active={pathname === "/requirements"}
          onClick={() => handleNavigation("/requirements")}
        />
        <NavItem
          href="/vendors"
          icon={<Cube size={24} />}
          label="Vendors"
          active={pathname === "/vendors"}
          onClick={() => handleNavigation("/vendors")}
        />
        <NavItem
          href="/portfolio"
          icon={<UserCircleCheck size={24} />}
          label="Portfolios"
          active={pathname === "/portfolio"}
          onClick={() => handleNavigation("/portfolio")}
        />
        <NavItem
          href="/events"
          icon={<CalendarDots size={24} />}
          label="Events"
          active={pathname === "/events"}
          onClick={() => handleNavigation("/events")}
        />
        <NavItem
          href="/news"
          icon={<Newspaper size={24} />}
          label="News"
          active={pathname === "/news"}
          onClick={() => handleNavigation("/news")}
        />
      </nav>
    </aside>
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
      {label}
    </Link>
  )
}

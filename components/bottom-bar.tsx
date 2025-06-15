"use client"
import { ChatTeardropDots, House, MagnifyingGlass, MonitorPlay } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

export default function BottomBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [showSearch, setShowSearch] = useState(false)

  const handleSearchClick = () => {
    if (pathname === '/search') {
      router.back()
    } else {
      router.push('/search')
    }
  }

  return (
    <div style={{
      paddingBottom: "env(safe-area-inset-bottom)",
    }} className="block sm:hidden bg-white fixed bottom-0 w-full border-t">
      <div className="flex py-1">
        <button 
          onClick={() => router.push('/')} 
          className={`w-[21%] flex justify-center items-center ${pathname === '/' ? 'text-gray-800' : 'text-gray-600'}`}
        >
          <House size={24} weight={pathname === '/' ? "fill" : "regular"} />
        </button>
        <button 
          onClick={() => router.push('/reels')} 
          className={`w-[21%] flex justify-center items-center ${pathname === '/reels' ? 'text-gray-800' : 'text-gray-600'}`}
        >
          <MonitorPlay size={24} weight={pathname === '/reels' ? "fill" : "regular"} />
        </button>
        <button 
          onClick={() => router.push('/')} 
          className="w-[16%] flex justify-center rotate-[180deg] items-center"
        >
          <Image src="/imagesstatic/logo.png" height={40} width={40} alt="logo" />
        </button>
        <button 
          onClick={handleSearchClick}
          className={`w-[21%] flex justify-center items-center ${pathname === '/search' ? 'text-gray-800' : 'text-gray-600'}`}
        >
          <MagnifyingGlass size={24} weight={pathname === '/search' ? "fill" : "regular"} />
        </button>
        <button 
          onClick={() => router.push('/messages')} 
          className={`w-[21%] flex justify-center items-center ${pathname === '/messages' ? 'text-gray-800' : 'text-gray-600'}`}
        >
          <ChatTeardropDots size={24} weight={pathname === '/messages' ? "fill" : "regular"} />
        </button>
      </div>
    </div>
  )
}

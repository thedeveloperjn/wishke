"use client"

import { useState } from "react"
import { Buildings, Binoculars, CalendarDots, Newspaper, Image as ImageIcon, Package, MonitorPlay } from "@phosphor-icons/react/dist/ssr"

interface CategoryTabsProps {
  onCategoryClick: (category: string) => void
}

export default function CategoryTabs({ onCategoryClick }: CategoryTabsProps) {
  const categories = [
    { id: 0 ,name: "Reels", icon:<MonitorPlay size={24} />  ,color:"#8E33FF"},
    { id: 1, name: "Properties", icon: <Buildings size={24} />, color: "#F66488" },
    { id: 2, name: "Requirements", icon: <Binoculars size={24} />, color: "#A769F4" },
    { id: 3, name: "Events", icon: <CalendarDots size={24} />, color: "#FF923F" },
    { id: 4, name: "News", icon: <Newspaper size={24} />, color: "#00B798" },
    { id: 5, name: "Portfolios", icon: <ImageIcon size={24} />, color: "#FF5631" },
    { id: 6, name: "Products", icon: <Package size={24} />, color: "#00B8D9" },
  ]

  const [active, setActive] = useState<number>(1) // Default to Properties

  function hexToRgba(hex: string, alpha: number) {
    let r = 0, g = 0, b = 0
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16)
      g = parseInt(hex[3] + hex[4], 16)
      b = parseInt(hex[5] + hex[6], 16)
    }
    return `rgba(${r},${g},${b},${alpha})`
  }

  const handleTabClick = (categoryId: number, categoryName: string) => {
    setActive(categoryId)
    onCategoryClick(categoryName)
  }

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4 sm:gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((category) => {
        const isActive = active === category.id
        return (
          <button
            key={category.id}
            onClick={() => handleTabClick(category.id, category.name)}
            className="flex items-center gap-3 whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium transition-colors"
            style={{
              color: isActive ? category.color : "#919191",
            }}
            onMouseOver={(e) => {
              if (window.innerWidth >= 640) {
                e.currentTarget.style.background = hexToRgba(category.color, 0.16)
              }
            }}
            onMouseOut={(e) => {
              if (window.innerWidth >= 640) {
                e.currentTarget.style.background = ""
              }
            }}
          >
            <span 
              className={`rounded-xl p-2 sm:p-0 sm:rounded-none transition-colors
                ${isActive ? 'sm:bg-transparent' : ''}`}
              style={{ 
                background: window.innerWidth < 640 
                  ? hexToRgba(category.color, 0.08)
                  : 'transparent',
                color: category.color
              }}
            >
              {category.icon}
            </span>
            <span>{category.name}</span>
          </button>
        )
      })}
    </div>
  )
}

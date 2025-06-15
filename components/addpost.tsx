"use client"

import { useState, useRef, TouchEvent, useEffect } from "react"
import { Smile } from "lucide-react"
import { PaperPlaneRight, Plus } from "@phosphor-icons/react/dist/ssr"
import CategoryTabs from "./category-tabs"
import CreatePostModal from "./create-post-modal"

const AddPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Control body overflow when modal is open
  useEffect(() => {
    if (isBottomSheetOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isBottomSheetOpen])

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    const currentTouch = e.touches[0].clientY
    setTouchEnd(currentTouch)
    
    // Calculate drag distance
    const dragDistance = currentTouch - touchStart
    if (dragDistance > 0 && modalRef.current) {
      // Only allow dragging down
      modalRef.current.style.transform = `translateY(${dragDistance}px)`
      // Add opacity to overlay based on drag distance
      if (overlayRef.current) {
        const opacity = Math.max(0, 0.5 - (dragDistance / 500))
        overlayRef.current.style.opacity = opacity.toString()
      }
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (modalRef.current) {
      const dragDistance = touchEnd - touchStart
      if (dragDistance > 100) {
        // If dragged down more than 100px, close the modal
        setIsBottomSheetOpen(false)
      }
      // Reset transform and overlay opacity
      modalRef.current.style.transform = ''
      if (overlayRef.current) {
        overlayRef.current.style.opacity = ''
      }
    }
  }

  const handleInputClick = () => {
    setSelectedCategory("Properties")
    setIsModalOpen(true)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
    setIsBottomSheetOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen)
  }

  return (
    <>
      <div className="mb-4 hidden sm:block rounded-lg space-y-4 bg-white p-4">
        <div className="flex items-center gap-3 border-b border-[#E9E9E9] pb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Post, What's on your mind?"
              className="w-full border-none rounded-[8px] px-4 text-[18px] py-[8px] bg-[#F8F8FA] outline-none"
              onClick={handleInputClick}
              readOnly
            />
            <button className="absolute right-2 top-2.5 text-muted-foreground">
              <Smile className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <button className="rounded-md bg-[#01A76F] px-8 py-2 text-white">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">Post</span>
              <PaperPlaneRight size={20} />
            </div>
          </button>
        </div>
        <CategoryTabs onCategoryClick={handleCategoryClick} />
      </div>

      <div 
        className="block sm:hidden fixed bottom-[60px] z-[95] p-4 rounded-[10px] right-[20px] bg-[#01A76F] cursor-pointer"
        onClick={toggleBottomSheet}
      >
        <Plus 
          size={20} 
          fill="#ffffff" 
          className={`transition-transform duration-300 ${isBottomSheetOpen ? 'rotate-45' : 'rotate-0'}`}
        />
      </div>

      <div 
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 sm:hidden touch-none
          ${isBottomSheetOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsBottomSheetOpen(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={modalRef}
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] transition-transform duration-300
            ${isBottomSheetOpen ? 'translate-y-0' : 'translate-y-full'}
            ${isDragging ? 'transition-none' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="relative w-full flex items-center justify-center -mt-[40px] z-[101]">
            <button 
              onClick={() => setIsBottomSheetOpen(false)}
              className={`p-2 bg-white rounded-full shadow-lg transition-all duration-300
                ${isBottomSheetOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <Plus size={20} className="rotate-45 text-gray-900" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full mb-4 cursor-grab active:cursor-grabbing touch-none" />
            </div>

            <CategoryTabs onCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
    </>
  )
}

export default AddPost

"use client"

import { useState } from "react"
import { Smile } from "lucide-react"
import { PaperPlaneRight } from "@phosphor-icons/react/dist/ssr"
import CategoryTabs from "./category-tabs"
import CreatePostModal from "./create-post-modal"

const AddPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleInputClick = () => {
    setSelectedCategory("Properties")
    setIsModalOpen(true)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
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

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
    </>
  )
}

export default AddPost

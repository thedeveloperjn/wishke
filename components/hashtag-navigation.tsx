"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const hashtags = [
  "RealEstate",
  "RealEstateIndia",
  "HomeSweetHome",
  "LuxuryLiving",
  "Mumbai",
  "Rental",
  "PropertySearch",
  "ModernLiving",
  "GatedCommunity",
  "PremiumHomes",
  "FamilyFriendly",
]

interface HashtagNavigationProps {
  selectedHashtag: string | null
  onHashtagSelect: (hashtag: string | null) => void
}

export default function HashtagNavigation({ selectedHashtag, onHashtagSelect }: HashtagNavigationProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-hide px-2 "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {hashtags.map((hashtag) => (
        <Button
        key={hashtag}
        variant="ghost"
        size="sm"
        onClick={() => onHashtagSelect(selectedHashtag === hashtag ? null : hashtag)}
        className={cn(
          "whitespace-nowrap text-sm font-medium px-3 !py-6 rounded-none  flex-shrink-0",
          selectedHashtag === hashtag
            ? "border-b-[2px] border-gray-900 sm:border-[#8E33FF] !bg-white text-gray-800  sm:text-[#8E33FF]"
            : "text-[#909EAB] hover:text-gray-800 hover:bg-transparent ",
        )}
      >
          #{hashtag}
        </Button>
      ))}
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X, MoreHorizontal, ChevronLeft, ChevronRight, Trash2, Eye } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface StoryItem {
  id?: string
  type: "image" | "video"
  url: string
  duration: number
  caption?: string
  viewers?: { id: number; name: string; image: string }[]
}

interface Story {
  id: number
  name: string
  image: string
  storyItems: StoryItem[]
  timestamp: string
  isUser?: boolean
}

interface StoryViewerProps {
  stories: Story[]
  initialStoryIndex: number
  initialItemIndex?: number
  onClose: () => void
  onStoryItemView: (storyId: number, storyItemId: string) => void
  onDeleteStory: (storyId: number) => void
  onDeleteStoryItem: (storyId: number, itemIndex: number) => void
  viewedStoryItems: Map<number, Set<string>>
}

export default function StoryViewer({
  stories,
  initialStoryIndex,
  initialItemIndex = 0,
  onClose,
  onStoryItemView,
  onDeleteStory,
  onDeleteStoryItem,
  viewedStoryItems,
}: StoryViewerProps) {
  const safeInitialIndex = Math.min(Math.max(0, initialStoryIndex), stories.length - 1)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(safeInitialIndex)
  const [currentItemIndex, setCurrentItemIndex] = useState(initialItemIndex)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showViewers, setShowViewers] = useState(false)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isActiveRef = useRef(true)

  const story = stories[currentStoryIndex] || stories[0]
  const previousStoryIdRef = useRef(story.id)
  const storyItems = story.storyItems || []
  const safeItemIndex = Math.min(Math.max(0, currentItemIndex), Math.max(0, storyItems.length - 1))
  const storyItem = storyItems[safeItemIndex] || { type: "image", url: "/placeholder.svg", duration: 5 }
  const isUserStory = story.isUser
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Reset progress when changing items
  useEffect(() => {
    setProgress(0)
  }, [currentStoryIndex, safeItemIndex])

  // Handle progress animation
  useEffect(() => {
    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (storyItem.duration * 10))
          if (newProgress >= 100) {
            clearInterval(progressIntervalRef.current as NodeJS.Timeout)
            goToNextItem()
            return 0
          }
          return newProgress
        })
      }, 100)

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      }
    }
  }, [isPaused, currentStoryIndex, safeItemIndex, storyItem.duration])

  // Mark story as viewed
  useEffect(() => {
    if (storyItem.id && !viewedStoryItems.get(story.id)?.has(storyItem.id)) {
      onStoryItemView(story.id, storyItem.id)
    }
  }, [currentStoryIndex, safeItemIndex, story.id, storyItem.id, viewedStoryItems, onStoryItemView])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPreviousItem()
      } else if (e.key === "ArrowRight") {
        goToNextItem()
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const goToNextItem = () => {
    if (safeItemIndex < storyItems.length - 1) {
      setCurrentItemIndex(safeItemIndex + 1)
    } else if (currentStoryIndex < stories.length - 1) {
      setDirection(1)
      previousStoryIdRef.current = story.id
      setCurrentStoryIndex(currentStoryIndex + 1)
      setCurrentItemIndex(0)
    } else {
      onClose()
    }
  }

  const goToPreviousItem = () => {
    if (safeItemIndex > 0) {
      setCurrentItemIndex(safeItemIndex - 1)
    } else if (currentStoryIndex > 0) {
      setDirection(-1)
      previousStoryIdRef.current = story.id
      setCurrentStoryIndex(currentStoryIndex - 1)
      setCurrentItemIndex((stories[currentStoryIndex - 1].storyItems.length || 1) - 1)
    }
  }

  const handleMouseDown = () => {
    setIsPaused(true)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }

  const handleMouseUp = () => {
    setIsPaused(false)
  }

  const handleDeleteStory = () => {
    onDeleteStory(story.id)
  }

  const handleDeleteStoryItem = () => {
    onDeleteStoryItem(story.id, safeItemIndex)
    if (storyItems.length <= 1) {
      onClose()
    } else if (safeItemIndex === storyItems.length - 1) {
      setCurrentItemIndex(safeItemIndex - 1)
    }
  }

  const isDifferentUser = story.id !== previousStoryIdRef.current

  const variants = {
    enter: (direction: number) => ({
      x: direction * 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction * -300,
      opacity: 0,
    }),
  }

  const ProgressBars = () => (
    <div className={`flex gap-1 ${isMobile ? "p-2" : ""}`}>
      {storyItems.map((_, idx) => (
        <div key={idx} className="h-1 bg-gray-200 bg-opacity-50 flex-1 rounded-full overflow-hidden">
          {idx < safeItemIndex ? (
            <div className="h-full w-full bg-[#8E33FF]" />
          ) : idx === safeItemIndex ? (
            <div
              className="h-full bg-[#8E33FF]"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          ) : null}
        </div>
      ))}
    </div>
  )

  const viewers = storyItem.viewers || []

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[15px] flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white z-50">
        <X className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          goToPreviousItem()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-50"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          goToNextItem()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-50"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="relative w-full max-w-[360px] h-[96vh] flex flex-col">
        {/* Web View Header - Above Content */}
        {!isMobile && (
          <div className="w-full py-2 space-y-4 z-50">
            <div className="flex items-center mb-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                <Image src={story.image} alt={story.name} fill className="object-cover" />
              </div>
              <div className="ml-2 text-white">
                <p className="font-semibold text-sm">
                  {story.name} <span className="text-xs opacity-80 ml-1">{formatTimeAgo(story.timestamp)}</span>
                </p>
              </div>
              <div className="ml-auto flex items-center gap-4">
                {isUserStory && (
                  <button
                    className="text-white relative"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsPaused(true)
                      setShowViewers(true)
                    }}
                  >
                    <Eye className="h-5 w-5" />
                    {viewers.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] text-white">
                        {viewers.length}
                      </span>
                    )}
                  </button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsPaused(true)
                      }}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56" onCloseAutoFocus={() => setIsPaused(false)}>
                    {isUserStory && (
                      <>
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500 cursor-pointer"
                          onClick={handleDeleteStoryItem}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete This Item</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500 cursor-pointer"
                          onClick={handleDeleteStory}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Entire Story</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem className="cursor-pointer">
                      <span>Report</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <span>Share</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <ProgressBars />
          </div>
        )}

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={isDifferentUser ? `story-${story.id}` : `story-${story.id}-item-${safeItemIndex}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 relative overflow-hidden"
          >
            {/* Mobile View Header - Over Content */}
            {isMobile && (
              <div className="absolute top-0 left-0 right-0 z-40">
                <ProgressBars />
                <div className="p-4 flex items-center">
                  <div className="flex items-center mt-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                      <Image src={story.image} alt={story.name} fill className="object-cover" />
                    </div>
                    <div className="ml-3 text-white">
                      <p className="font-semibold">
                        {story.name} <span className="text-xs opacity-80 ml-1">{formatTimeAgo(story.timestamp)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-4">
                    {isUserStory && (
                      <button
                        className="text-white relative"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsPaused(true)
                          setShowViewers(true)
                        }}
                      >
                        <Eye className="h-5 w-5" />
                        {viewers.length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] text-white">
                            {viewers.length}
                          </span>
                        )}
                      </button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsPaused(true)
                          }}
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56" onCloseAutoFocus={() => setIsPaused(false)}>
                        {isUserStory && (
                          <>
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500 cursor-pointer"
                              onClick={handleDeleteStoryItem}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete This Item</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500 cursor-pointer"
                              onClick={handleDeleteStory}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete Entire Story</span>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="cursor-pointer">
                          <span>Report</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <span>Share</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="h-full w-full rounded-[12px] overflow-hidden">
              {storyItem.type === "image" ? (
                <Image
                  src={storyItem.url}
                  alt="Story"
                  fill
                  className="rounded-[12px] overflow-hidden object-cover"
                  priority
                />
              ) : (
                <video
                  src={storyItem.url}
                  className="h-full w-full object-cover"
                  autoPlay
                  playsInline
                />
              )}

              {storyItem.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-sm">{storyItem.caption}</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Controls (same for both web and mobile) */}
        <div className="py-3 flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-white border border-white bg-white/20 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>

          <div className="flex-1 h-full px-2 border border-white bg-white/20 rounded-full flex items-center">
            <input
              type="text"
              placeholder="Comment..."
              className="bg-transparent text-white text-sm w-full outline-none"
              onClick={(e) => {
                e.stopPropagation()
                setIsPaused(true)
              }}
              onBlur={() => setIsPaused(false)}
            />
          </div>
        </div>
      </div>

      {/* Viewers Dialog */}
      <Dialog
        open={showViewers}
        onOpenChange={(open) => {
          setShowViewers(open)
          if (!open) setIsPaused(false)
        }}
      >
        <DialogContent className="sm:max-w-md bg-white/5 backdrop-blur-md border-0">
          <DialogHeader>
            <DialogTitle>Viewers</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {viewers.length > 0 ? (
              viewers.map((viewer) => (
                <div key={viewer.id} className="flex items-center gap-3 py-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={viewer.image} alt={viewer.name} fill className="object-cover" />
                  </div>
                  <span className="font-medium">{viewer.name}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No viewers yet</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date()
  const storyTime = new Date(timestamp)
  const diffMs = now.getTime() - storyTime.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours >= 24) return "1d ago"
  if (diffHours >= 1) return `${diffHours}h ago`
  return `${diffMins}m ago`
}
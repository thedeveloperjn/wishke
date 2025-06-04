"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import { Plus, Eye, PlusCircle } from "lucide-react"
import StoryViewer from "./story-viewer"
import StoryCreator from "./story-creator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function StorySection() {
  const [activeStory, setActiveStory] = useState<number | null>(null)
  const [activeStoryItemIndex, setActiveStoryItemIndex] = useState<number>(0)
  const [viewedStoryItems, setViewedStoryItems] = useState<Map<number, Set<string>>>(new Map())
  const [deletedStories, setDeletedStories] = useState<Set<number>>(new Set())
  const [deletedStoryItems, setDeletedStoryItems] = useState<Map<number, Set<number>>>(new Map())
  const [showStoryCreator, setShowStoryCreator] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [userStories, setUserStories] = useState<any[]>([])
  const viewedItemsRef = useRef(new Map<number, Set<string>>())

  // Mock stories data with timestamps and unique IDs for story items
  const initialStoriesData = [
    {
      id: 1,
      name: "Your Story",
      isUser: true,
      image: "/imagesstatic/malvika.jpg",
      storyItems: [
        {
          id: "1-1",
          type: "image",
          url: "/sam-taylor.png",
          duration: 15,
          viewers: [
            { id: 101, name: "Emma Wilson", image: "/sam-taylor.png" },
            { id: 102, name: "Michael Brown", image: "/sam-taylor.png" },
          ],
        },
        {
          id: "1-2",
          type: "image",
          url: "/sam-taylor.png",
          duration: 15,
          viewers: [
            { id: 101, name: "Emma Wilson", image: "/sam-taylor.png" },
            { id: 103, name: "Sophia Davis", image: "/sam-taylor.png" },
          ],
        },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 2,
      name: "John Manual",
      image: "/imagesstatic/1.jpg",
      storyItems: [
        { id: "2-1", type: "image", url: "/luxury-lobby.png", duration: 15 },
        { id: "2-2", type: "image", url: "/luxury-bungalow-pool.png", duration: 15 },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 3,
      name: "Alex Carter",
      image: "/imagesstatic/2.jpg",
      storyItems: [
        { id: "3-1", type: "video", url: "/property-2.mp4", duration: 15 },
        { id: "3-2", type: "video", url: "/property-3.mp4", duration: 15 },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
      id: 4,
      name: "Sam Taylor",
      image: "/imagesstatic/3.jpg",
      storyItems: [{ id: "4-1", type: "video", url: "/property-1.mp4", duration: 15 }],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    },
    {
      id: 5,
      name: "Jordan Lee",
      image: "/imagesstatic/4.jpg",
      storyItems: [
        { id: "5-1", type: "image", url: "/chris-morgan.png", duration: 15 },
        { id: "5-2", type: "image", url: "/jamie-parker.png", duration: 15 },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    },
    {
      id: 6,
      name: "Chris Morgan",
      image: "/imagesstatic/5.jpg",
      storyItems: [{ id: "6-1", type: "image", url: "/chris-morgan.png", duration: 15 }],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
    },
    {
      id: 7,
      name: "Jamie Parker",
      image: "/imagesstatic/6.jpg",
      storyItems: [{ id: "7-1", type: "image", url: "/jamie-parker.png", duration: 15 }],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.5).toISOString(), // 23.5 hours ago
    },
  ]

  const [storiesData, setStoriesData] = useState(initialStoriesData)

  // Initialize user stories
  useEffect(() => {
    const userStory = storiesData.find((story) => story.isUser)
    if (userStory) {
      setUserStories(userStory.storyItems)
    }
  }, [])

  // Get user story data
  const userStory = useMemo(() => {
    return storiesData.find((story) => story.isUser)
  }, [storiesData])

  // Process stories with deleted items filtered out
  const processedStories = useMemo(() => {
    return storiesData.map((story) => {
      // Filter out deleted story items
      const deletedItems = deletedStoryItems.get(story.id) || new Set()
      const filteredItems = story.storyItems.filter((_, index) => !deletedItems.has(index))

      return {
        ...story,
        storyItems: filteredItems,
      }
    })
  }, [storiesData, deletedStoryItems])

  // Filter out deleted stories, stories with no items, and stories older than 24 hours
  const stories = useMemo(() => {
    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    return processedStories
      .filter((story) => !story.isUser) // Filter out user story (we'll handle it separately)
      .filter((story) => !deletedStories.has(story.id))
      .filter((story) => story.storyItems.length > 0) // Filter out stories with no items
      .filter((story) => new Date(story.timestamp) > twentyFourHoursAgo)
  }, [processedStories, deletedStories])

  // Check if user has an active story
  const hasActiveUserStory = useMemo(() => {
    if (!userStory) return false

    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const userStoryProcessed = processedStories.find((s) => s.id === userStory.id)

    return (
      !deletedStories.has(userStory.id) &&
      userStoryProcessed?.storyItems.length! > 0 &&
      new Date(userStory.timestamp) > twentyFourHoursAgo
    )
  }, [userStory, processedStories, deletedStories])

  // Get processed user story
  const processedUserStory = useMemo(() => {
    return processedStories.find((story) => story.isUser)
  }, [processedStories])

  // Check if ALL story items for a story have been viewed
  const isStoryFullyViewed = (storyId: number) => {
    const story = processedStories.find((s) => s.id === storyId)
    if (!story) return false

    const viewedItems = viewedItemsRef.current.get(storyId) || new Set()

    // Check if all story items have been viewed
    return story.storyItems.every((item) => viewedItems.has(item.id || ""))
  }

  // Find the index of the first unviewed story item
  const findFirstUnviewedItemIndex = (storyId: number) => {
    const story = processedStories.find((s) => s.id === storyId)
    if (!story) return 0

    const viewedItems = viewedItemsRef.current.get(storyId) || new Set()

    // Find the index of the first unviewed item
    const index = story.storyItems.findIndex((item) => item.id && !viewedItems.has(item.id))

    // If all items are viewed, return 0, otherwise return the found index
    return index === -1 ? 0 : index
  }

  // Sort stories: unviewed first, then fully viewed, and always put user story first
  const sortedStories = useMemo(() => {
    // Separate stories into unviewed and fully viewed
    const unviewedStories = stories.filter((story) => !isStoryFullyViewed(story.id))
    const fullyViewedStories = stories.filter((story) => isStoryFullyViewed(story.id))

    // Sort unviewed stories by timestamp (newest first)
    const sortedUnviewed = unviewedStories.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    // Sort viewed stories by timestamp (newest first)
    const sortedFullyViewed = fullyViewedStories.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    // Combine the arrays: unviewed first, then fully viewed
    const combinedStories = [...sortedUnviewed, ...sortedFullyViewed]

    // If user has an active story, add it to the beginning of the array
    if (hasActiveUserStory && processedUserStory) {
      return [processedUserStory, ...combinedStories]
    }

    return combinedStories
  }, [stories, hasActiveUserStory, processedUserStory])

  const handleStoryClick = (index: number, isUserStoryPlaceholder = false) => {
    if (isUserStoryPlaceholder) {
      setShowStoryCreator(true)
      return
    }

    const storyId = sortedStories[index].id
    const firstUnviewedIndex = findFirstUnviewedItemIndex(storyId)
    setActiveStory(index)
    setActiveStoryItemIndex(firstUnviewedIndex)
  }

  const handleCloseStory = () => {
    setActiveStory(null)
    setActiveStoryItemIndex(0)
  }

  const handleDeleteStory = (storyId: number) => {
    setDeletedStories((prev) => {
      const newSet = new Set(prev)
      newSet.add(storyId)
      return newSet
    })
    setActiveStory(null)
  }

  const handleDeleteStoryItem = (storyId: number, itemIndex: number) => {
    setDeletedStoryItems((prev) => {
      const newMap = new Map(prev)
      const storyItems = newMap.get(storyId) || new Set()
      storyItems.add(itemIndex)
      newMap.set(storyId, storyItems)
      return newMap
    })
  }

  // Mark a story item as viewed and trigger re-render
  const handleStoryItemView = (storyId: number, storyItemId: string) => {
    const newMap = new Map(viewedItemsRef.current)
    const storyItems = newMap.get(storyId) || new Set()

    if (!storyItems.has(storyItemId)) {
      const newSet = new Set(storyItems)
      newSet.add(storyItemId)
      newMap.set(storyId, newSet)
      viewedItemsRef.current = newMap
      setViewedStoryItems(new Map(newMap)) // Force re-render to update sorting
    }
  }

  const handleCreateStory = (newStoryData: any) => {
    const newStoryItemId = `1-${Date.now()}`
    const newStoryItem = {
      id: newStoryItemId,
      type: newStoryData.type || "image",
      url: newStoryData.url,
      duration: newStoryData.duration || 15,
      caption: newStoryData.caption,
      viewers: [],
      timestamp: new Date().toISOString(),
    }

    setUserStories((prev) => [...prev, newStoryItem])

    setStoriesData((prev) => {
      return prev.map((story) => {
        if (story.isUser) {
          setDeletedStories((prevDeleted) => {
            const newDeleted = new Set(prevDeleted)
            newDeleted.delete(story.id)
            return newDeleted
          })

          return {
            ...story,
            storyItems: [...story.storyItems, newStoryItem],
            timestamp: new Date().toISOString(),
          }
        }
        return story
      })
    })

    setShowStoryCreator(false)
  }

  const handleViewUserStory = () => {
    setPopoverOpen(false)
    if (hasActiveUserStory) {
      handleStoryClick(0)
    }
  }

  const handleAddStory = () => {
    setPopoverOpen(false)
    setShowStoryCreator(true)
  }

  return (
    <>
      <div className=" flex overflow-x-auto no-scrollbar story-section">
        {/* Always show "Your Story" first */}
        {userStory && (
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <div key="your-story" className="flex flex-col items-center gap-1 cursor-pointer relative">
                <div className="relative">
                  <div
                    className={`flex justify-center items-center relative h-[85px] w-[85px] rounded-full ${
                      hasActiveUserStory && isStoryFullyViewed(userStory.id)
                      ? "bg-gradient-to-r from-[#FFD78A]/30 to-[#F4762D]/30"
                      : "bg-gradient-to-r from-[#FFD78A] to-[#F4762D]"
                  } !p-[2px]`}
                  >
                  
                  <div className="relative flex justify-center items-center h-[100%] w-[100%]  rounded-full border-[3px] border-white overflow-hidden bg-white">
                    <Image src={userStory.image || "/placeholder.svg"}
                        alt={userStory.name}
                        fill
                        className="object-cover" />
                  
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white z-10">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-[14px] text-[#637481] pt-2">{userStory.name}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 shadow-lg border-0 bg-white/90 backdrop-blur-md">
              <div className="py-1">
                {hasActiveUserStory && (
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-muted/50"
                    onClick={handleViewUserStory}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Your Story</span>
                  </button>
                )}
                <button
                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-muted/50"
                  onClick={handleAddStory}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Add New Story</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Show other stories */}
        {sortedStories.map((story, index) => {
          if (story.isUser) return null

          const isFullyViewed = isStoryFullyViewed(story.id)
          const storyIndex = hasActiveUserStory ? index : index

          return (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1 cursor-pointer relative"
              onClick={() => handleStoryClick(storyIndex)}
            >
              <div className="relative">
                <div
                  className={ `flex justify-center items-center relative h-[85px] w-[85px] rounded-full ${
                    isFullyViewed
                      ? "bg-gradient-to-r from-[#FFD78A]/30 to-[#F4762D]/30"
                      : "bg-gradient-to-r from-[#FFD78A] to-[#F4762D]"
                  } !p-[2px] `}
                >
                  <div className="relative  h-[81px] w-[81px]   overflow-hidden">
                    <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover border-white border-[3px] rounded-full " />
                  </div>
                </div>
              </div>
              <span className="text-[14px] text-[#637481] pt-2">{story.name}</span>
            </div>
          )
        })}
      </div>

      {activeStory !== null && (
        <StoryViewer
          stories={sortedStories}
          initialStoryIndex={activeStory}
          initialItemIndex={activeStoryItemIndex}
          onClose={handleCloseStory}
          onStoryItemView={handleStoryItemView}
          onDeleteStory={handleDeleteStory}
          onDeleteStoryItem={handleDeleteStoryItem}
          viewedStoryItems={viewedItemsRef.current}
        />
      )}

      {showStoryCreator && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[7px] flex items-center justify-center">
          <StoryCreator onClose={() => setShowStoryCreator(false)} onCreateStory={handleCreateStory} />
        </div>
      )}
    </>
  )
}
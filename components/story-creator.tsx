"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Camera, Smile, Send, ImageIcon, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface StoryCreatorProps {
  onClose: () => void
  onCreateStory: (storyData: any) => void
}

export default function StoryCreator({ onClose, onCreateStory }: StoryCreatorProps) {
  const [selectedTab, setSelectedTab] = useState("upload")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [duration, setDuration] = useState(15)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewType, setPreviewType] = useState<"image" | "video">("image")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setPreviewType("image")
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll create a local URL
      const videoUrl = URL.createObjectURL(file)
      setSelectedImage(videoUrl)
      setPreviewType("video")
    }
  }

  const handleSubmit = () => {
    if (selectedImage) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        onCreateStory({
          type: previewType,
          url: selectedImage,
          caption,
          duration,
          timestamp: new Date().toISOString(),
        })
        setIsSubmitting(false)
      }, 1000)
    }
  }

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage)
      }
    }
  }, [selectedImage])

  return (
    <div className="relative w-full max-w-md h-[80vh] bg-white/95 backdrop-blur-md rounded-lg overflow-hidden flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold">Create Story</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <Tabs defaultValue="upload" className="flex-1 flex flex-col" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="flex-1 flex flex-col p-4">
          {selectedImage ? (
            <div className="relative flex-1 mb-4 rounded-lg overflow-hidden">
              {previewType === "image" ? (
                <Image src={selectedImage || "/placeholder.svg"} alt="Selected image" fill className="object-contain" />
              ) : (
                <video src={selectedImage} className="w-full h-full object-contain" controls autoPlay muted loop />
              )}
              <button
                className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4">
              <div
                className="flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-center">Click to upload an image</p>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>

              <div
                className="flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer"
                onClick={() => videoInputRef.current?.click()}
              >
                <Video className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-center">Click to upload a video</p>
                <input
                  type="file"
                  ref={videoInputRef}
                  className="hidden"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </div>
            </div>
          )}

          {selectedImage && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Story Duration (seconds)</label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[duration]}
                    min={5}
                    max={30}
                    step={1}
                    onValueChange={(value) => setDuration(value[0])}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-8 text-center">{duration}s</span>
                </div>
              </div>

              <div className="flex items-center border rounded-lg p-2">
                <input
                  type="text"
                  placeholder="Add a caption..."
                  className="flex-1 outline-none"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <Smile className="h-5 w-5 text-gray-400 ml-2" />
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="camera" className="flex-1 flex flex-col items-center justify-center p-4">
          <Camera className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center">Camera access would be implemented here</p>
          <p className="text-gray-400 text-sm text-center mt-2">In a real app, this would access your device camera</p>
        </TabsContent>

        <div className="p-4 border-t">
          <Button
            className="w-full bg-teal-500 hover:bg-teal-600"
            disabled={!selectedImage || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Share to Story
              </>
            )}
          </Button>
        </div>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { X, Camera } from "lucide-react"
import {
  Buildings,
  Binoculars,
  CalendarDots,
  Newspaper,
  Image as ImageIcon,
  Package,
} from "@phosphor-icons/react/dist/ssr"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  category: string | null
}

export default function CreatePostModal({ isOpen, onClose, category }: CreatePostModalProps) {
  type TabType = "Properties" | "Requirements" | "Events" | "News" | "Portfolios" | "Products"
  const [activeTab, setActiveTab] = useState<TabType>("Properties")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["Pool Retreat"])
  const [preferredTenant, setPreferredTenant] = useState("Family")
  const [noOfSharing, setNoOfSharing] = useState("2")
  const [availableFor, setAvailableFor] = useState("Sale")
  const [baseConfigType, setBaseConfigType] = useState("BHK")
  const [listedBy, setListedBy] = useState("Dealer")
  const [facing, setFacing] = useState("East")
  const [registrationRequired, setRegistrationRequired] = useState(false)

  // Sync activeTab with category prop when it changes
  useEffect(() => {
    if (category) {
      setActiveTab(category as TabType)
    }
  }, [category])

  if (!isOpen) return null

  const categories = [
    { name: "Properties", icon: <Buildings size={24} />, color: "#F66488" },
    { name: "Requirements", icon: <Binoculars size={24} />, color: "#A769F4" },
    { name: "Events", icon: <CalendarDots size={24} />, color: "#FF923F" },
    { name: "News", icon: <Newspaper size={24} />, color: "#00B798" },
    { name: "Portfolios", icon: <ImageIcon size={24} />, color: "#FF5631" },
    { name: "Products", icon: <Package size={24} />, color: "#00B8D9" },
  ]

  const amenities = [
    "Pool Retreat",
    "Urban Oasis",
    "Gym Haven",
    "Poolside Abode",
    "Cottage Garden",
    "Lakeside Escape",
    "Mountain Lodge",
    "Garden Lift",
  ]

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-[15px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Create New Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(cat.name as TabType)}
                className={`flex items-center gap-3 px-2 py-1 text-sm rounded-lg  font-medium whitespace-nowrap transition-colors ${
                  activeTab === cat.name ? "text-white" : "text-gray-500 hover:text-gray-700"
                }`}
                style={{
                  backgroundColor: activeTab === cat.name ? cat.color : "transparent",
                }}
              >
                <span style={{ color: activeTab === cat.name ? "#fff" : cat.color }}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Properties Form */}
            {activeTab === "Properties" && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Post Title</label>
                  <input
                    type="text"
                    placeholder="Charming 2-Bedroom Apartment in the Heart of the City"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] focus:border-transparent text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Charming 2-Bedroom Apartment in the Heart of the City"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Property Category</label>
                  <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                    <option>Select Property Category</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>House</option>
                    <option>Plot</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Available For</h3>
                  <div className="flex gap-3">
                    {["Sale", "Rent", "Lease"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setAvailableFor(option)}
                        className={`px-6 py-2 rounded-full text-[16px] font-medium transition-colors ${
                          availableFor === option
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Base Configuration Type</h3>
                  <div className="flex gap-3">
                    {["BHK", "Area", "Sharing"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setBaseConfigType(option)}
                        className={`px-6 py-2 rounded-full text-[16px] font-medium transition-colors ${
                          baseConfigType === option
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Bedroom</label>
                    <input
                      type="text"
                      placeholder="e.g. 3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Bathroom</label>
                    <input
                      type="text"
                      placeholder="e.g. 2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Furnishing Type</label>
                    <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                      <option>Select Furnishing Type</option>
                      <option>Fully Furnished</option>
                      <option>Semi Furnished</option>
                      <option>Unfurnished</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Property Status</label>
                    <select className="w-full p-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                      <option>Select Property Status</option>
                      <option>Ready to Move</option>
                      <option>Under Construction</option>
                      <option>New Launch</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Listed By</h3>
                  <div className="flex gap-3">
                    {["Dealer", "Owner", "Builder"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setListedBy(option)}
                        className={`px-6 py-2 rounded-full text-[16px] font-medium transition-colors ${
                          listedBy === option
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Total Area</label>
                    <div className="flex relative">
                      <input
                        type="text"
                        placeholder="e.g. 3200"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                      />
                      <div className="flex items-center absolute right-3 h-full p-2">
                        <span className="border-l h-full border-gray-300 rounded-r-lg flex items-center pl-2 text-gray-400 text-sm">
                          Sqr ft.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Super Buildup Area</label>
                    <div className="flex relative">
                      <input
                        type="text"
                        placeholder="e.g. 3200"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                      />
                      <div className="flex items-center absolute right-3 h-full p-2">
                        <span className="border-l h-full border-gray-300 rounded-r-lg flex items-center pl-2 text-gray-400 text-sm">
                          Sqr ft.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Carpet Area</label>
                    <div className="flex relative">
                      <input
                        type="text"
                        placeholder="e.g. 3200"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                      />
                      <div className="flex items-center absolute right-3 h-full p-2">
                        <span className="border-l h-full border-gray-300 rounded-r-lg flex items-center pl-2 text-gray-400 text-sm">
                          Sqr ft.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Maintenance</label>
                    <div className="flex relative">
                      <input
                        type="text"
                        placeholder="Rs. 30,000"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                      />
                      <div className="flex items-center absolute right-3 h-full p-2">
                        <span className="border-l h-full border-gray-300 rounded-r-lg flex items-center pl-2 text-gray-400 text-sm">
                          Per Month
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Car Parking</label>
                    <input
                      type="text"
                      placeholder="e.g. 2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Facing</h3>
                  <div className="flex gap-3">
                    {["East", "West", "North", "South"].map((direction) => (
                      <button
                        key={direction}
                        onClick={() => setFacing(direction)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                          facing === direction
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {direction}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Length</label>
                    <div className="flex relative">
                      <input
                        type="text"
                        placeholder="e.g. 30.50"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                      />
                      <div className="flex items-center absolute right-3 h-full p-2">
                        <span className="border-l h-full border-gray-300 rounded-r-lg flex items-center pl-2 text-gray-400 text-sm">
                          ft
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Breadth</label>
                    <div className="flex relative">
                      <input
                        type="text"
                        placeholder="45.20"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                      />
                      <div className="flex items-center absolute right-3 h-full p-2">
                        <span className="border-l h-full border-gray-300 rounded-r-lg flex items-center pl-2 text-gray-400 text-sm">
                          ft
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Country</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]">
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">City</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]">
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Locality</label>
                  <input
                    type="text"
                    placeholder="Mahalaxmi Nagar"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Amenities</h3>
                  <div className="flex flex-wrap gap-5">
                    {amenities.map((amenity) => (
                      <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedAmenities.includes(amenity)
                                ? "bg-purple-600 border-purple-600"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {selectedAmenities.includes(amenity) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span
                          className={`text-[17px] ${selectedAmenities.includes(amenity) ? "text-purple-500 font-medium" : "text-gray-500"}`}
                        >
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Preferred Tenant</h3>
                  <div className="flex gap-3">
                    {["Family", "Girls Only", "Anyone"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setPreferredTenant(option)}
                        className={`px-6 py-2 rounded-full text-[16px] font-medium transition-colors ${
                          preferredTenant === option
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">No of Sharing</h3>
                  <div className="flex gap-3">
                    {["2", "3", "4", "5"].map((num) => (
                      <button
                        key={num}
                        onClick={() => setNoOfSharing(num)}
                        className={`w-14 h-10 rounded-full text-[16px] font-medium transition-colors ${
                          noOfSharing === num
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Description</h3>
                  <textarea
                    placeholder="Spacious 2-bedroom apartment with modern amenities and a cozy living area."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Upload Photos/Video</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-lg border-2 border-dashed border-gray-300">
                        <Camera className="w-6 h-6 text-gray-400 mb-1" />
                      </div>
                      <div className="w-24 h-24 rounded-lg overflow-hidden relative">
                        <img
                          src="/placeholder.svg?height=96&width=96"
                          alt="Property"
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-1 right-1 w-5 h-5 bg-gray-600 bg-opacity-70 rounded-full flex items-center justify-center">
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Requirements Form */}
            {activeTab === "Requirements" && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Post Title</label>
                  <input
                    type="text"
                    placeholder="Looking for 2-Bedroom Apartment in Mumbai"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Looking for 2-Bedroom Apartment in Mumbai"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Property Category</label>
                  <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                    <option>Select Property Category</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>House</option>
                    <option>Plot</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Available For</h3>
                  <div className="flex gap-3">
                    {["Sale", "Rent", "Lease"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setAvailableFor(option)}
                        className={`px-6 py-2 rounded-full text-[16px] font-medium transition-colors ${
                          availableFor === option
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Base Configuration Type</h3>
                  <div className="flex gap-3">
                    {["BHK", "Area", "Sharing"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setBaseConfigType(option)}
                        className={`px-6 py-2 rounded-full text-[16px] font-medium transition-colors ${
                          baseConfigType === option
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Bedroom</label>
                    <input
                      type="text"
                      placeholder="e.g. 3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Bathroom</label>
                    <input
                      type="text"
                      placeholder="e.g. 2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Min Budget</label>
                    <input
                      type="text"
                      placeholder="Rs. 50,00,000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Max Budget</label>
                    <input
                      type="text"
                      placeholder="Rs. 1,00,00,000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Country</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]">
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">City</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]">
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Locality</label>
                  <input
                    type="text"
                    placeholder="Preferred areas (e.g., Bandra, Andheri)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px]"
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Preferred Tenant</h3>
                  <div className="flex gap-3">
                    {["Family", "Girls Only", "Anyone"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setPreferredTenant(option)}
                        className={`px-6 py-2 rounded-full text-[16px] font-medium transition-colors ${
                          preferredTenant === option
                            ? "bg-green-400 text-white/80"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Description</h3>
                  <textarea
                    placeholder="Looking for a spacious 2-bedroom apartment with modern amenities in a good locality..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
              </>
            )}

            {/* Events Form */}
            {activeTab === "Events" && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Event Title</label>
                  <input
                    type="text"
                    placeholder="Luxury Living Expo 2025 - Mumbai Edition"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Event Description</label>
                  <textarea
                    placeholder="Join us for the Luxury Living Expo 2025 in Mumbai, where elegance meets innovation..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Event Type</label>
                  <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                    <option>Select Event Type</option>
                    <option>Exhibition</option>
                    <option>Conference</option>
                    <option>Workshop</option>
                    <option>Seminar</option>
                    <option>Networking</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Country</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">City</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">End Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="registrationRequired"
                      checked={registrationRequired}
                      onChange={() => setRegistrationRequired(!registrationRequired)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full shadow-inner cursor-pointer ${
                        registrationRequired ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          registrationRequired ? "translate-x-5" : "translate-x-0.5"
                        } translate-y-0.5`}
                      ></div>
                    </div>
                  </div>
                  <label htmlFor="registrationRequired" className="text-base font-medium text-gray-900 cursor-pointer">
                    Registration Required
                  </label>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Registration Link</label>
                  <input
                    type="text"
                    placeholder="Enter Registration Link"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter Banner Image URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Status</label>
                  <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                    <option>Select Event Status</option>
                    <option>Upcoming</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </>
            )}

            {/* News Form */}
            {activeTab === "News" && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">News Title</label>
                  <input
                    type="text"
                    placeholder="Luxury Living Expo 2025 - Mumbai Edition"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Summary</label>
                  <textarea
                    placeholder="Join us for the Luxury Living Expo 2025 in Mumbai, where elegance meets innovation..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Description</label>
                  <textarea
                    placeholder="Join us for the Luxury Living Expo 2025 in Mumbai, where elegance meets innovation..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Source URL</label>
                  <input
                    type="text"
                    placeholder="Enter Source URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter Banner Image URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">News Status</label>
                  <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                    <option>Select News Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Pending Review</option>
                    <option>Archived</option>
                  </select>
                </div>
              </>
            )}

            {/* Portfolios Form */}
            {activeTab === "Portfolios" && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Portfolio Title</label>
                  <input
                    type="text"
                    placeholder="Real Estate Portfolio Showcase 2025"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Summary</label>
                  <textarea
                    placeholder="Showcasing our premier real estate projects across Mumbai..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Description</label>
                  <textarea
                    placeholder="Detailed overview of our real estate portfolio, including luxury apartments and commercial spaces..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Source URL</label>
                  <input
                    type="text"
                    placeholder="Enter Source URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter Banner Image URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Portfolio Status</label>
                  <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                    <option>Select Portfolio Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Pending Review</option>
                    <option>Archived</option>
                  </select>
                </div>
              </>
            )}

            {/* Products Form */}
            {activeTab === "Products" && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Product Title</label>
                  <input
                    type="text"
                    placeholder="Premium Interior Design Package 2025"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Summary</label>
                  <textarea
                    placeholder="Discover our premium interior design solutions for modern homes..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Description</label>
                  <textarea
                    placeholder="Comprehensive interior design services, including custom furniture and decor..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Source URL</label>
                  <input
                    type="text"
                    placeholder="Enter Source URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter Banner Image URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-2">Product Status</label>
                  <select className="w-full p-3 py-3.5 border border-gray-300 rounded-lg focus:outline-gray-500 focus:outline-[1px] text-gray-500">
                    <option>Select Product Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Pending Review</option>
                    <option>Archived</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 pt-3 border-t border-gray-200">
          <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

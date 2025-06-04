"use client"

import { useState } from "react"
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
  const [activeTab, setActiveTab] = useState("Properties")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["Pool Retreat"])
  const [preferredTenant, setPreferredTenant] = useState("Family")
  const [noOfSharing, setNoOfSharing] = useState("2")
  const [listedBy, setListedBy] = useState("Dealer")
  const [facing, setFacing] = useState("East")
  const [propertyType, setPropertyType] = useState("Apartment")
  const [lookingFor, setLookingFor] = useState("Rent")
  const [genderPreference, setGenderPreference] = useState("Anyone")
  const [ageOfProperty, setAgeOfProperty] = useState("New")
  const [propertyOwnership, setPropertyOwnership] = useState("Freehold")
  const [waterSupply, setWaterSupply] = useState("Municipal")
  const [powerBackup, setPowerBackup] = useState("Full")
  const [security, setSecurity] = useState("24/7 Security")
  const [petFriendly, setPetFriendly] = useState("Yes")
  const [transactionType, setTransactionType] = useState("New Booking")
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])

  const categories = [
    { name: "Properties", icon: <Buildings size={16} />, color: "#F66488" },
    { name: "Requirements", icon: <Binoculars size={16} />, color: "#A769F4" },
    { name: "Events", icon: <CalendarDots size={16} />, color: "#FF923F" },
    { name: "News", icon: <Newspaper size={16} />, color: "#00B798" },
    { name: "Portfolios", icon: <ImageIcon size={16} />, color: "#FF5631" },
    { name: "Products", icon: <Package size={16} />, color: "#00B8D9" },
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

  const nearbyFacilities = [
    "Near Hospital",
    "Near School",
    "Near Mall",
    "Near Metro Station",
    "Near Park",
  ]

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    )
  }

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
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
                onClick={() => setActiveTab(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
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

        {/* Properties Form */}
        {activeTab === "Properties" && (
          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Independent House</option>
                    <option>Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Looking For</label>
                  <select
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>Rent</option>
                    <option>Sale</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-lg font-medium text-gray-900 mb-3">Price</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder={lookingFor === "Rent" ? "₹ 30,000" : "₹ 50,00,000"}
                    className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                  <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                    {lookingFor === "Rent" ? "per month" : "total"}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
                <textarea
                  placeholder="Spacious 2-bedroom apartment with modern amenities and a cozy living area."
                  className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  defaultValue="Spacious 2-bedroom apartment with modern amenities and a cozy living area."
                />
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Details</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Bedroom</label>
                  <input
                    type="text"
                    placeholder="e.g. 3"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Bathroom</label>
                  <input
                    type="text"
                    placeholder="e.g. 2"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Balcony</label>
                  <input
                    type="text"
                    placeholder="e.g. 2"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Furnishing Type</label>
                  <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500" suppressHydrationWarning>
                    <option>Select Furnishing Type</option>
                    <option>Fully Furnished</option>
                    <option>Semi Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Property Status</label>
                  <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500" suppressHydrationWarning>
                    <option>Select Property Status</option>
                    <option>Ready to Move</option>
                    <option>Under Construction</option>
                    <option>New Launch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Property Ownership</label>
                  <select
                    value={propertyOwnership}
                    onChange={(e) => setPropertyOwnership(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>Freehold</option>
                    <option>Leasehold</option>
                    <option>Co-operative Society</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Total Area</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="e.g. 3200"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      suppressHydrationWarning
                    />
                    <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                      Sqr ft.
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Super Buildup Area</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="e.g. 3200"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      suppressHydrationWarning
                    />
                    <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                      Sqr ft.
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Carpet Area</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="e.g. 3200"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      suppressHydrationWarning
                    />
                    <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                      Sqr ft.
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Length</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="e.g. 30.50"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      suppressHydrationWarning
                    />
                    <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                      ft.
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Breadth</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="45.20"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      suppressHydrationWarning
                    />
                    <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                      ft.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Facing</h3>
                <div className="flex gap-4 flex-wrap">
                  {["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"].map((direction) => (
                    <button
                      key={direction}
                      onClick={() => setFacing(direction)}
                      className={`px-6 py-3 rounded-full text-base font-medium transition-colors ${
                        facing === direction
                          ? "bg-gray-200 text-gray-900 border-2 border-gray-300"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {direction}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Total Floors</label>
                  <input
                    type="text"
                    placeholder="e.g. 10"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Available Floor</label>
                  <input
                    type="text"
                    placeholder="e.g. 6"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Age of Property</label>
                  <select
                    value={ageOfProperty}
                    onChange={(e) => setAgeOfProperty(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>New</option>
                    <option>1-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Water Supply</label>
                  <select
                    value={waterSupply}
                    onChange={(e) => setWaterSupply(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>Municipal</option>
                    <option>Borewell</option>
                    <option>Tanker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Power Backup</label>
                  <select
                    value={powerBackup}
                    onChange={(e) => setPowerBackup(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>Full</option>
                    <option>Partial</option>
                    <option>None</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Security</label>
                  <select
                    value={security}
                    onChange={(e) => setSecurity(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>24/7 Security</option>
                    <option>Gated Community</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Lift Availability</label>
                  <input
                    type="text"
                    placeholder="e.g. 2"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Car Parking</label>
                  <input
                    type="text"
                    placeholder="e.g. 2"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>

            {/* Tenant Preferences */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tenant Preferences</h3>
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">Preferred Tenant</h4>
                <div className="flex gap-4">
                  {["Family", "Girls Only", "Anyone"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setPreferredTenant(option)}
                      className={`px-6 py-3 rounded-full text-base font-medium transition-colors ${
                        preferredTenant === option
                          ? "bg-gray-200 text-gray-900 border-2 border-gray-300"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">Gender Preference</h4>
                <div className="flex gap-4">
                  {["Male", "Female", "Anyone"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setGenderPreference(option)}
                      className={`px-6 py-3 rounded-full text-base font-medium transition-colors ${
                        genderPreference === option
                          ? "bg-gray-200 text-gray-900 border-2 border-gray-300"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">No of Sharing</h4>
                <div className="flex gap-4">
                  {["2", "3", "4", "5"].map((num) => (
                    <button
                      key={num}
                      onClick={() => setNoOfSharing(num)}
                      className={`w-16 h-16 rounded-full text-lg font-medium transition-colors ${
                        noOfSharing === num
                          ? "bg-gray-200 text-gray-900 border-2 border-gray-300"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Availability Date</label>
                  <input
                    type="date"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Pet Friendly</label>
                  <select
                    value={petFriendly}
                    onChange={(e) => setPetFriendly(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Details</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Maintenance</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="₹ 30,000"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      suppressHydrationWarning
                    />
                    <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                      per month
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Deposit Amount</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="₹ 50,000"
                      className="flex-1 p-4 border-2 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      suppressHydrationWarning
                    />
                    <span className="px-4 py-4 bg-gray-100 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-600 text-base font-medium">
                      ₹
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Country</label>
                  <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base" suppressHydrationWarning>
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">City</label>
                  <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base" suppressHydrationWarning>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Bangalore</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Locality</label>
                  <input
                    type="text"
                    placeholder="Mahalaxmi Nagar"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">Nearby Facilities</h4>
                <div className="grid grid-cols-3 gap-4">
                  {nearbyFacilities.map((facility) => (
                    <label key={facility} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFacilities.includes(facility)}
                        onChange={() => handleFacilityToggle(facility)}
                        className={`w-5 h-5 rounded border-2 ${
                          selectedFacilities.includes(facility)
                            ? "bg-gray-300 border-gray-300"
                            : "border-gray-300"
                        }`}
                      />
                      <span className="text-base text-gray-700 font-medium">{facility}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className={`w-5 h-5 rounded border-2 ${
                        selectedAmenities.includes(amenity)
                          ? amenity === "Pool Retreat"
                            ? "bg-purple-600 border-purple-600"
                            : "bg-gray-300 border-gray-300"
                          : "border-gray-300"
                      }`}
                    />
                    <span className="text-base text-gray-700 font-medium">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">Listed By</h4>
                <div className="flex gap-4">
                  {["Dealer", "Owner", "Builder"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setListedBy(option)}
                      className={`px-6 py-3 rounded-full text-base font-medium transition-colors ${
                        listedBy === option
                          ? "bg-gray-200 text-gray-900 border-2 border-gray-300"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Transaction Type</label>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-500"
                    suppressHydrationWarning
                  >
                    <option>New Booking</option>
                    <option>Resale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">RERA ID</label>
                  <input
                    type="text"
                    placeholder="e.g. RERA12345"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>

            {/* Upload Photos/Video */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Photos/Videos</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">Add Media</span>
                  </div>
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 relative">
                    <img
                      src="/images/placeholder.svg?height=128&width=128"
                      alt="Property Image"
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 w-6 h-6 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
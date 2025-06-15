"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface FilterComponentProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterComponent({ isOpen, onClose }: FilterComponentProps) {
  const [activeSection, setActiveSection] = useState("budget")
  const [budgetRange, setBudgetRange] = useState([500, 2500])
  const [appliedFilters, setAppliedFilters] = useState([
    { id: 1, type: "category", value: "Residential" },
    { id: 2, type: "property", value: "Flat/Apartment" },
    { id: 3, type: "bhk", value: "2 BHK" },
    { id: 4, type: "budget", value: "Starting from ₹ 1.7 Crores" },
  ])

  // State for radio buttons and checkboxes
  const [propertyCategory, setPropertyCategory] = useState("residential")
  const [residentialTypes, setResidentialTypes] = useState<string[]>(["land"])
  const [propertyConfig, setPropertyConfig] = useState<string[]>([])
  const [facing, setFacing] = useState("")
  const [furnishingType, setFurnishingType] = useState("")
  const [propertyStatus, setPropertyStatus] = useState("")
  const [genderPreference, setGenderPreference] = useState("")
  const [availableFor, setAvailableFor] = useState("")
  const [postedBy, setPostedBy] = useState("")
  const [ageOfProperty, setAgeOfProperty] = useState("")

  const removeFilter = (id: number) => {
    setAppliedFilters(appliedFilters.filter((filter) => filter.id !== id))
  }

  const clearAllFilters = () => {
    setAppliedFilters([])
    setPropertyCategory("")
    setResidentialTypes([])
    setPropertyConfig([])
    setFacing("")
    setFurnishingType("")
    setPropertyStatus("")
    setGenderPreference("")
    setAvailableFor("")
    setPostedBy("")
    setAgeOfProperty("")
  }

  const toggleResidentialType = (type: string) => {
    if (residentialTypes.includes(type)) {
      setResidentialTypes(residentialTypes.filter((t) => t !== type))
    } else {
      setResidentialTypes([...residentialTypes, type])
    }
  }

  const togglePropertyConfig = (config: string) => {
    if (propertyConfig.includes(config)) {
      setPropertyConfig(propertyConfig.filter((c) => c !== config))
    } else {
      setPropertyConfig([...propertyConfig, config])
    }
  }

  const renderFilterSection = () => {
    switch (activeSection) {
      case "budget":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Budget</h3>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
              <Slider
                value={budgetRange}
                min={0}
                max={5000}
                step={100}
                onValueChange={setBudgetRange}
                className="mt-6"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm">Min {budgetRange[0]}</span>
                <span className="text-sm">Max {budgetRange[1]}</span>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-4">Property Categories</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "residential" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("residential")}
                >
                  {propertyCategory === "residential" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("residential")}>
                  Residential
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "commercial" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("commercial")}
                >
                  {propertyCategory === "commercial" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("commercial")}>
                  Commercial
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "agricultural" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("agricultural")}
                >
                  {propertyCategory === "agricultural" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("agricultural")}>
                  Agricultural
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "industrial" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("industrial")}
                >
                  {propertyCategory === "industrial" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("industrial")}>
                  Industrial
                </label>
              </div>
            </div>

            <div className="border-t my-6"></div>

            <h3 className="text-lg font-medium mb-4">Residential Types</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("land") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("land")}
                >
                  {residentialTypes.includes("land") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("land")}>
                  Land / Plot
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("flats") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("flats")}
                >
                  {residentialTypes.includes("flats") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("flats")}>
                  Flats & Apt.
                </label>
              </div>
            </div>
          </div>
        )
      case "property-categories":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Property Categories</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "residential" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("residential")}
                >
                  {propertyCategory === "residential" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("residential")}>
                  Residential
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "commercial" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("commercial")}
                >
                  {propertyCategory === "commercial" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("commercial")}>
                  Commercial
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "agricultural" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("agricultural")}
                >
                  {propertyCategory === "agricultural" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("agricultural")}>
                  Agricultural
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyCategory === "industrial" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyCategory("industrial")}
                >
                  {propertyCategory === "industrial" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyCategory("industrial")}>
                  Industrial
                </label>
              </div>
            </div>
          </div>
        )
      case "residential-types":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Residential Types</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("land") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("land")}
                >
                  {residentialTypes.includes("land") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("land")}>
                  Land / Plot
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("flats") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("flats")}
                >
                  {residentialTypes.includes("flats") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("flats")}>
                  Flats & Apt.
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("builder") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("builder")}
                >
                  {residentialTypes.includes("builder") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("builder")}>
                  Builder Floor / Independent Floor
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("row") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("row")}
                >
                  {residentialTypes.includes("row") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("row")}>
                  Row House
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("villa") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("villa")}
                >
                  {residentialTypes.includes("villa") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("villa")}>
                  Villa / Bunglow
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("penthouse") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("penthouse")}
                >
                  {residentialTypes.includes("penthouse") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("penthouse")}>
                  Penthouse
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("farmhouse") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("farmhouse")}
                >
                  {residentialTypes.includes("farmhouse") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("farmhouse")}>
                  Farmhouse
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${residentialTypes.includes("pg") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => toggleResidentialType("pg")}
                >
                  {residentialTypes.includes("pg") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => toggleResidentialType("pg")}>
                  PG / Co-living
                </label>
              </div>
            </div>
          </div>
        )
      case "property-config":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Property Config</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${propertyConfig.includes("2bhk") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => togglePropertyConfig("2bhk")}
                >
                  {propertyConfig.includes("2bhk") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => togglePropertyConfig("2bhk")}>
                  2 BHK
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${propertyConfig.includes("3bhk") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => togglePropertyConfig("3bhk")}
                >
                  {propertyConfig.includes("3bhk") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => togglePropertyConfig("3bhk")}>
                  3 BHK
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${propertyConfig.includes("4bhk") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => togglePropertyConfig("4bhk")}
                >
                  {propertyConfig.includes("4bhk") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => togglePropertyConfig("4bhk")}>
                  4 BHK
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${propertyConfig.includes("5bhk") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => togglePropertyConfig("5bhk")}
                >
                  {propertyConfig.includes("5bhk") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => togglePropertyConfig("5bhk")}>
                  5 BHK
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded border ${propertyConfig.includes("5plus") ? "border-emerald-500 bg-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => togglePropertyConfig("5plus")}
                >
                  {propertyConfig.includes("5plus") && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3334 4L6.00008 11.3333L2.66675 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label className="text-base cursor-pointer" onClick={() => togglePropertyConfig("5plus")}>
                  5+ BHK
                </label>
              </div>
            </div>
          </div>
        )
      case "facing":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Facing</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${facing === "east" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setFacing("east")}
                >
                  {facing === "east" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setFacing("east")}>
                  East
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${facing === "north" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setFacing("north")}
                >
                  {facing === "north" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setFacing("north")}>
                  North
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${facing === "west" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setFacing("west")}
                >
                  {facing === "west" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setFacing("west")}>
                  West
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${facing === "south" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setFacing("south")}
                >
                  {facing === "south" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setFacing("south")}>
                  South
                </label>
              </div>
            </div>
          </div>
        )
      case "furnishing-type":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Furnishing Type</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${furnishingType === "furnished" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setFurnishingType("furnished")}
                >
                  {furnishingType === "furnished" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setFurnishingType("furnished")}>
                  Furnished
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${furnishingType === "semi" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setFurnishingType("semi")}
                >
                  {furnishingType === "semi" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setFurnishingType("semi")}>
                  Semi Furnished
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${furnishingType === "unfurnished" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setFurnishingType("unfurnished")}
                >
                  {furnishingType === "unfurnished" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setFurnishingType("unfurnished")}>
                  Unfurnished
                </label>
              </div>
            </div>
          </div>
        )
      case "property-status":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Property Status</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyStatus === "new" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyStatus("new")}
                >
                  {propertyStatus === "new" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyStatus("new")}>
                  New Launch
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyStatus === "ready" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyStatus("ready")}
                >
                  {propertyStatus === "ready" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyStatus("ready")}>
                  Ready to Move
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${propertyStatus === "under" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPropertyStatus("under")}
                >
                  {propertyStatus === "under" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPropertyStatus("under")}>
                  Under Construction
                </label>
              </div>
            </div>
          </div>
        )
      case "gender-preference":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Gender Preference</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${genderPreference === "male" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setGenderPreference("male")}
                >
                  {genderPreference === "male" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setGenderPreference("male")}>
                  Male
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${genderPreference === "female" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setGenderPreference("female")}
                >
                  {genderPreference === "female" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setGenderPreference("female")}>
                  Female
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${genderPreference === "anyone" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setGenderPreference("anyone")}
                >
                  {genderPreference === "anyone" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setGenderPreference("anyone")}>
                  Anyone
                </label>
              </div>
            </div>
          </div>
        )
      case "available-for":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Available For</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${availableFor === "students" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setAvailableFor("students")}
                >
                  {availableFor === "students" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setAvailableFor("students")}>
                  Students
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${availableFor === "family" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setAvailableFor("family")}
                >
                  {availableFor === "family" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setAvailableFor("family")}>
                  Family Only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${availableFor === "professionals" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setAvailableFor("professionals")}
                >
                  {availableFor === "professionals" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setAvailableFor("professionals")}>
                  Working Professionals
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${availableFor === "anyone" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setAvailableFor("anyone")}
                >
                  {availableFor === "anyone" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setAvailableFor("anyone")}>
                  Anyone
                </label>
              </div>
            </div>
          </div>
        )
      case "posted-by":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Posted By</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${postedBy === "owner" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPostedBy("owner")}
                >
                  {postedBy === "owner" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPostedBy("owner")}>
                  Owner
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${postedBy === "dealer" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPostedBy("dealer")}
                >
                  {postedBy === "dealer" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPostedBy("dealer")}>
                  Dealer
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${postedBy === "builder" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPostedBy("builder")}
                >
                  {postedBy === "builder" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPostedBy("builder")}>
                  Builder
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${postedBy === "corporates" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setPostedBy("corporates")}
                >
                  {postedBy === "corporates" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setPostedBy("corporates")}>
                  Corporates
                </label>
              </div>
            </div>
          </div>
        )
      case "age-of-property":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Age of Property</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${ageOfProperty === "0-1" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setAgeOfProperty("0-1")}
                >
                  {ageOfProperty === "0-1" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setAgeOfProperty("0-1")}>
                  0-1 year old
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full border ${ageOfProperty === "1-3" ? "border-emerald-500" : "border-gray-300"} flex items-center justify-center cursor-pointer`}
                  onClick={() => setAgeOfProperty("1-3")}
                >
                  {ageOfProperty === "1-3" && <div className="w-4 h-4 rounded-full bg-emerald-500"></div>}
                </div>
                <label className="text-base cursor-pointer" onClick={() => setAgeOfProperty("1-3")}>
                  1-3 years old
                </label>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 h-[100vh] sm:h-auto w-[100vw] sm:w-auto m-0 sm:m-4 rounded-none sm:rounded-lg">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {appliedFilters.map((filter) => (
              <div
                key={filter.id}
                className="flex items-center gap-1 px-3 py-1.5 bg-pink-50 text-gray-800 rounded-full"
              >
                <span>{filter.value}</span>
                <button onClick={() => removeFilter(filter.id)}>
                  <X className="h-4 w-4 text-pink-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row h-[calc(100vh-180px)] sm:h-[500px]">
          <div className="w-full sm:w-[250px] border-b sm:border-b-0 sm:border-r overflow-y-auto">
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "budget" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("budget")}
            >
              Budget
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "property-categories" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("property-categories")}
            >
              Property Categories
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "residential-types" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("residential-types")}
            >
              Residential Types
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "property-config" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("property-config")}
            >
              Property Config
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "facing" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("facing")}
            >
              Facing
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "furnishing-type" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("furnishing-type")}
            >
              Furnishing Type
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "property-status" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("property-status")}
            >
              Property Status
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "gender-preference" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("gender-preference")}
            >
              Gender Preference
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "available-for" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("available-for")}
            >
              Available For
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "posted-by" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("posted-by")}
            >
              Posted By
            </button>
            <button
              className={`w-full text-left px-4 py-3 border-b ${activeSection === "age-of-property" ? "bg-green-50" : ""}`}
              onClick={() => setActiveSection("age-of-property")}
            >
              Age of Property
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">{renderFilterSection()}</div>
        </div>

        <div className="flex p-4 border-t sticky bottom-0 bg-white">
          <Button
            variant="outline"
            className="flex-1 mr-2 bg-purple-50 text-purple-600 border-purple-100"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
          <Button className="flex-1 ml-2 bg-purple-600 hover:bg-purple-700" onClick={onClose}>
            Apply Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

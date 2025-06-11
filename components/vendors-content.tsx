"use client"

import Image from "next/image"
import { Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowsDownUp, FunnelSimple } from "@phosphor-icons/react"

const vendors = [
  {
    id: 1,
    image: "/imagesstatic/v1.png",
    price: "₹1.75 Lakh",
    oldPrice: "₹2.05 Lakh",
    title: "Classic L-Shaped Modular Kitchen",
    location: "Mumbai, Maharashtra",
  },
  {
    id: 2,
    image: "/imagesstatic/v2.png",
    price: "₹2.00 Lakh",
    oldPrice: "₹2.50 Lakh",
    title: "Modern U-Shaped Modular Kitchen",
    location: "Pune, Maharashtra",
  },
  {
    id: 3,
    image: "/imagesstatic/v3.png",
    price: "₹1.90 Lakh",
    oldPrice: "₹2.20 Lakh",
    title: "Minimalist Straight Modular Kitchen",
    location: "Bangalore, Karnataka",
  },
  {
    id: 4,
    image: "/imagesstatic/v1.png",
    price: "₹2.10 Lakh",
    oldPrice: "₹2.40 Lakh",
    title: "Contemporary Parallel Modular Kitchen",
    location: "Delhi, Delhi NCR",
  },
  {
    id: 5,
    image: "/imagesstatic/v2.png",
    price: "₹1.85 Lakh",
    oldPrice: "₹2.15 Lakh",
    title: "Scandinavian Modular Kitchen",
    location: "Hyderabad, Telangana",
  },
  {
    id: 6,
    image: "/imagesstatic/v3.png",
    price: "₹2.30 Lakh",
    oldPrice: "₹2.60 Lakh",
    title: "Luxury Island Modular Kitchen",
    location: "Chennai, Tamil Nadu",
  },
]

export default function VendorsContent() {
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  const filterContentRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const cityRef = useRef<HTMLDivElement>(null)
  const sortButtonRef = useRef<HTMLButtonElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Constructions Chemicals", "Cement"])
  const [selectedCities, setSelectedCities] = useState<string[]>(["Mumbai", "Pune"])
  const [selectedSort, setSelectedSort] = useState("low-to-high")
  const [activeFilterTab, setActiveFilterTab] = useState("Categories")
  const [sortPopupPosition, setSortPopupPosition] = useState({ top: 0, left: 0 })

  const categories = [
    "Constructions Chemicals",
    "Groups",
    "Cement",
    "Iron Rods",
    "Wall Paints",
    "Wallpapers",
    "Doors & Window",
  ]

  const cities = ["Mumbai", "Bangalore", "Pune", "Delhi", "Chennai", "Hyderabad"]

  const sortOptions = [
    { value: "low-to-high", label: "Low to High" },
    { value: "high-to-low", label: "High to Low" },
    { value: "nearby", label: "Near by location" },
  ]

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const handleScroll = () => {
      setIsScrolled(content.scrollTop > 0)
    }

    content.addEventListener("scroll", handleScroll)
    return () => content.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle filter content scroll to update active tab
  useEffect(() => {
    const filterContent = filterContentRef.current
    if (!filterContent || !showFilter) return

    const handleFilterScroll = () => {
      const categoriesElement = categoriesRef.current
      const cityElement = cityRef.current

      if (!categoriesElement || !cityElement) return

      const scrollTop = filterContent.scrollTop
      const categoriesTop = categoriesElement.offsetTop - 100
      const cityTop = cityElement.offsetTop - 100

      if (scrollTop >= cityTop) {
        setActiveFilterTab("City")
      } else if (scrollTop >= categoriesTop) {
        setActiveFilterTab("Categories")
      }
    }

    filterContent.addEventListener("scroll", handleFilterScroll)
    return () => filterContent.removeEventListener("scroll", handleFilterScroll)
  }, [showFilter])

  // Calculate sort popup position
  useEffect(() => {
    if (showSort && sortButtonRef.current) {
      const buttonRect = sortButtonRef.current.getBoundingClientRect()
      const containerRect = contentRef.current?.getBoundingClientRect()

      if (containerRect) {
        setSortPopupPosition({
          top: buttonRect.bottom - containerRect.top + 18,
          left: buttonRect.right - containerRect.left - 300, // Position it to the right edge of button minus popup width
        })
      }
    }
  }, [showSort])

  const handleVendorClick = (vendorId: number) => {
    router.push(`/vendors/${vendorId}`)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleCityChange = (city: string) => {
    setSelectedCities((prev) => (prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]))
  }

  const removeFilter = (type: "category" | "city", value: string) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((c) => c !== value))
    } else {
      setSelectedCities((prev) => prev.filter((c) => c !== value))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedCities([])
  }

  const applyFilters = () => {
    setShowFilter(false)
    // Apply filter logic here
  }

  const handleSortSelect = (value: string) => {
    setSelectedSort(value)
    setShowSort(false)
    // Apply sort logic here
  }

  const scrollToSection = (section: string) => {
    const filterContent = filterContentRef.current
    if (!filterContent) return

    let targetElement: HTMLDivElement | null = null

    if (section === "Categories") {
      targetElement = categoriesRef.current
    } else if (section === "City") {
      targetElement = cityRef.current
    }

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 20
      filterContent.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Close sort popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSort &&
        !(event.target as Element).closest(".sort-popup") &&
        !(event.target as Element).closest(".sort-button")
      ) {
        setShowSort(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showSort])

  return (
    <div
      ref={contentRef}
      className={`flex-1 overflow-y-auto  h-[calc(85vh)] pb-6 no-scrollbar p-4 bg-white transition-all duration-200 relative ${
        isScrolled ? "rounded-b-lg" : "rounded-lg"
      }`}
      style={{
        borderTopLeftRadius: isScrolled ? 0 : "0.5rem",
        borderTopRightRadius: isScrolled ? 0 : "0.5rem",
      }}
    >
      <div className="flex items-center gap-2 bg-white rounded-xl pb-4">
        <div className="relative flex items-center gap-2 flex-1">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none border bg-transparent py-3 rounded-xl flex-1 px-10 text-gray-700 text-base"
          />
        </div>
        <button onClick={() => setShowFilter(true)} className="fixed bottom-0 left-0 w-[50%] shadow-t-lg shadow-none sm:w-auto flex justify-center z-[10] bg-white sm:relative text-gray-600 gap-2 hover:bg-[#EFF8F4] hover:text-[#01A76F] border-r sm:border-0 py-3 px-2 sm:rounded-lg text-sm flex items-center ">
          Filter
          <FunnelSimple size={18} />
        </button>
        <button
          ref={sortButtonRef}
          onClick={() => setShowSort(true)}
          className="text-gray-600 hover:bg-[#EFF8F4] fixed bottom-0 right-0 sm:relative text-center flex justify-center z-[10] bg-white  w-[50%] sm:w-auto  hover:text-[#01A76F] py-3 px-2 sm:rounded-lg text-sm flex items-center gap-2 sort-button"
        >
          Sort by
          <ArrowsDownUp size={18} />
        </button>
      </div>

      {/* Sort Popup */}
      {showSort && (
        <div
          className="absolute z-50 sort-popup"
          style={{
            top: `${sortPopupPosition.top}px`,
            left: `${sortPopupPosition.left}px`,
          }}
        >
          <div className="bg-white rounded-lg w-[300px] p-4 shadow-lg border">
            <h3 className="text-lg font-semibold mb-4">Sort by</h3>
            <div className="space-y-3">
              {sortOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={selectedSort === option.value}
                      onChange={() => handleSortSelect(option.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        selectedSort === option.value ? "border-green-500" : "border-gray-300"
                      }`}
                    >
                      {selectedSort === option.value && <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>}
                    </div>
                  </div>
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

     
<div className="flex justify-center flex-wrap gap-3 mb-4">
{vendors.map((vendor) => (
  <div
    key={vendor.id}
    className="bg-white overflow-hidden cursor-pointer w-[48%] sm:w-auto hover:shadow-lg transition-shadow"
    onClick={() => handleVendorClick(vendor.id)}
  >
    <div className="relative w-full aspect-square  sm:h-[230px] w-full sm:w-[230px]">
      <Image
        src={vendor.image || "/placeholder.svg"}
        alt={vendor.title}
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div className="space-y-1 mt-2 w-full sm:w-[230px]">
      <div className="flex items-center mb-1 gap-2">
        <span className="font-semibold text-[16px] sm:text-lg">{vendor.price}</span>
        <span className="text-[#909EAB] text-[14px] sm:text-[16px] line-through">{vendor.oldPrice}</span>
      </div>
      <div className="font-medium text-[#454F5B] text-[14px] leading-[20px] font-lighter mb-1">
        {vendor.title}
      </div>
      <div className="text-[#909EAB] text-[14px] mb-2">{vendor.location}</div>
    </div>
  </div>
))}
</div>

      {/* Filter Popup */}
     
{/* Filter Popup */}
{showFilter && (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
  <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-hidden">
    {/* Header */}
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filter</h2>
        <button onClick={() => setShowFilter(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Applied Filters */}
    <div className="p-4 border-b bg-gray-50">
      <h3 className="text-sm font-medium mb-3">Applied Filter</h3>
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <div
            key={category}
            className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
          >
            {category}
            <button onClick={() => removeFilter("category", category)}>
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {selectedCities.map((city) => (
          <div
            key={city}
            className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
          >
            {city}
            <button onClick={() => removeFilter("city", city)}>
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Filter Content */}
    <div className="flex h-[400px]">
      {/* Left Sidebar */}
      <div className="w-48 bg-gray-50 border-r">
        <div >
          <div className="space-y-1">
            <button
              onClick={() => scrollToSection("Categories")}
              className={`w-full text-left py-3 px-3 rounded text-sm font-medium transition-all duration-200 ${
                activeFilterTab === "Categories" ? "bg-white shadow-sm" : "hover:bg-gray-100"
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection("City")}
              className={`w-full text-left py-3 px-3 border-b rounded text-sm font-medium transition-all duration-200 ${
                activeFilterTab === "City" ? "bg-white shadow-sm" : "hover:bg-gray-100"
              }`}
            >
              City
            </button>
          </div>
        </div>
      </div>

      {/* Right Content - Scrollable */}
      <div ref={filterContentRef} className="flex-1 p-4 overflow-y-auto">
        {/* Categories Section */}
        <div ref={categoriesRef} className="mb-8">
          <h3 className="text-sm font-medium mb-4 text-gray-600">Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      selectedCategories.includes(category)
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedCategories.includes(category) && (
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
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* City Section */}
        <div ref={cityRef} className="mb-8">
          <h3 className="text-sm font-medium mb-4 text-gray-600">City</h3>
          <div className="space-y-3">
            {cities.map((city) => (
              <label key={city} className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedCities.includes(city)}
                    onChange={() => handleCityChange(city)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      selectedCities.includes(city) ? "bg-green-500 border-green-500" : "border-gray-300"
                    }`}
                  >
                    {selectedCities.includes(city) && (
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
                <span className="text-sm">{city}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="p-4 pt-2 border-t flex items-center justify-end">
      <button onClick={clearAllFilters} className="text-gray-600 bg-gray-100 px-6 py-2 mr-4 rounded-lg  text-sm font-medium">
        Clear All
      </button>
      <button
        onClick={applyFilters}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
      >
        Apply Filter
      </button>
    </div>
  </div>
</div>
)}

    </div>
  )
}





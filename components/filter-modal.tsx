"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  type: "property" | "project" | "requirement"
}

export default function FilterModal({ isOpen, onClose, type }: FilterModalProps) {
  const [priceRange, setPriceRange] = useState([30000, 100000])
  const [areaRange, setAreaRange] = useState([500, 2000])

  const getButtonColor = () => {
    switch (type) {
      case "property":
        return "bg-teal-500 hover:bg-teal-600"
      case "project":
        return "bg-purple-500 hover:bg-purple-600"
      case "requirement":
        return "bg-orange-500 hover:bg-orange-600"
      default:
        return "bg-teal-500 hover:bg-teal-600"
    }
  }

  const formatPrice = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`
    }
    return `₹${value}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Filter {type === "property" ? "Properties" : type === "project" ? "Projects" : "Requirements"}</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full p-0">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Price Range</h3>
            <div className="pt-2">
              <Slider value={priceRange} min={5000} max={500000} step={5000} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">{formatPrice(priceRange[0])}</span>
                <span className="text-sm">{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Area (sq ft)</h3>
            <div className="pt-2">
              <Slider value={areaRange} min={100} max={5000} step={100} onValueChange={setAreaRange} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">{areaRange[0]} sq ft</span>
                <span className="text-sm">{areaRange[1]} sq ft</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Property Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="apartment" />
                <Label htmlFor="apartment">Apartment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="villa" />
                <Label htmlFor="villa">Villa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="bungalow" />
                <Label htmlFor="bungalow">Bungalow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="penthouse" />
                <Label htmlFor="penthouse">Penthouse</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Bedrooms</h3>
            <RadioGroup defaultValue="any">
              <div className="grid grid-cols-5 gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any">Any</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="1bhk" />
                  <Label htmlFor="1bhk">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="2bhk" />
                  <Label htmlFor="2bhk">2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="3bhk" />
                  <Label htmlFor="3bhk">3</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4+" id="4bhk" />
                  <Label htmlFor="4bhk">4+</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="parking" />
                <Label htmlFor="parking">Parking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gym" />
                <Label htmlFor="gym">Gym</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pool" />
                <Label htmlFor="pool">Swimming Pool</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="security" />
                <Label htmlFor="security">24x7 Security</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="garden" />
                <Label htmlFor="garden">Garden</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="elevator" />
                <Label htmlFor="elevator">Elevator</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Reset
            </Button>
            <Button className={getButtonColor()} onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

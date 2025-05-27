import Image from "next/image"
import { Bell, Bookmark, ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[85px] items-center justify-between bg-white px-4 md:px-6">
    <div className="w-[60%] flex h-[85px] items-center justify-between  bg-white px-4 md:px-6">
      <div className="flex items-center z-[80] gap-2">
        <Image src="/whiskelogo.svg" alt="WISHKE Logo" width={160} height={60} />
      </div>

      <div className="hidden flex-1 max-w-[570px] px-4 md:block">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
          <Input placeholder="Search" className="w-full !py-6  rounded-[8px] !text-[16px] !border-none !bg-[#F8F8FA] pl-12 " />
        </div>
      </div>
</div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="h-6 w-6 text-muted-foreground" />
          
        </div>
        <Bookmark className="h-6 w-6 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src="/imagesstatic/malvika.jpg" alt="Profile" fill className="object-cover" />
          </div>
          <div className="hidden md:block">
            <span className="text-sm font-medium">Malvika Willson</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}

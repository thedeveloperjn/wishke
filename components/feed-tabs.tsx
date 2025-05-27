import { Filter } from "lucide-react"

export default function FeedTabs() {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between">
        <div className="flex">
          <button className="border-b-2 border-purple-500 px-6 py-3 text-sm font-medium text-purple-500">
            For You
          </button>
          <button className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            Following
          </button>
          <button className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">Connect</button>
        </div>
        <button className="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted/50">
          <span>Filter</span>
          <Filter className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

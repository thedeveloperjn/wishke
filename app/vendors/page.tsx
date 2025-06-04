import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import MessagesSidebar from "@/components/messages-sidebar"
import VendorsContent from "@/components/vendors-content"

export default function Home() {
  return (
    <div className="min-w-[51%] xl:max-w-[51%]">
      
        <VendorsContent />
     
    </div>
  )
}

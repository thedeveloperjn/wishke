import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import MessagesSidebar from "@/components/messages-sidebar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
      <Header />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
        <Sidebar />
        <MainContent />
        <MessagesSidebar />
      </div>
    </div>
  )
}

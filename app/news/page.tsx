
import NewsContent from "@/components/news-content";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MessagesSidebar from "../../components/messages-sidebar";

export default function NewsPage() {
   
return (
  <div className="flex min-h-screen flex-col bg-[#F8F8FA] no-scrollbar">
      <Header />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden no-scrollbar">
        <Sidebar />
        <NewsContent />
        <MessagesSidebar />
      </div>
    </div>
    )
}

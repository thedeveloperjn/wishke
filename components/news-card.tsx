import Image from "next/image";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  source: string;
}

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg border  w-[49%] flex-shrink-0 overflow-hidden">
      <div className="relative p-3 w-full   overflow-hidden">
        <Image
          src={news.image || "/placeholder.jpg"}
          alt={news.title}
        height={150}
        width={350}
          className=" w-full h-full mb-3 rounded-[6px] object-cover"
          
        />
      
        <h3 className="text-[17px] font-semibold text-gray-900 mb-3 line-clamp-2">{news.title}</h3>
        <p className="text-[15px] text-gray-600 line-clamp-2 mb-1">{news.description}</p>
      </div>
    </div>
  );
} 
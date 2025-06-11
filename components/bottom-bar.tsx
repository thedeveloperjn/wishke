"use client"
import { ChatTeardropDots, House, MagnifyingGlass, MonitorPlay  } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
export default function BottomBar() {
  return (
   <div className="block sm:hidden bg-white fixed bottom-0 ">
     <div className="flex py-1">
  <button className="w-[21%] flex justify-center items-center"><House size={24}/></button>
  <button className="w-[21%]  flex justify-center items-center"><MonitorPlay  size={24}/></button>
  <Image className="w-[16%]  flex justify-center items-center"   src="/imagesstatic/logo.png" height={40} width={40} alt="logo"/>
  <button className="w-[21%]  flex justify-center items-center"><MagnifyingGlass  size={24}/></button>
  <button className="w-[21%]  flex justify-center items-center"><ChatTeardropDots size={24}/></button>
     </div>
   </div>
  )
}

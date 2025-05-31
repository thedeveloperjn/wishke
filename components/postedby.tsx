import Image from "next/image";
import { Button } from "./ui/button";
import { PhoneCall ,ChatTeardropText } from "@phosphor-icons/react/dist/ssr";

interface PostedbyProps {
  avatar: string;
  name: string;
  username: string;
  company: string;
}

const Postedby = ({ avatar, name, username, company }: PostedbyProps) => {
    return (
<div>
<h4 className="text-xl font-semibold border-b pb-4 mb-6  text-gray-900">Posted by</h4>
<div className="relative overflow-hidden">
{/* <div className=" absolute h-[500px] w-[500px] right-0 -mr-[250px] -mt-[250px] rounded-full bg-black/25"> </div>
  <div className=" absolute h-[500px] w-[500px] -ml-[380px] rounded-full bg-black/25"> </div> */}
<div>
    
    <div className="bg-[#EFF8F4] relative overflow-hidden rounded-lg p-4 mb-4">
    <div className=" absolute h-[500px] w-[500px] right-0 -mr-[250px] -mt-[250px] rounded-full bg-[#C8FAD680]"> </div>
    <div className=" absolute h-[700px] w-[700px] -ml-[580px] -mt-[50px] rounded-full bg-[#C8FAD680]"> </div>
      <div className="flex items-center relative gap-3 z-[5]">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={name}
          width={60}
          height={60}
          className="h-[60px] w-[60px] object-cover rounded-full"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[22px] text-gray-900">{name}</span>
            <span className="text-gray-500 text-[16px]">{username}</span>
          </div>
          <p className="text-[18px] text-gray-600 mt-0">{company}</p>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-[#F2DEFF80] relative  overflow-hidden rounded-lg p-10 text-center text-black">
  <div className=" absolute h-[500px] w-[500px] right-0 -mr-[250px] -mt-[370px] rounded-full bg-[#F2DEFF80]"> </div>
  <div className=" absolute h-[500px] w-[500px] -ml-[400px]  -mt-[120px] rounded-full bg-[#F2DEFF80]"> </div>
    <h4 className="font-bold mb-2 flex relative text-center w-full z-[5]  text-[24px]">Contact Owner for More Details</h4>
    <p className="text-gray-700 mb-6 text-[16px]">Get in touch with the owner</p>
    <div className="flex gap-3 justify-center">
      <Button className="bg-purple-600   px-8 py-4 font-medium hover:bg-purple-600 rounded-lg flex items-center gap-2">
        <PhoneCall size={20} />
        Contact
      </Button>
      <Button className="bg-transparent hover:bg-transparent text-purple-600 border-[2px] border-purple-500 px-8 py-4 font-medium rounded-lg flex items-center gap-2">
        <ChatTeardropText size={20} />
        Message
      </Button>
    </div>
  </div>
</div>
</div>

    )
}


export default Postedby;
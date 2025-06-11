import Image from "next/image"

export default function ConnectSection() {
  const friendRequests = [
    {
      id: 1,
      name: "Marcus Tony",
      image: "/diverse-person.png",
      mutualFriends: 5,
    },
    {
      id: 2,
      name: "Sophie Lu",
      image: "/diverse-group-two.png",
      mutualFriends: 3,
    },
    {
      id: 3,
      name: "Ava Green",
      image: "/diverse-group-outdoors.png",
      mutualFriends: 8,
    },
    {
      id: 4,
      name: "James Parker",
      image: "/diverse-group-four.png",
      mutualFriends: 2,
    },
  ]

  const suggestedUsers = [
    {
      id: 1,
      name: "Marcus Tony",
      image: "/diverse-person.png",
      followedBy: "Harry & 5 more",
    },
    {
      id: 2,
      name: "Michel Stark",
      image: "/diverse-group-five.png",
      suggestedFor: "you",
    },
    {
      id: 3,
      name: "Jacob Mark",
      image: "/diverse-group-six.png",
      followedBy: "Smith & 10 more",
    },
    {
      id: 4,
      name: "John Manual",
      image: "/chris-morgan.png",
      followedBy: "Bruce & 10 more",
    },
  ]

  return (
    <div>
      <div className="bg-white rounded-[12px] overfloe-hidden p-4 mb-8">
        <div className="flex items-center justify-between mb-2 border-b pb-4">
          <h2 className="text-lg font-semibold">Friend Requests</h2>
          <button className="text-purple-500 text-sm">View All</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {friendRequests.map((request) => (
            <div key={request.id} className="flex-shrink-0 w-[170px]">
              <div className="flex flex-col relative">
                <button className="absolute top-2 right-2 z-10 sm:hidden bg-black/10 rounded-lg p-1.5 hover:bg-black/30 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="relative h-[170px] w-[170px] overflow-hidden mb-3">
                  <Image
                    src={request.image || "/placeholder.svg"}
                    alt={request.name}
                    fill
                    className="object-cover rounded-[6px]"
                  />
                </div>
                <h3 className="font-medium mb-1">{request.name}</h3>
                <div className="flex mb-3">
                  <div className="flex -space-x-2">
                    <div className="h-5 w-5 rounded-full">
                      <Image
                        src="/imagesstatic/1.jpg"
                        alt={request.name}
                        height={5}
                        width={5}
                        className="object-cover rounded-full border border-white h-5 w-5"
                      />
                    </div>
                    <div className="h-5 w-5">
                      <Image
                        src="/imagesstatic/2.jpg"
                        alt={request.name}
                        height={5}
                        width={5}
                        className="object-cover rounded-full border border-white h-5 w-5"
                      />
                    </div>
                    <div className="h-5 w-5 rounded-full">
                      <Image
                        src="/imagesstatic/3.jpg"
                        alt={request.name}
                        height={5}
                        width={5}
                        className="object-cover rounded-full border border-white h-5 w-5"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">{request.mutualFriends} Mutual Friends</span>
                </div>
                <div className="flex gap-2 w-full">
                  <button className="hidden sm:block w-full py-1.5 text-xs text-gray-900 bg-[#F4F6F8] rounded-md">Ignore</button>
                  <button className="w-full py-1.5 text-xs text-white bg-[#8E33FF] rounded-md">Accept</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[12px] p-4">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">Suggested for you</h2>
        </div>

        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative h-[45px] w-[45px] overflow-hidden rounded-full mr-3">
                  <Image src={user.image || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-[16px]">{user.name}</h3>
                  {user.followedBy && <p className="text-[12px] text-gray-500">Followed by {user.followedBy}</p>}
                  {user.suggestedFor && (
                    <p className="text-[12px]  text-gray-500">Suggested for {user.suggestedFor}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="hidden sm:block px-3 py-1 text-xs bg-[#F4F6F8] rounded-[6px] text-[gray-500] hover:text-gray-700">Remove</button>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-xs text-[#8E33FF] rounded-[6px] bg-[#8E33FF]/10">Add Friend</button>
                  <button className="sm:hidden p-1.5  rounded-lg hover:bg-black/5 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4">View All</button>
      </div>
    </div>
  )
} 
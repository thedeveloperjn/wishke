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
      image: "/john-manual.png",
      followedBy: "Bruce & 10 more",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Friend Requests</h2>
          <button className="text-purple-500 text-sm">View All</button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {friendRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4">
              <div className="flex flex-col items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full mb-3">
                  <Image
                    src={request.image || "/placeholder.svg"}
                    alt={request.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-center mb-1">{request.name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex -space-x-2">
                    <div className="h-5 w-5 rounded-full bg-gray-300"></div>
                    <div className="h-5 w-5 rounded-full bg-gray-400"></div>
                    <div className="h-5 w-5 rounded-full bg-gray-500"></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">{request.mutualFriends} Mutual Friends</span>
                </div>
                <div className="flex gap-2 w-full">
                  <button className="w-full py-1.5 text-xs text-gray-500 border rounded-md">Ignore</button>
                  <button className="w-full py-1.5 text-xs text-white bg-purple-500 rounded-md">Accept</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Suggested for you</h2>
        </div>

        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-full mr-3">
                  <Image src={user.image || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  {user.followedBy && <p className="text-xs text-gray-500">Followed by {user.followedBy}</p>}
                  {user.suggestedFor && (
                    <p className="text-xs text-gray-500">Suggested for {user.suggestedFor}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700">Remove</button>
                <button className="px-3 py-1 text-xs text-purple-500 hover:text-purple-700">Add Friend</button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4">View All</button>
      </div>
    </div>
  )
} 
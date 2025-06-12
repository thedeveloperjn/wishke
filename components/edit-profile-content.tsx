"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Camera, Settings, Bell, Lock, Shield, Trash2, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function EditProfileContent() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("edit-profile")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Malvika Wilson",
    userName: "@malvikawill",
    bio: "Real Estate Maven | Home Design Buff | Community Advocate | Guiding you to your dream home, one key at a time!",
    accountType: "Individual",
    email: "malvikawillson@gmail.com",
    city: "Mumbai",
    locality: "",
    country: "India",
    dateOfBirth: {
      day: "16",
      month: "March",
      year: "2001",
    },
  })

  const [notifications, setNotifications] = useState({
    postRequestResponse: true,
    newDirectMessage: true,
    someoneAppliedYourComment: true,
    newFollowerConnectionRequest: true,
    fromEveryoneFollowRequest: true,
    fromEveryoneMessage: true,
    mentionOnYourPost: true,
    fromEveryoneMention: true,
    newGroupPost: true,
    fromEveryoneGroupPost: true,
    approvedAccount: true,
    propertyRequirementMatch: true,
    propertyMatchesYourInterest: true,
    requirementMatchesYourProperty: true,
    updatesAnnouncements: true,
    newProductLaunchFirstAccess: true,
    newFeatureOneDay: true,
    newAboutSort: true,
    securityAccount: true,
    loginFromNewDevice: true,
    unusualActivityDetection: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "only-me",
    messagingPrivacy: "no-one",
    propertyVisibility: "only-me",
    showRecentActivity: true,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDateChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: { ...prev.dateOfBirth, [field]: value },
    }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const renderEditProfile = () => (
    <div className="max-w-[100%]">
       <div className="h-48 bg-gradient-to-r from-[#C8FAD6] mb-20 to-[#F2DEFF] rounded-lg relative ">
       <div className="absolute bottom-0 -mb-16 ml-6">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Image
                src="/imagesstatic/malvika.jpg"
                alt="profile"
                width={150}
                height={150}
                className="rounded-full h-[150px] w-[150px] object-cover  border-4 border-white"
                priority
              />
              </div>
              </div>
              </div>
  
          
        </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-gray-400">
            <label className="block text-[16px] font-medium mb-2">Full Name</label>
            <Input
            readOnly
              value={formData.fullName}
              className="!text-[16px]  !bg-gray-100"
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Malvika Wilson"
            />
          </div>
          <div className="text-gray-400">
            <label className="block text-[16px] font-medium mb-2">User Name</label>
            <Input
            readOnly
              value={formData.userName}
              className="!text-[16px] !bg-gray-100"
              onChange={(e) => handleInputChange("userName", e.target.value)}
              placeholder="@malvikawill"
            />
          </div>
        </div>

        <div>
          <label className="block text-[16px] font-medium mb-2">Your Bio</label>
          <Textarea
            value={formData.bio}
           className="!text-[16px]"
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={4}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[16px] font-medium mb-2">Account Type</label>
            <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-[16px] font-medium mb-2">Date of Birth</label>
            <div className="flex gap-2">
              <Select  value={formData.dateOfBirth.day} onValueChange={(value) => handleDateChange("day", value)}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={formData.dateOfBirth.month} onValueChange={(value) => handleDateChange("month", value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                  <SelectItem value="November">November</SelectItem>
                  <SelectItem value="December">December</SelectItem>
                </SelectContent>
              </Select>
              <Select value={formData.dateOfBirth.year} onValueChange={(value) => handleDateChange("year", value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => (
                    <SelectItem key={2024 - i} value={String(2024 - i)}>
                      {2024 - i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[16px] font-medium mb-2">Email Address</label>
            <Input
              type="email"
              value={formData.email}
             className="!text-[16px]"
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="malvikawillson@gmail.com"
            />
          </div>
          <div>
            <label className="block text-[16px] font-medium mb-2">Country</label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-[16px]" value="India">🇮🇳 India</SelectItem>
                <SelectItem className="text-[16px]" value="USA">🇺🇸 USA</SelectItem>
                <SelectItem className="text-[16px]" value="UK">🇬🇧 UK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[16px] font-medium mb-2">City</label>
            <Input
              value={formData.city}
              className="!text-[16px]"
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Mumbai"
            />
          </div>
          <div>
            <label className="block text-[16px] font-medium mb-2">Your Locality</label>
            <Input
              value={formData.locality}
              className="!text-[16px]"
              onChange={(e) => handleInputChange("locality", e.target.value)}
              placeholder="Enter your locality"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.push("/profile")}>
            Cancel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Save</Button>
        </div>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="max-w-[100%] space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chat & Messaging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Post Request Response</p>
              <p className="text-sm text-gray-500">Get notified when someone responds to your post requests</p>
            </div>
            <Switch
              checked={notifications.postRequestResponse}
              onCheckedChange={(checked) => handleNotificationChange("postRequestResponse", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Direct Message</p>
              <p className="text-sm text-gray-500">Get notified for new direct messages</p>
            </div>
            <Switch
              checked={notifications.newDirectMessage}
              onCheckedChange={(checked) => handleNotificationChange("newDirectMessage", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social & Community</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Follower/Connection Request</p>
              <p className="text-sm text-gray-500">Get notified for new follower requests</p>
            </div>
            <Switch
              checked={notifications.newFollowerConnectionRequest}
              onCheckedChange={(checked) => handleNotificationChange("newFollowerConnectionRequest", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mention on Your Post</p>
              <p className="text-sm text-gray-500">Get notified when someone mentions you</p>
            </div>
            <Switch
              checked={notifications.mentionOnYourPost}
              onCheckedChange={(checked) => handleNotificationChange("mentionOnYourPost", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property & Requirements Match</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Property Requirement Match</p>
              <p className="text-sm text-gray-500">Get notified when properties match your requirements</p>
            </div>
            <Switch
              checked={notifications.propertyRequirementMatch}
              onCheckedChange={(checked) => handleNotificationChange("propertyRequirementMatch", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Property Matches Your Interest</p>
              <p className="text-sm text-gray-500">Get notified for properties matching your interests</p>
            </div>
            <Switch
              checked={notifications.propertyMatchesYourInterest}
              onCheckedChange={(checked) => handleNotificationChange("propertyMatchesYourInterest", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security & Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Account Verification Successful</p>
              <p className="text-sm text-gray-500">Get notified when your account is verified</p>
            </div>
            <Switch
              checked={notifications.securityAccount}
              onCheckedChange={(checked) => handleNotificationChange("securityAccount", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Login From New Device</p>
              <p className="text-sm text-gray-500">Get notified for new device logins</p>
            </div>
            <Switch
              checked={notifications.loginFromNewDevice}
              onCheckedChange={(checked) => handleNotificationChange("loginFromNewDevice", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderChangePassword = () => (
    <div className="max-w-[100%] space-y-6">
      <div className="bg-[#EFF8F4] p-4">
        <h3 className="text-lg font-semibold mb-4">Change Your Password</h3>
        <div className=" space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">New Password</label>
            <Input type="password" placeholder="Enter new password" className="!bg-transparent !py-6 !text-[16px]" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <Input type="password" placeholder="Confirm new password" className="!bg-transparent !py-6 !text-[16px]" />
          </div>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Changes</Button>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="max-w-[100%] space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Visibility</CardTitle>
          <p className="text-sm text-gray-500">Control who can view your profile</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="profileVisibility"
                value="only-me"
                checked={privacy.profileVisibility === "only-me"}
                onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                className="text-purple-600"
              />
              <span>Only Me</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="profileVisibility"
                value="my-connections"
                checked={privacy.profileVisibility === "my-connections"}
                onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                className="text-purple-600"
              />
              <span>My Connections</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="profileVisibility"
                value="everyone"
                checked={privacy.profileVisibility === "everyone"}
                onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                className="text-purple-600"
              />
              <span>Everyone</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Messaging Privacy</CardTitle>
          <p className="text-sm text-gray-500">Control who can contact you</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="messagingPrivacy"
                value="no-one"
                checked={privacy.messagingPrivacy === "no-one"}
                onChange={(e) => handlePrivacyChange("messagingPrivacy", e.target.value)}
                className="text-purple-600"
              />
              <span>No One</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="messagingPrivacy"
                value="only-verified-users"
                checked={privacy.messagingPrivacy === "only-verified-users"}
                onChange={(e) => handlePrivacyChange("messagingPrivacy", e.target.value)}
                className="text-purple-600"
              />
              <span>Only Verified Users</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="messagingPrivacy"
                value="everyone"
                checked={privacy.messagingPrivacy === "everyone"}
                onChange={(e) => handlePrivacyChange("messagingPrivacy", e.target.value)}
                className="text-purple-600"
              />
              <span>Everyone</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Visibility</CardTitle>
          <p className="text-sm text-gray-500">Control who can view your property listings</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="propertyVisibility"
                value="only-me"
                checked={privacy.propertyVisibility === "only-me"}
                onChange={(e) => handlePrivacyChange("propertyVisibility", e.target.value)}
                className="text-purple-600"
              />
              <span>Only Me</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="propertyVisibility"
                value="my-connections"
                checked={privacy.propertyVisibility === "my-connections"}
                onChange={(e) => handlePrivacyChange("propertyVisibility", e.target.value)}
                className="text-purple-600"
              />
              <span>My Connections</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="propertyVisibility"
                value="everyone"
                checked={privacy.propertyVisibility === "everyone"}
                onChange={(e) => handlePrivacyChange("propertyVisibility", e.target.value)}
                className="text-purple-600"
              />
              <span>Everyone</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show My Recent Activity</p>
              <p className="text-sm text-gray-500">Let others see your recent activity</p>
            </div>
            <Switch
              checked={privacy.showRecentActivity}
              onCheckedChange={(checked) => handlePrivacyChange("showRecentActivity", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const sidebarItems = [
    { id: "edit-profile", label: "Edit Profile", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "change-password", label: "Change Password", icon: Lock },
    { id: "privacy-setting", label: "Privacy Setting", icon: Shield },
  ]

  return (
    <div className="flex pb-6 gap-6 bg-gray-50 relative min-h-screen">
      {/* Settings Gear Icon - Only visible on mobile */}
      <div className="md:hidden absolute top-3 right-6 z-10">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-2 hover:bg-gray-100 bg-gray-100 rounded-md transition-colors"
        >
          <Settings className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Settings Sidebar - Slides in from right on mobile, sticky on web */}
      <div 
        className={`md:sticky md:top-0 h-[94vh] sm:h-[calc(85vh)] fixed top-0 right-0 w-80 bg-white p-6 transform rounded-xl transition-transform duration-300 z-[50] md:z-0 ease-in-out  ${
          isSettingsOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/profile")} className="md:hidden">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Account Setting</h2>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                activeSection === item.id ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveSection(item.id)
                setIsSettingsOpen(false)
              }}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-left text-red-600 hover:bg-red-50">
            <Trash2 className="h-5 w-5" />
            Delete Your Account
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-left text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 rounded-[10px] bg-white">
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/profile")} className="hidden md:flex">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {activeSection === "edit-profile" && "Edit Profile"}
              {activeSection === "notifications" && "Notifications"}
              {activeSection === "change-password" && "Change Password"}
              {activeSection === "privacy-setting" && "Privacy Setting"}
            </h1>
          </div>
        </div>

        {activeSection === "edit-profile" && renderEditProfile()}
        {activeSection === "notifications" && renderNotifications()}
        {activeSection === "change-password" && renderChangePassword()}
        {activeSection === "privacy-setting" && renderPrivacySettings()}
      </div>

      {/* Overlay when settings is open - Only on mobile */}
      {isSettingsOpen && (
        <div 
          className="md:hidden fixed inset-0  bg-black/20 z-40"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}
      
    </div>
  )
}

"use client"

import { useState } from "react"
import { X, Upload, Edit2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CaretCircleLeft, PencilSimpleIcon, PencilSimpleLineIcon } from "@phosphor-icons/react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

interface GoogleUser {
  name: string
  email: string
  picture: string
  given_name: string
  family_name: string
}

interface Country {
  code: string
  name: string
  flag: string
  prefix: string
}

const countries: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳", prefix: "+91" },
  { code: "US", name: "United States", flag: "🇺🇸", prefix: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", prefix: "+44" },
  { code: "CA", name: "Canada", flag: "🇨🇦", prefix: "+1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", prefix: "+61" },
  { code: "DE", name: "Germany", flag: "🇩🇪", prefix: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", prefix: "+33" },
  { code: "JP", name: "Japan", flag: "🇯🇵", prefix: "+81" },
  { code: "CN", name: "China", flag: "🇨🇳", prefix: "+86" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", prefix: "+55" },
  { code: "RU", name: "Russia", flag: "🇷🇺", prefix: "+7" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", prefix: "+82" },
  { code: "IT", name: "Italy", flag: "🇮🇹", prefix: "+39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", prefix: "+34" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", prefix: "+52" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", prefix: "+54" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", prefix: "+27" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", prefix: "+234" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", prefix: "+20" },
  { code: "AE", name: "UAE", flag: "🇦🇪", prefix: "+971" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", prefix: "+966" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", prefix: "+65" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", prefix: "+60" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", prefix: "+66" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", prefix: "+62" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", prefix: "+63" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", prefix: "+84" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", prefix: "+880" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", prefix: "+92" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", prefix: "+94" },
]

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]) // Default to India
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    day: "16",
    month: "March",
    year: "2001",
    email: "",
    gender: "Male",
    country: "India",
    city: "Mumbai",
    locality: "",
    password: "",
    confirmPassword: "",
    accountType: "Individual",
    accountName: "",
    userName: "",
    profilePicture: "",
  })

  if (!isOpen) return null

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setShowCountryDropdown(false)
  }

  const handleContinueWithOTP = () => {
    setCurrentStep(2)
  }

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true)

    try {
      // Load Google Identity Services
      if (typeof window !== "undefined" && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        })

        // Prompt the user to select a Google account
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to popup if prompt is not displayed
            window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
              theme: "outline",
              size: "large",
              width: "100%",
            })
            // Trigger click programmatically
            setTimeout(() => {
              const button = document
                .getElementById("google-signin-button")
                ?.querySelector("div[role='button']") as HTMLElement
              if (button) {
                button.click()
              }
            }, 100)
          }
        })
      } else {
        // Load Google Identity Services script if not loaded
        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        script.defer = true
        script.onload = () => {
          handleGoogleSignup() // Retry after script loads
        }
        document.head.appendChild(script)
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error)
      setIsGoogleLoading(false)
    }
  }

  const handleGoogleResponse = async (response: any) => {
    try {
      // Decode the JWT token to get user info
      const userInfo = parseJwt(response.credential)

      if (userInfo) {
        const googleUser: GoogleUser = {
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          given_name: userInfo.given_name,
          family_name: userInfo.family_name,
        }

        // Update form data with Google user info
        setFormData({
          ...formData,
          fullName: googleUser.name,
          email: googleUser.email,
          accountName: googleUser.name,
          userName: `@${googleUser.given_name?.toLowerCase() || googleUser.name.toLowerCase().replace(/\s+/g, "")}`,
          profilePicture: googleUser.picture,
        })

        // Move to step 3 (register form)
        setCurrentStep(3)
      }
    } catch (error) {
      console.error("Error processing Google response:", error)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  // Helper function to parse JWT token
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error("Error parsing JWT:", error)
      return null
    }
  }

  const handleAppleSignup = () => {
    // Simulate getting data from Apple
    setFormData({
      ...formData,
      fullName: "Malvika Willson",
      email: "malvika.willson@icloud.com",
    })
    setCurrentStep(3) // Skip OTP for Apple signup
  }

  const handleIDPasswordLogin = () => {
    setCurrentStep(3) // Go to register form for ID & Password
  }

  const handleCreateAccount = () => {
    setCurrentStep(3) // Go directly to register form
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerifyOtp = () => {
    setCurrentStep(3)
  }

  const handleRegisterContinue = () => {
    setCurrentStep(4)
  }

  const handleFinalSubmit = () => {
    // Complete the signup process
    console.log("Final form data:", formData)
    onClose()
  }

  const renderStep1 = () => (
    <div className="w-[510px] bg-white shadow-xl rounded-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-3">Mobile Number</label>
          <div className="flex">
            {/* Country Flag Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center justify-center px-3 py-3 border border-r-0 rounded-l-full bg-white transition-colors w-16"
              >
                <span className="text-xl">{selectedCountry.flag}</span>
                <ChevronDown className="h-3 w-3 text-gray-400 ml-1" />
              </button>

              {/* Country Dropdown Menu */}
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto no-scrollbar w-72">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-lg mr-3">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{country.name}</div>
                        <div className="text-xs text-gray-500">{country.prefix}</div>
                      </div>
                      <span className="text-sm text-gray-400">{country.prefix}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Prefix Display */}
            <div className="flex items-center px-1 pl-3 pr-1 border border-r-0   bg-white">
              <span className="text-sm font-medium text-gray-500">{selectedCountry.prefix}</span>
            </div>

            {/* Phone Number Input */}
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-l-none rounded-r-full border-l-0  py-3 h-[54px] flex-1"
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        <Button
          className="w-full bg-[#02968A] hover:bg-[#02968A]/90 text-white py-6 space-y-2 rounded-full text-base"
          onClick={handleContinueWithOTP}
        >
          Continue with OTP
        </Button>

        <div className="text-center text-gray-400 text-sm">or</div>

        <Button
          variant="outline"
          className="w-full rounded-full  flex items-center justify-center gap-3  space-y-2 py-6 font-light text-base"
          onClick={handleGoogleSignup}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          {isGoogleLoading ? "Signing in..." : "Continue with Google"}
        </Button>

        {/* Hidden Google Sign-In button for fallback */}
        <div id="google-signin-button" style={{ display: "none" }}></div>

        <Button
          variant="outline"
          className="w-full rounded-full flex items-center font-light justify-center gap-3  space-y-2 py-6 text-base"
          onClick={handleAppleSignup}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Continue with Apple
        </Button>

        <Button variant="outline" className="w-full rounded-full flex items-center font-light justify-center gap-3 py-6 text-base" onClick={handleIDPasswordLogin}>
          Continue with ID & Password
        </Button>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">New User? </span>
          <button className="text-sm text-teal-600 hover:underline" onClick={handleCreateAccount}>
            Create an Account
          </button>
        </div>

        <div className="text-center text-xs text-gray-400 mt-10">
          <span>Terms & Conditions</span> • <span>Privacy Policy</span>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {showCountryDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowCountryDropdown(false)} />}
    </div>
  )
  const renderStep2 = () => {
    // Check if all four OTP digits are filled
    const isOtpComplete = otp.every((digit) => digit.length === 1);
  
    return (
      <div className="w-[510px] bg-white shadow-xl rounded-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Enter OTP</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
  
        <div className="space-y-8">
          <div>
            <p className="text-base text-gray-600 mb-4">We've sent a 4-digit OTP to your mobile number.</p>
            <div className="flex items-center text-[#02968A] gap-3 mb-14">
              <span className="text-base font-medium">
                {selectedCountry.prefix} {phoneNumber}
              </span>
              <PencilSimpleLineIcon size={20} className="text-gray-400" />
            </div>
          </div>
  
          <div className="flex gap-4 justify-center">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-14 rounded-[10px] !border-gray-300  h-14 text-center text-xl font-medium"
                maxLength={1}
              />
            ))}
          </div>
  <div className="w-full flex justify-center items-center">
          <Button
            className={`w-full max-w-[70%]  py-6 rounded-full text-base text-white ${
              isOtpComplete ? "bg-[#02968A] hover:bg-[#02968A]/95" : "bg-gray-600"
            }`}
            onClick={handleVerifyOtp}
            disabled={!isOtpComplete}
          >
            Verify OTP
          </Button>
  </div>
          <div className="text-center mb-[100px]">
            <span className="text-sm text-gray-600">Didn't receive the OTP? </span>
            <button className="text-sm text-teal-600 hover:underline">Resend OTP</button>
          </div>
  
          <div className="text-center text-xs text-gray-400 mt-6">
            <span>Terms & Conditions</span> • <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    );
  };
  const renderStep3 = () => (
    <div className="w-[520px] bg-white shadow-xl rounded-xl p-8 max-h-[90vh] overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="text-base text-gray-600 mt-2">Please Enter Your Personal Information</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-base text-sm font-medium mb-2">Full Name</label>
          <Input
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="py-6 text-[16px]"
          />
        </div>

        <div>
          <label className="block text-base text-sm font-medium mb-2">Date of Birth</label>
          <div className="flex gap-3">
            <select className="flex-1 p-3 border rounded-md text-base" value={formData.day}>
              <option>16</option>
            </select>
            <select className="flex-1 p-3 border rounded-md text-base" value={formData.month}>
              <option>March</option>
            </select>
            <select className="flex-1 p-3 border rounded-md text-base" value={formData.year}>
              <option>2001</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-base text-sm font-medium mb-2">Email Address</label>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="py-6"
          />
        </div>

        <div>
          <label className="block text-base text-sm font-medium mb-2">Gender</label>
          <div className="flex gap-3">
            {["Male", "Female", "Other"].map((gender) => (
              <button
                key={gender}
                className={`flex px-6 w-[110px] text-center py-2  bg-gray-100 rounded-full w-auto text-base ${formData.gender === gender ? "bg-gray-200" : ""}`}
                onClick={() => setFormData({ ...formData, gender })}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-base text-sm font-medium mb-2">Country</label>
          <select className="w-full p-3 border rounded-md text-base" value={formData.country}>
            <option>🇮🇳 India</option>
          </select>
        </div>

        <div>
          <label className="block text-base text-sm font-medium mb-2">City</label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="py-6"
          />
        </div>

        <div>
          <label className="block text-base text-sm font-medium mb-2">Choose Your Locality</label>
          <Input
            placeholder="Explore nearby properties and posts"
            value={formData.locality}
            onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
            className="py-6"
          />
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-xl font-medium mb-6">Create Your Password</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-base text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="py-6"
              />
            </div>

            <div>
              <label className="block text-base text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="py-6"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-[#02968A] rounded-full   text-white py-6 text-base mt-8 mb-4"
          onClick={handleRegisterContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="w-[510px] bg-white rounded-xl shadow-xl p-8 max-h-[90vh] overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Account Setup</h2>
          <p className="text-sm text-gray-600 mt-2">Setup Your Account Information</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div style={{outline:"2px dashed #d4d4d4",outlineOffset:"8px"}} className="w-[122px] h-[122px] mx-auto my-10 bg-gray-100  rounded-full flex items-center justify-center mb-6">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>

          <p className="text-base text-[16px] font-medium mb-1">Update Profile Image</p>
          <p className="text-[14px] text-gray-400">PNG, JPG or JPEG</p>
        </div>

        <div>
          <p className="text-base font-medium mb-2">Account Type</p>
          <div className="flex gap-3">
            <button
              className="flex-1 py-2 px-2 max-w-[122px] rounded-full text-[16px] bg-[#42C86B] text-white"
              onClick={() => setFormData({ ...formData, accountType: "Individual" })}
            >
              Individual
            </button>
            <button
              className="flex-1 py-2 max-w-[122px] px-2 bg-gray-100 text-gray-600 rounded-full text-[16px]"
              onClick={() => setFormData({ ...formData, accountType: "Business" })}
            >
              Business
            </button>
          </div>
        </div>

        <div>
          <p className="text-base text-sm font-medium mb-2">Account Name</p>
          <Input
            value={formData.accountName}
            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
            className="py-6 text-[16px]"
          />
        </div>

        <div>
          <p className="text-base text-[sm] font-medium mb-2">User Name</p>
          <Input
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            className="py-6 text-[16px]"
          />
          {/* <p className="text-xs text-green-600 mt-2">User Name Available</p> */}
        </div>

        <Button className="w-full bg-[#02968A] rounded-full  text-white py-6 text-[16px]" onClick={handleFinalSubmit}>
          Submit
        </Button>

        <div className="flex items-center justify-center">
          <button
            className="text-[16px] text-[#656565] flex items-center justify-center gap-3"
            onClick={() => setCurrentStep(3)}
          >
            <CaretCircleLeft size={24} /> Back to Previous
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[10px] " onClick={onClose} />
      <div className="relative z-10">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>
    </div>
  )
}

// Extend the Window interface to include Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (callback?: (notification: any) => void) => void
          renderButton: (element: HTMLElement, config: any) => void
        }
      }
    }
  }
}

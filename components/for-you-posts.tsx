import PropertyPost from "@/components/property-post"
import ProjectPost from "@/components/project-post"
import RequirementPost from "@/components/requirement-post"

export default function ForYouPosts() {
  return (
    <div className="mt-4">
      {/* Property post with single image */}
      <PropertyPost
        type="property"
        title="3BHK Residential-Flat"
        location="Andheri, Mumbai"
        price="₹75K per Month"
        description="Discover your dream home in the heart of Andheri, Mumbai! This stunning 3BHK flat is located in a secure gated community with modern amenities and spacious rooms."
        timestamp="23 April at 10:23 AM"
        authorName="Samantha Rivers"
        authorImage="/stylish-profile-picture.png"
        images={[{ type: "image", url: "/modern-apartment-exterior.png" }]}
        likes={654}
        comments={122}
      />

      {/* Project post with multiple images */}
      <ProjectPost
        title="Project X • 3, 4, 5 BHK Flats • 5BHK Residential-Bungalow"
        developer="Godrej Properties"
        location="Godrej Evenue 11, Mahalaxmi, Mumbai South"
        priceRange="₹21 Cr - 40 Cr"
        description="For athletes, high altitude produces two contradictory effects on performance. For performance. For explosive events..."
        timestamp="24 April at 12:16 PM"
        authorName="Mark Russel"
        authorImage="/jamie-parker.png"
        images={[
          { type: "image", url: "/luxury-tower-pool.png" },
          { type: "image", url: "/modern-apartment-exterior.png" },
          { type: "image", url: "/luxury-lobby.png" }
        ]}
        likes={76}
        comments={24}
      />

      {/* Requirement post */}
      <RequirementPost
        title="Looking for 2/3 BHK Apartment"
        budget="₹50K - 80K per Month"
        location="Bandra, Juhu, or Andheri"
        description="I'm looking for a well-maintained apartment in a good locality with 24/7 security, covered parking, and modern amenities. Prefer a family-friendly community."
        timestamp="25 April at 9:42 AM"
        authorName="Alex Carter"
        authorImage="/imagesstatic/1.jpg"
        likes={32}
        comments={18}
      />
    </div>
  )
} 
import PropertyPost from "@/components/property-post"
import ProjectPost from "@/components/project-post"

export default function FollowingPosts() {
  return (
    <div className="mt-4">
      {/* Property post with single image */}
      <PropertyPost
        type="property"
        title="4BHK Luxury Villa"
        location="Powai, Mumbai"
        price="₹2.5L per Month"
        description="Experience luxury living in this stunning 4BHK villa located in the heart of Powai. Features include a private pool, landscaped garden, and smart home automation."
        timestamp="26 April at 11:30 AM"
        authorName="David Chen"
        authorImage="/diverse-group-profile.png"
        images={[{ type: "image", url: "/luxury-villa.png" }]}
        likes={432}
        comments={89}
      />

      {/* Project post with multiple images */}
      <ProjectPost
        title="Luxury Heights • Premium Apartments"
        developer="Lodha Group"
        location="Worli, Mumbai"
        priceRange="₹5 Cr - 8 Cr"
        description="Introducing Luxury Heights, where elegance meets modern living. Our premium apartments offer breathtaking views and world-class amenities."
        timestamp="27 April at 2:15 PM"
        authorName="Sarah Johnson"
        authorImage="/stylish-profile-picture.png"
        images={[
          { type: "image", url: "/luxury-apartment.png" },
          { type: "image", url: "/luxury-interior.png" },
          { type: "image", url: "/luxury-amenities.png" }
        ]}
        likes={567}
        comments={123}
      />
    </div>
  )
} 
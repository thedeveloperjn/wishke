import PropertyPost from "@/components/property-post"


export default function FollowingPosts() {
  return (
    <div className="mt-0 sm:mt-4">


       {/* Project post with multiple images */}
       <PropertyPost
      type="project"
        title="3, 4, 5 BHK Flats"
  
        location="Mumbai South"
        price="₹21 Cr - 40 Cr"
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

     



    </div>
  )
} 
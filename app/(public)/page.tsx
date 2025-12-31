import { Hero } from "@/components/sections/Hero";
import { BrandStory } from "@/components/sections/BrandStory";
import { MenuHighlights } from "@/components/sections/MenuHighlights";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { LocationServices } from "@/components/sections/LocationServices";
import { TrustAchievements } from "@/components/sections/TrustAchievements";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <MenuHighlights />
      <GoogleReviews />
      <TrustAchievements />
      <LocationServices />
    </>
  );
}

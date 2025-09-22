import Banner from "./Commponents/Banner/Banner";
import Fashion from "./Commponents/Fashion/Fashion";
import TrendingSection from "./Commponents/Trending/TrendingSection";
import Testimonials from "./Commponents/testimonials/Testimonials";
import  "./Commponents/YouMayLike/YouMakeLike"
import { YouMakeLikess } from "./Commponents/YouMayLike/YouMakeLike";
import Features from "./Commponents/Features/Features";

export default function Home() {
  return (
    <>
      <Banner />
      <Fashion />
      <TrendingSection />
      <Testimonials/>
      <YouMakeLikess/>
      <Features/>
    </>
  );
}

export const dynamic = "force-dynamic";
import Banner from "../../Commponents/Banner/Banner";
import Fashion from "../../Commponents/Fashion/Fashion";
import TrendingSection from "../../Commponents/Trending/TrendingSection";
import Testimonials from "../../Commponents/testimonials/Testimonials";
import Features from "../../Commponents/Features/Features";
import Faq from "../../Commponents/faq/Faq"


export default function Home() {
  return (
    <>
      <Banner />
      <Fashion />
      <Features/>
      <TrendingSection />
      <Testimonials/>
      {/* <YouMakeLikess/> */}
      <Faq/>
    </>
  );
}

import Banner from "./Commponents/Banner/Banner";
import Card from "./Commponents/Card/Card";
import Fashion from "./Commponents/Fashion/Fashion";
import TrendingSection from "./Commponents/Trending/TrendingSection";
import Testimonials from "./Commponents/testimonials/Testimonials";
import YouLike from "./Commponents/You May Like/YouLike"


export default function Home() {
  return (
    <>
      <Banner />
      <Fashion />
      <TrendingSection />
      < Testimonials/>
      <YouLike/>
    </>
  );
}

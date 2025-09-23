import CategoriesCard from "../Commponents/Categories/categoriesCard";
import Women from "../Commponents/Categories/women/Women";
import { WomenData } from "../Commponents/Categories/women/WomenData";
export default function Womens() {
  return (
    <>
      <Women data={WomenData}/>
    </>
  );
}

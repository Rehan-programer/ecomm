import Baby from "../Commponents/Categories/babyfashion/Baby";
import { BabyProducts } from "../Commponents/Categories/babyfashion/BabyData";


export default function baby() {
  return (
    <>
      <Baby products={BabyProducts}/>
    </>
  );
}

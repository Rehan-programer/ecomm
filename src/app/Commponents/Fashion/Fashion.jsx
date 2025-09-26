import { fashionData } from "./FashionData";
import Link from "next/link";

const Fashion = () => {
  return (
    <section className="bg-white md:px-4 py-10">
      <div className="container max-w-[2000px] lg:w-[90%] px-2  w-full m-auto ">
        <div className="md:flex m-auto justify-center  gap-8 ">
          {fashionData.map((item) => (
            <Link href={item.category}
              key={item.id}
              className="group relative overflow-hidden shadow-md cursor-pointer 
              w-[96%]  lg:w-[550px] mb-4 lg:mb-10 m-auto  max-w-[580px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[300px]  md:h-[400px] lg:h-[350px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-[-4%] lg:bottom-[-14%]  left-0 w-full gradient-bottom">
                <div className="text-center py-6 transform transition-all duration-500 group-hover:-translate-y-20 ">
                  <h5 className="text-white  mb-10 font-semibold">
                    {item.name}
                  </h5>
                  <p>
                    <span className="text-gray-200 hover:text-[#FF2020] transition-colors duration-300">
                      Shop Now →
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fashion;

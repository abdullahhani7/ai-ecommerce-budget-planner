import Image from "next/image";
import Link from "next/link";


interface Category {
  slug: string;
  name: string;
  image: string;
}

interface TopCategoryListProps {
  categoryList: Category[];
  selectedCategory?: string;
}




const TopCategoryList = ({ categoryList, selectedCategory }:TopCategoryListProps) => {
  return (
    <div className="gap-10 md:gap-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-9  justify-items-center items-center mt-5">
      {categoryList.map((cat, index) => (
        <Link
          href={`/categories/products/${cat.slug}`}
          key={index}
          className={`w-30 h-35 mt-3    p-3 flex flex-col items-center text-center group ${
            selectedCategory === cat.slug && "bg-emerald-400 text-white"
          } `}
        >
          <Image
            src={cat?.image}
            width={70}
            height={70}
            alt=""
            className="mb-2 rounded-full w-[70px] h-[70px] object-cover  hover:scale-125 transition-all cursor-pointer"
          />
          <small
            className={`text-emerald-600 font-bold capitalize ${
              selectedCategory === cat.slug && "bg-emerald-400 text-white"
            }`}
          >
            {cat?.name}
          </small>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;

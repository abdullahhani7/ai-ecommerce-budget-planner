import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Category {
  slug: string;
  name: string;
  image: string;
}

interface TopCategoryListProps {
  categoryList: Category[];
  selectedCategory?: string;
}

const TopCategoryList = ({
  categoryList,
  selectedCategory,
}: TopCategoryListProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full mt-5"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {categoryList.map((cat, index) => (
          <CarouselItem
            key={index}
            // هنا بنتحكم في عدد العناصر: 
            // basis-1/3 (موبايل) | basis-1/5 (تابلت) | basis-1/9 (شاشة كبيرة)
            className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-[13.11%]"
          >
            <Link
              href={`/categories/products/${cat.slug}`}
              className={`flex flex-col items-center text-center group p-3 rounded-xl transition-all ${
                selectedCategory === cat.slug ? "bg-emerald-400 text-white" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative mb-2 w-[70px] h-[70px] overflow-hidden rounded-full border-2 border-transparent group-hover:border-emerald-200 transition-all">
                <Image
                  src={cat?.image}
                  fill // أفضل عشان الـ object-cover يشتغل صح
                  alt={cat?.name}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <small
                className={`font-bold capitalize transition-colors ${
                  selectedCategory === cat.slug ? "text-white" : "text-emerald-600"
                }`}
              >
                {cat?.name}
              </small>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* اختيار اختياري: لو عاوز تظهر أسهم التحكم */}
      <CarouselPrevious className="left-2 h-8 w-8 border-emerald-200 text-emerald-600 hover:bg-emerald-50" />
  
  {/* السهم اليمين: هنرجعه لجوه شوية */}
  <CarouselNext className="right-2 h-8 w-8 border-emerald-200 text-emerald-600 hover:bg-emerald-50" />
    </Carousel>
  );
};

export default TopCategoryList;

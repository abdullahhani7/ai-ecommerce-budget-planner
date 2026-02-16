import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsList = ({ productsList, heading }) => {
  return (
    <div className="mt-10 mb-30">
      <h2 className="px-5 font-bold text-2xl text-emerald-500 my-8">
        Popular Products 
      </h2>

      {/* Grid container */}
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {productsList && productsList?.slice(0, 12).map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-4 flex-1">
                {product.description}
              </p>
              <div className="flex flex-col items-center justify-between mt-auto">
                <span className="font-bold text-lg text-emerald-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                <Button
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 w-full p-2"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;

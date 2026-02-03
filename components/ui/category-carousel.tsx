"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
// import { Category } from "@prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";


type Category = {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
};


interface CategoryCarouselProps {
  categories: Category[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  return (
    <div className="w-full relative">
      <div className="flex justify-between items-end mb-8 px-1">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600 mt-2">
            Explore our wide range of fresh products.
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          {/* Custom navigation buttons will be handled by CarouselNext/Previous if needed, 
                     but standard Shadcn Carousel puts them on the sides or we can style them.
                     Let's use the default absolute positioning for now or customize them.
                 */}
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="group block h-full"
              >
                <Card className="h-full border-2 border-transparent hover:border-emerald-100 transition-all duration-300 hover:shadow-lg rounded-2xl overflow-hidden bg-white">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-square overflow-hidden bg-emerald-50">
                      <img
                        src={
                          category.image || "https://via.placeholder.com/150"
                        }
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-emerald-600 transition-colors text-lg">
                        {category.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-4 lg:-left-12 h-10 w-10 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300" />
          <CarouselNext className="-right-4 lg:-right-12 h-10 w-10 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300" />
        </div>
      </Carousel>
    </div>
  );
}

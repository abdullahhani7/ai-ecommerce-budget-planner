import { getProductById } from "@/app/_utils/Api";
import { Check } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  const product = await getProductById(id);
  console.log("product", product);

  if (!product) {
    notFound();
  }

  // Parse nutritional info safely
  const nutritionalInfo = product.nutritional_info as Record<
    string,
    number
  > | null;

  console.log("nutritionalInfo:", nutritionalInfo);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Section */}
        <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 aspect-square md:aspect-auto h-full max-h-[600px] relative">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            fill
          />
        </div>

        {/* Info Section */}

        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
              {product.category}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-emerald-800">
              ${Number(product.price).toFixed(2)}
            </p>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>In Stock ({product.stock} units)</span>
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {nutritionalInfo && (
            <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100">
              <h3 className="font-semibold text-emerald-900 mb-4">
                Nutritional Information (per serving)
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <span className="block text-2xl font-bold text-emerald-800">
                    {nutritionalInfo.calories}
                  </span>
                  <span className="text-xs text-emerald-600 uppercase font-medium">
                    Calories
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-bold text-emerald-800">
                    {nutritionalInfo.protein}g
                  </span>
                  <span className="text-xs text-emerald-600 uppercase font-medium">
                    Protein
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-bold text-emerald-800">
                    {nutritionalInfo.carbs}g
                  </span>
                  <span className="text-xs text-emerald-600 uppercase font-medium">
                    Carbs
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-bold text-emerald-800">
                    {nutritionalInfo.fat}g
                  </span>
                  <span className="text-xs text-emerald-600 uppercase font-medium">
                    Fat
                  </span>
                </div>
              </div>
            </div>
          )}

       
        </div>
      </div>
    </div>
  );
};

export default page;

import React from "react";
import { BudgetPlannerSheet } from "./_components/BudgetPlannerSheet";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "./_utils/Api";
import Image from "next/image";





async function fetchFeaturedProducts() {
  try {
    const products = await getFeaturedProducts();
    console.log("products", products);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const page = async () => {
  const featuredProducts = await fetchFeaturedProducts();
  console.log(featuredProducts);
  console.log("featuredProducts", featuredProducts);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80')] bg-cover bg-center opacity-30 "></div>

        <div className="relative container mx-auto px-4 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
            <span className="flex h-2 w-2 rounded-full bg-yellow-400 mr-2"></span>
            The Future of Grocery Shopping
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl leading-tight">
            Smart Shopping for <br />
            <span className="text-emerald-400">Restocking Your Fridge</span>
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Use our AI Budget Planner to generate personalized meal plans and
            shopping lists instantly. Save money and eat better with EcoCart AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button className=" ">
              <Link className="flex items-center" href="/products gap-2">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <BudgetPlannerSheet />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-emerald-50/50">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">100% Organic</h3>
            <p className="text-gray-600">
              Sourced directly from certified organic farms ensuring quality.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-emerald-50/50">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Fast Delivery</h3>
            <p className="text-gray-600">
              Same-day delivery for orders placed before 2 PM in your area.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-emerald-50/50">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Fresh Guarantee</h3>
            <p className="text-gray-600">
              Not satisfied? We'll refund your money if produce isn't fresh.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Fresh Arrivals
              </h2>
              <p className="text-gray-600 mt-2">
                Check out the latest additions to our store.
              </p>
            </div>
            <Link
              href="/products"
              className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline flex items-center"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts &&
            featuredProducts.map((product: any) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image Section */}
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

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
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
};

export default page;

import React from "react";
import { BudgetPlannerSheet } from "./_components/BudgetPlannerSheet";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
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
    </main>
  );
};

export default page;

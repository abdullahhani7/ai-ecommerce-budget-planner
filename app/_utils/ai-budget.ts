"use server";

import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import supabase from "../supabase"; // تعديل هنا

const budgetSchema = z.object({
  budget: z.number().min(1, "Budget must be at least $1"),
  days: z.number().min(1, "Days must be at least 1").max(30, "Max 30 days"),
  people: z.number().min(1, "People must be at least 1"),
});

export type BudgetState = {
  message: string;
  success: boolean;
  error?: {
    budget?: string[];
    days?: string[];
    people?: string[];
  };
  plan?: {
    meals: Array<{
      day: number;
      mealType: string;
      name: string;
      ingredients: string[];
    }>;
    matchedProducts: Array<{
      id: string;
      name: string;
      price: number;
      image: string;
    }>;
    totalCost: number;
    remainingBudget: number;
  };
};

export async function createBudgetPlan(
  prevState: BudgetState,
  formData: FormData,
): Promise<BudgetState> {
  const budget = Number(formData.get("budget"));
  const days = Number(formData.get("days"));
  const people = Number(formData.get("people"));

  const validation = budgetSchema.safeParse({ budget, days, people });
  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed",
      error: validation.error.flatten().fieldErrors,
    };
  }

  // 0️⃣ Fetch available products
  const { data: availableProducts, error } = await supabase
    .from("products")
    .select("id, name, price, image");

  if (error || !availableProducts) {
    return {
      success: false,
      message: "Failed to fetch products",
    };
  }

  const productListString = availableProducts
    .map((p) => `- ${p.name} ($${Number(p.price).toFixed(2)})`)
    .join("\n");

  try {
    // 1️⃣ Use cheaper model for dev/testing
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        meals: z.array(
          z.object({
            day: z.number(),
            mealType: z.string(),
            name: z.string(),
            ingredients: z.array(z.string()),
          }),
        ),
        shoppingList: z.array(z.string()),
      }),
      system: `You are an expert AI Budget Meal Planner.
      Your goal is to create a nutritious and delicious meal plan for ${people} people for ${days} days, STRICTLY adhering to a budget of $${budget}.
      Use only products from our store:
      ${productListString}`,
      prompt: `Create a plan for ${days} days for ${people} people with a max budget of $${budget}.`,
    });

    const aiResponse = result.object;

    // 2️⃣ Match products
    const matchedProducts: any[] = [];
    let totalCost = 0;
    for (const itemName of aiResponse.shoppingList) {
      const product =
        availableProducts.find((p) => p.name === itemName) ?? null;

      if (product && !matchedProducts.find((p) => p.id === product.id)) {
        matchedProducts.push({ ...product, price: Number(product.price) });
        totalCost += Number(product.price);
      }
    }

    return {
      success: true,
      message: "Plan generated successfully!",
      plan: {
        meals: aiResponse.meals,
        matchedProducts,
        totalCost,
        remainingBudget: budget - totalCost,
      },
    };
  } catch (error: any) {
    console.error("AI/Supabase Error:", error?.message || error);

    // ✅ fallback mock plan
    return {
      success: true,
      message: "Using mock plan due to API limit.",
      plan: {
        meals: [
          {
            day: 1,
            mealType: "Breakfast",
            name: "Omelette with veggies",
            ingredients: ["Eggs", "Tomatoes", "Onions"],
          },
        ],
        matchedProducts: availableProducts.slice(0, 3).map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          image: p.image,
        })),
        totalCost: availableProducts
          .slice(0, 3)
          .reduce((sum, p) => sum + Number(p.price), 0),
        remainingBudget:
          budget -
          availableProducts
            .slice(0, 3)
            .reduce((sum, p) => sum + Number(p.price), 0),
      },
    };
  }
}

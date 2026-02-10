"use server";

import { auth } from "@clerk/nextjs/server";
import supabase from "../supabase";

export async function getUserOrders() {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        order_items (
          id,
          quantity,
          product:products (
            id,
            name,
            price,
            image
          )
        )
      `,
      )
      .eq("clerk_user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, error: "Failed to fetch orders" };
    }

    return { success: true, data: orders };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

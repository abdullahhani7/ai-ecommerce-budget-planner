"use server";

import { auth } from "@clerk/nextjs/server";
import supabase from "../supabase";

// get cart
export async function getCart() {
  const { userId } = await auth();
  if (!userId) return null;

  const { data: cart, error } = await supabase
    .from("carts")
    .select(
      `
      id,
      clerk_user_id,
      created_at,
      cart_items (
        id,
        quantity,
        product_id,
        products (
          id,
          name,
          price,
          image,
          created_at
        )
      )
    `,
    )
    .eq("clerk_user_id", userId)
    .single();

  if (error || !cart) return error;

  return cart;
}

// add to cart
export async function addItemToCart(productId: string, quantity: number = 1) {
  const { userId } = await auth();
  console.log("userId", userId);

  if (!userId) throw new Error("Unauthorized");

  // 1️⃣ get or create cart
  let { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (!cart) {
    const { data: newCart } = await supabase
      .from("carts")
      .insert({ clerk_user_id: userId })
      .select()
      .single();

    cart = newCart!;
  }

  // 2️⃣ check existing item
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cart?.id)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    await supabase
      .from("cart_items")
      .update({
        quantity: existingItem.quantity + quantity,
      })
      .eq("id", existingItem.id);
  } else {
    await supabase.from("cart_items").insert({
      cart_id: cart?.id,
      product_id: productId,
      quantity,
    });
  }

  return { success: true };
}

export async function removeFromCart(itemId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (!cart) return;

  await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId)
    .eq("cart_id", cart.id);
}

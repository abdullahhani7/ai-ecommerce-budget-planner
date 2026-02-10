"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import supabase from "../supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover", // Latest API version
});

export async function createCheckoutSession() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1️⃣ get cart with items + products
  const { data: cart, error } = await supabase
    .from("carts")
    .select(
      `
      id,
      cart_items (
        id,
        quantity,
        products (
          id,
          name,
          price,
          image
        )
      )
    `,
    )
    .eq("clerk_user_id", userId)
    .single();

  if (error || !cart || cart.cart_items.length === 0) {
    throw new Error("Cart is empty");
  }

  // 2️⃣ build stripe line items
  const lineItems = cart.cart_items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.products.name,
        images: [item.products.image],
      },
      unit_amount: Math.round(Number(item.products.price) * 100), // Stripe expects cents
    },
    quantity: item.quantity,
    // 10.50 دولار.
    // 1050
  }));

  // 3️⃣ create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
    metadata: {
      userId,
      cartId: cart.id,
    },
  });

  return { url: session.url };
}

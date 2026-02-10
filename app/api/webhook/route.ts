import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import supabase from "@/app/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});



export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log(`[Webhook] Event type: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;
    const cartId = session.metadata?.cartId;
    console.log("cartId", cartId);

    if (!userId || !cartId) {
      console.error("[Webhook] Missing metadata");
      return new NextResponse("Missing metadata", { status: 400 });
    }

    try {
      // 1️⃣ check if order already exists (idempotency)
      const { data: existingOrder } = await supabase
        .from("orders")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

      if (existingOrder) {
        console.log("[Webhook] Order already exists, skipping creation");

        // ensure cart is cleared
        await supabase.from("cart_items").delete().eq("cart_id", cartId);
        return new NextResponse(null, { status: 200 });
      }

      // 2️⃣ get cart with items + products
      const { data: cart, error: cartError } = await supabase
        .from("carts")
        .select(
          `
          id,
          cart_items (
            id,
            quantity,
            products (
              id,
              price
            )
          )
        `,
        )
        .eq("id", cartId)
        .single();

      if (cartError || !cart) {
        console.error("[Webhook] Cart not found", cartError);
        return new NextResponse("Cart not found", { status: 404 });
      }

      // 3️⃣ create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          clerk_user_id: userId,
          total_amount: Number(session.amount_total) / 100,
          stripe_session_id: session.id,
          status: "PROCESSING",
        })
        .select()
        .single();

      if (orderError || !order) {
        throw orderError;
      }

      console.log(`[Webhook] Order created: ${order.id}`);

      // 4️⃣ create order items
      await supabase.from("order_items").insert(
        cart.cart_items.map((item: any) => ({
          order_id: order.id,
          product_id: item.products.id,
          quantity: item.quantity,
          price: item.products.price,
        })),
      );

      // 5️⃣ clear cart
      await supabase.from("cart_items").delete().eq("cart_id", cart.id);

      console.log("[Webhook] Cart cleared");
    } catch (error: any) {
      console.error("Error processing webhook:", error);
      return new NextResponse(`Internal Server Error: ${error.message}`, {
        status: 500,
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}

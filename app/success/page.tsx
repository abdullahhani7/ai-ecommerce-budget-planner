import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Stripe from "stripe";
import supabase from "../supabase";

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-red-500">Invalid Session</p>
        <Button className="mt-4">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-12-15.clover",
    });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const cartId = session.metadata?.cartId;
      const userId = session.metadata?.userId;

      if (cartId && userId) {
        // 1️⃣ check if order already exists (idempotency)
        const { data: existingOrder } = await supabase
          .from("orders")
          .select("id")
          .eq("stripe_session_id", session.id)
          .single();

        if (!existingOrder) {
          // 2️⃣ get cart with items + products
          const { data: cart } = await supabase
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

          if (cart && cart.cart_items.length > 0) {
            // 3️⃣ create order
            const { data: order } = await supabase
              .from("orders")
              .insert({
                clerk_user_id: userId,
                total_amount: Number(session.amount_total) / 100,
                stripe_session_id: session.id,
                status: "PROCESSING",
              })
              .select()
              .single();

            if (order) {
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
            }
          }
        } else {
          // order exists → ensure cart is cleared
          await supabase.from("cart_items").delete().eq("cart_id", cartId);
        }
      }
    }
  } catch (error) {
    console.error("Error verifying payment in success page:", error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-green-100 p-6 rounded-full mb-6 dark:bg-green-900/30">
        <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Thank you for your purchase. Your order has been processed successfully.
        <span className="block mt-2 text-sm text-gray-400">
          Transaction ID: {session_id}
        </span>
      </p>
      <div className="flex gap-4">
        <Button>
          <Link href="/">Return to Home</Link>
        </Button>
        <Button variant="outline">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}

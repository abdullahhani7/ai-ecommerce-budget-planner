import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { addAllToCart } from "../_utils/Cart";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";

function AddToCartSection({ plan }: { plan: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddAll = async () => {
    setLoading(true);

    try {
      const itemsToAdd = plan.matchedProducts.map((p: any) => ({
        productId: p.id,
        quantity: 1, // Default to 1 for now, AI could specify quantity later
      }));

      await addAllToCart(itemsToAdd);
      toast.success("All items added to cart!");
      router.refresh(); // Refresh to update cart count in navbar
    } catch (error) {
      console.error(error);
      toast.error("Failed to add items to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-emerald-100 h-fit">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-emerald-800">
          <span>AI Cart</span>
          <span className="text-lg font-mono">
            ${plan.totalCost.toFixed(2)}
            <span className="text-xs text-muted-foreground ml-2">(Est.)</span>
          </span>
        </CardTitle>
        <CardDescription>
          Matched {plan.matchedProducts.length} items from our store.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {plan.matchedProducts.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No matching products found in stock.
          </p>
        ) : (
          <ul className="space-y-3">
            {plan.matchedProducts.map((p: any) => (
              <li key={p.id} className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded bg-gray-100 shrink-0">
                  <Image
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-0">
        <div className="flex justify-between w-full text-sm">
          <span>Remaining Budget:</span>
          <span
            className={
              plan.remainingBudget >= 0 ? "text-emerald-600" : "text-red-500"
            }
          >
            ${plan.remainingBudget.toFixed(2)}
          </span>
        </div>
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4"
          onClick={handleAddAll}
          disabled={loading || plan.matchedProducts.length === 0}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          Add All to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddToCartSection;

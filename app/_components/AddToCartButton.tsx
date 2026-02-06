"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Check, Loader2, ShoppingCart } from "lucide-react";
import { addItemToCart } from "../_utils/Cart";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productId: string;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AddToCartButton({
  productId,
  variant = "default",
  size = "default",
  className,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      try {
        await addItemToCart(productId);
        setSuccess(true);
        toast.success("Item added to cart");
        setTimeout(() => setSuccess(false), 2000);
        router.refresh(); // Update cart count in navbar potentially
      } catch (error) {
        console.error("Failed to add to cart", error);
        toast.error("Failed to add to cart");
      }
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAdd}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : success ? (
        <Check className="h-4 w-4" />
      ) : (
        <>
          {size !== "icon" && <ShoppingCart className="mr-2 h-4 w-4" />}
          {size !== "icon" ? (
            "Add to Cart"
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
        </>
      )}
    </Button>
  );
}

export default AddToCartButton;

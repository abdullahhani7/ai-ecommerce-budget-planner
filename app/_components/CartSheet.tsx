import React, { useEffect, useState, useTransition } from "react";

import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { getCart, removeFromCart } from "../_utils/Cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CartWithItems = any;

function CartSheet({ initialCart }: { initialCart?: any }) {
  const [cart, setCart] = useState<CartWithItems | null>(initialCart || null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    if (initialCart) {
      setCart(initialCart);
    }
  }, [initialCart]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const calculateTotal = () => {
    if (!cart?.cart_items) return 0;
    return cart.cart_items.reduce((total: number, item: any) => {
      return total + Number(item.products.price) * item.quantity;
    }, 0);
  };

  const itemCount =
    cart?.cart_items?.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0,
    ) || 0;

  const handleRemove = async (id: string) => {
    await removeFromCart(id);
    loadCart(); // Reload after delete
  };

  const handleCheckout = async () => {
      if (!cart) return;
      startTransition(async () => {
          try {
              const result = await createCheckoutSession();
              if (result?.url) {
                  router.push(result.url);
              }
          } catch (e) {
              console.error("Checkout failed", e);
          }
      });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        {/* <Button variant="ghost" size="icon" className="relative"> */}
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
            {itemCount}
          </span>
        )}
        {/* </Button> */}
      </SheetTrigger>

      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Your cart is empty."
              : `You have ${itemCount} items.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-emerald-600" />
            </div>
          ) : !cart || cart?.cart_items?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Start adding fresh products!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart?.cart_items &&
                cart.cart_items.map((item: any) => (
                  <li key={item.id} className="flex gap-4 items-center">
                    <div className="relative  h-16 w-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item?.products?.image}
                        alt={item?.products?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">
                        {item.products.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item?.quantity} x $
                        {Number(item?.products?.price).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {cart.cart_items && cart.cart_items.length > 0 && (
          <SheetFooter className="border-t pt-6 sm:justify-center">
            <div className="w-full space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg"
                onClick={handleCheckout}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Checkout"}
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;

import React from "react";
import { getUserOrders } from "../_utils/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function OrdersPage() {
  const { success, data: orders, error } = await getUserOrders();
  console.log("orders", orders);

  if (!success || !orders) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Error fetching orders</h1>
        <p className="text-red-500">{error || "Something went wrong"}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center space-y-4">
        <div className="flex justify-center">
          <ShoppingBag size={64} className="text-muted-foreground opacity-50" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">No orders found</h1>
        <p className="text-muted-foreground">
          Looks like you haven't placed any orders yet.
        </p>
        <Link href="/products">
          <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-emerald-900 flex items-center gap-3">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Package className="h-6 w-6 text-emerald-700" />
        </div>
        Your Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <Card
            key={order.id}
            className="overflow-hidden border-emerald-100/50 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardHeader className="bg-emerald-50/40 border-b border-emerald-100/50 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base font-bold text-emerald-900">
                      Order #{String(order.id).slice(-8).toUpperCase()}
                    </CardTitle>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold text-emerald-700">
                    $
                    {order.order_items
                      .reduce(
                        (sum: number, item: any) =>
                          sum + item.quantity * Number(item.product.price),
                        0,
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="divide-y divide-gray-100">
                {order.order_items.map((item: any) => (
                  <li key={item.id} className="flex items-center gap-4 py-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white shadow-sm">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-50">
                          <Package size={24} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-medium text-gray-900 truncate"
                        title={item.product.name}
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {item.quantity} × $
                        {Number(item.product.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right font-medium text-gray-900">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

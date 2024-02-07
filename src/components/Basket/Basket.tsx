"use client";

import { useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { deleteProductFromCart, getCartsWithProductPrice } from "@/lib";
import { useUser } from "@/hooks/useUser";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { decrementProductFromCart, addProductToCart } from "@/lib";
import { toast } from "../ui/use-toast";

const nunito = Nunito({ weight: ["500"], subsets: ["latin"] });

export const Basket = () => {
  const user = useUser();
  const selectedProducts = useLiveQuery(
    () => getCartsWithProductPrice(user.id),
    []
  );

  const allItems = selectedProducts?.reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );

  const cartText =
    selectedProducts && selectedProducts.length > 0
      ? selectedProducts.length === 1
        ? "You have 1 item in your cart"
        : `You have ${allItems} items in your cart`
      : "Your shopping cart is empty";

  const handleAddProduct = useCallback(
    async ({
      product_id,
      user_id,
    }: {
      product_id: number;
      user_id: number;
    }) => {
      await addProductToCart({ product_id, user_id, quantity: 1 });
    },
    []
  );

  const handleDecrementCartItem = useCallback(
    async ({ cart_id }: { cart_id: number }) => {
      await decrementProductFromCart(cart_id);
    },
    []
  );

  const handleDeleteCartItem = useCallback(
    async ({ cart_id }: { cart_id: number }) => {
      deleteProductFromCart(cart_id).then(() => {
        toast({
          title: "Item deleted",
          description: "The item was successfully deleted from your cart",
          duration: 3000,
        });
      });
    },
    []
  );

  return (
    <div className="border-t-[1.5px] border-[#D0CFCF] mt-6 py-6">
      <h2 className="text-lg text-primary-black font-medium">Shopping cart</h2>
      <p className={cn("font-medium text-sm -mt-1", nunito.className)}>
        {cartText}
      </p>
      <div className="flex flex-col gap-6 mt-7">
        {selectedProducts &&
          selectedProducts.length > 0 &&
          selectedProducts.map(({ id, quantity, product }) => (
            <Card key={id} className="shadow-md rounded-2xl">
              <CardContent className="flex flex-col md:flex-row md:items-center p-2.5 pr-6">
                <div className="shrink-0 relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/${product?.image}`}
                    fill
                    alt={product?.name || ""}
                  />
                </div>
                <p className="flex flex-col md:ml-[18px]">
                  <span className="font-medium text-lg">{product?.name}</span>
                  <span className="text-sm">{product?.description}</span>
                </p>
                <p className="flex items-center gap-2 md:justify-end grow md:mx-11 text-right">
                  <span>{quantity}</span>
                  <span className="flex flex-col">
                    <Button
                      className="p-0 h-auto hover:bg-transparent hover:text-primary-green"
                      variant={"ghost"}
                      onClick={() =>
                        product?.id &&
                        handleAddProduct({
                          product_id: product.id,
                          user_id: user.id,
                        })
                      }
                    >
                      <ChevronUp />
                    </Button>
                    <Button
                      className="p-0 h-auto hover:bg-transparent hover:text-primary-green"
                      variant={"ghost"}
                      onClick={() =>
                        id && handleDecrementCartItem({ cart_id: id })
                      }
                    >
                      <ChevronDown />
                    </Button>
                  </span>
                </p>
                <span className="md:mr-10 min-w-16 md:text-right">
                  ${product?.price ? product.price * quantity : 0}
                </span>
                <Button
                  className="self-start md:self-center p-0 hover:bg-transparent hover:text-red-500"
                  variant={"ghost"}
                  onClick={() => id && handleDeleteCartItem({ cart_id: id })}
                >
                  <Trash />
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

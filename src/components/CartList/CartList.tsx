import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import {
  decrementProductFromCart,
  addProductToCart,
  ICartWithProductPrice,
} from "@/lib";
import { toast } from "../ui/use-toast";
import { useCallback } from "react";
import { deleteProductFromCart } from "@/lib";
import { cn } from "@/lib/utils";

interface CartListProps {
  products: ICartWithProductPrice[];
  userId: number;
  className?: string;
}

export const CartList = ({ products, userId, className }: CartListProps) => {
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
    <div className={cn("flex flex-col gap-6 mt-7", className)}>
      {products.map(({ id, quantity, product }) => (
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
              <span className="text-xl">{quantity}</span>
              <span className="flex flex-col">
                <Button
                  className="p-0 h-auto hover:bg-transparent hover:text-primary-green"
                  variant={"ghost"}
                  onClick={() =>
                    product?.id &&
                    handleAddProduct({
                      product_id: product.id,
                      user_id: userId,
                    })
                  }
                >
                  <ChevronUp />
                </Button>
                <Button
                  className="p-0 h-auto hover:bg-transparent hover:text-primary-green"
                  variant={"ghost"}
                  onClick={() => id && handleDecrementCartItem({ cart_id: id })}
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
  );
};

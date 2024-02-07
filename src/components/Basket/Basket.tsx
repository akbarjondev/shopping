"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { getCartsWithProductPrice } from "@/lib";
import { useUser } from "@/hooks/useUser";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { CartList } from "../CartList/CartList";
import { CardDetails } from "../CardDetails/CardDetails";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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
      ? allItems === 1
        ? "You have 1 item in your cart"
        : `You have ${allItems} items in your cart`
      : "Your shopping cart is empty";

  return (
    <div className="flex gap-6 md:gap-14">
      <div>
        <Link
          href={"/"}
          className="-ml-3 flex items-center font-semibold text-lg capitalize"
        >
          <ChevronLeft /> Continue shopping
        </Link>
        <h2 className="border-t-[1.5px] border-[#D0CFCF] mt-6 pt-6 text-lg text-primary-black font-medium">
          Shopping cart
        </h2>
        <p className={cn("font-medium text-sm -mt-1", nunito.className)}>
          {cartText}
        </p>
        {selectedProducts && selectedProducts.length > 0 && (
          <CartList
            className={"pb-6"}
            products={selectedProducts}
            userId={user.id}
          />
        )}
      </div>
      {selectedProducts && selectedProducts.length > 0 && (
        <CardDetails
          className="max-w-[388px] grow w-full"
          selectedProducts={selectedProducts}
          user={user}
        />
      )}
    </div>
  );
};

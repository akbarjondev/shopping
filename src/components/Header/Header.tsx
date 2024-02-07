"use client";

import { ShoppingBag, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { User } from "../User/User";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

export const Header = () => {
  const cart = useLiveQuery(() => db.cart.toArray(), []);

  let productsInCart = 0;
  if (cart && cart.length > 0) {
    productsInCart = cart.reduce((acc, cart) => acc + cart.quantity, 0);
  }

  return (
    <header className="left-0 fixed w-full top-0 bg-primary-main text-white py-4">
      <nav className="container flex justify-between items-center gap-4">
        <div className="flex items-center gap-5">
          <Link className="link" href={"/"}>
            <ShoppingBag /> Shopping
          </Link>
          <Link className="link" href={"/cart"}>
            <ShoppingBasket /> Cart{" "}
            {productsInCart > 0 && `(${productsInCart})`}
          </Link>
        </div>

        <User />
      </nav>
    </header>
  );
};

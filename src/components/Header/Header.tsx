import { ShoppingBag, ShoppingBasket } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="left-0 fixed w-full top-0 bg-primary-main text-white py-4">
      <nav className="container flex items-center justify-between">
        <Link className="link" href={"/"}>
          <ShoppingBag /> Shopping
        </Link>
        <Link className="link" href={"/cart"}>
          <ShoppingBasket /> Cart
        </Link>
      </nav>
    </header>
  );
};

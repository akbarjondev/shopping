import { ShoppingBag, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { User } from "../User/User";

export const Header = () => {
  return (
    <header className="left-0 fixed w-full top-0 bg-primary-main text-white py-4">
      <nav className="container flex justify-between items-center gap-4">
        <div className="flex items-center gap-5">
          <Link className="link" href={"/"}>
            <ShoppingBag /> Shopping
          </Link>
          <Link className="link" href={"/cart"}>
            <ShoppingBasket /> Cart
          </Link>
        </div>

        <User />
      </nav>
    </header>
  );
};

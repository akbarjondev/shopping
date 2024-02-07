import { Basket } from "@/components/Basket/Basket";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="container pt-12">
      <Link
        href={"/"}
        className="-ml-3 flex items-center font-semibold text-lg capitalize"
      >
        <ChevronLeft /> Continue shopping
      </Link>
      <Basket />
    </main>
  );
};

export default Page;

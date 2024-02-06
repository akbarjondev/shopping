import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="container pt-12">
      <Link
        href={"/"}
        className="flex items-center font-semibold text-lg capitalize"
      >
        <ChevronLeft /> Continue shopping
      </Link>
    </main>
  );
};

export default Page;

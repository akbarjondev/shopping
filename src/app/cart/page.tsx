import Link from "next/link";

const Page = () => {
  return (
    <main className="container pt-12">
      <Link href={"/"} className="font-semibold text-xl capitalize">
        Continue shopping
      </Link>
    </main>
  );
};

export default Page;

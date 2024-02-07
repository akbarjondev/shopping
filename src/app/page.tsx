import { ProductList } from "@/components/ProductList/ProductList";

export default function Home() {
  return (
    <main className="container pt-12">
      <h1 className="text-2xl mb-6">Pizza Hunt</h1>
      <ProductList />
    </main>
  );
}

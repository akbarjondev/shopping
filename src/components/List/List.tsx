"use client";

import { IProduct } from "@/db";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { addProductToCart, fetchProducts } from "@/lib";
import { useToast } from "../ui/use-toast";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export const List = () => {
  const user = useUser();
  const { toast } = useToast();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div className="grid justify-items-center gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <Card className="max-w-[350px] flex flex-col" key={product.id}>
            <CardHeader className="flex flex-col-reverse">
              <CardTitle className="mt-3 text-md">{product.name}</CardTitle>
              <Image
                src={`/images/${product.image}`}
                alt={product.name}
                width={300}
                height={300}
                className=""
              />
            </CardHeader>
            <CardContent className="grow flex flex-col text-sm">
              <p>{product.description}</p>
              <p>{product.price}</p>
              <Button
                className="self-end mt-auto"
                onClick={async () => {
                  if (product.id && user.id) {
                    addProductToCart({
                      product_id: product.id,
                      quantity: 1,
                      user_id: user.id,
                    }).then(() => {
                      toast({
                        title: "Added to cart",
                        description: `${product.name} was added to cart`,
                        action: (
                          <Button className="p-0" variant={"outline"}>
                            <Link className="px-4 py-2" href="/cart">
                              View cart
                            </Link>
                          </Button>
                        ),
                        duration: 3000,
                      });
                    });
                  }
                }}
              >
                Add to cart
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

import { db } from "@/db";
import { PRODUCTS } from "./constants";

const seedProducts = async () => {
  // add products if they don't exist
  if (await db.products.count()) return;

  const addProducts = PRODUCTS.map(async (product) => {
    await db.products.add(product);
  });
  await Promise.all(addProducts);
};

const seedShoppingConfig = async () => {
  // add shopping config if it doesn't exist
  if (await db.shopping_config.count()) return;

  await db.shopping_config.add({ tax: 0.2, shipping: 10 });
};

export const seedDatabase = async () => {
  await seedProducts();
  await seedShoppingConfig();
};

import { ICart, db } from "@/db";

export const fetchProducts = async () => {
  return await db.products.toArray();
};

export const addProductToCart = async ({
  product_id,
  quantity,
  user_id,
  closed = 0,
}: ICart) => {
  // check if the product is already in the cart. Check by user_id and product_id and if the cart is not closed
  const cartItem = await db.cart.get({ product_id, user_id, closed: 0 });

  if (cartItem && cartItem.id) {
    // if it is, update the quantity
    return await db.cart.update(cartItem.id, {
      quantity: cartItem.quantity + quantity,
    });
  }

  // if it's not, add the product to the cart
  return await db.cart.add({ product_id, quantity, user_id, closed });
};

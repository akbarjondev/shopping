import { ICart, ICheckout, IOrders, IProduct, db } from "@/db";

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

export const decrementProductFromCart = async (cart_id: number) => {
  const cartItem = await db.cart.get(cart_id);

  if (cartItem && cartItem.quantity > 1) {
    return await db.cart.update(cart_id, {
      quantity: cartItem.quantity - 1,
    });
  }
};

export const deleteProductFromCart = async (id: number) => {
  return await db.cart.delete(id);
};

export interface ICartWithProductPrice extends ICart {
  product?: IProduct;
}

export const getCartsWithProductPrice = async (
  user_id: number
): Promise<ICartWithProductPrice[]> => {
  const carts = await db.cart.where({ user_id, closed: 0 }).toArray();
  const products = await db.products.bulkGet(
    carts.map((cart) => cart.product_id)
  );

  return carts.map((cart) => ({
    ...cart,
    product: products.find((product) => product?.id === cart.product_id),
  }));
};

// close cart
export const closeCart = async (cart_id: number) => {
  try {
    await db.cart.update(cart_id, { closed: 1 });

    return {
      cart_id,
      error: null,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

// create checkout
export const createCheckout = async ({
  user_id,
  total,
}: Omit<ICheckout, "date">) => {
  try {
    const id = await db.checkout.add({ user_id, total, date: new Date() });

    return {
      checkout_id: id,
      error: null,
    };
  } catch (error) {
    return {
      checkout_id: null,
      error,
    };
  }
};

// create order
export const createOrder = async ({ cart_id, checkout_id }: IOrders) => {
  return await db.orders.add({ cart_id, checkout_id });
};

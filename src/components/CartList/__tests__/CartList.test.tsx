import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartList } from "../CartList";
import { ICartWithProductPrice } from "@/lib";

const products: ICartWithProductPrice[] = [
  {
    id: 1,
    quantity: 1,
    product_id: 1,
    user_id: 1,
    product: {
      id: 1,
      name: "Test Product",
      description: "Test Description",
      image: "test.png",
      price: 100,
    },
  },
];

describe("CartList", () => {
  render(<CartList products={products} userId={1} />);

  it("should render", () => {
    expect(screen.getByTestId("carts")).toBeDefined();
  });

  it("should render the product name", () => {
    expect(screen.getByText("Test Product"));
  });

  it("should render the product description", () => {
    expect(screen.getByText(/desc/i));
  });

  it("should render the product price", () => {
    expect(screen.getByText("$100"));
  });

  it("should render buttons", () => {
    expect(screen.findByRole("button")).toBeDefined();
    expect(screen.getAllByRole("button").length).toBe(3);
  });
});

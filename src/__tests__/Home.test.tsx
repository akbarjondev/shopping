import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  render(<Home />);

  it("should render main container with 2 childs", () => {
    expect(screen.getByRole("main")).toBeDefined();
    expect(screen.getByRole("main").children.length).toBe(2);
  });

  it("should render a heading", () => {
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Pizza Hunt",
      })
    ).toBeDefined();
  });

  it("should render List component", () => {
    expect(screen.getByTestId("cards")).toBeDefined();
    expect(screen.getByTestId("cards").children.length).toBe(1);
  });

  it("should render a loading message", () => {
    expect(screen.getByText("1Loading...")).toBeDefined();
  });
});

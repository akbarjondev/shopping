import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header component", () => {
  render(<Header />);

  it("should render", () => {
    expect(screen.getByRole("banner")).toBeDefined();
  });

  it("should render 2 links", () => {
    expect(screen.getByRole("navigation")).toBeDefined();
    expect(screen.getAllByRole("link").length).toBe(2);
  });

  it("should render user image", () => {
    expect(screen.getByRole("img")).toBeDefined();
  });
});

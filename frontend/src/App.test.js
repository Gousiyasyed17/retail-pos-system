import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login page", () => {
  render(<App />);
  const textElement = screen.getByText(/Retail POS & Inventory System/i);
  expect(textElement).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders product management heading", () => {
  render(<App />);
  const textElement = screen.getByText(/Product Management/i);
  expect(textElement).toBeInTheDocument();
});

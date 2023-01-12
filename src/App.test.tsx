import { render, screen } from "@testing-library/react";
import App from "./App";

test("it should have the correct title", () => {
  render(<App />);
  const title = screen.getByText("Todo List");
  expect(title).toBeInTheDocument();
});

test("it should match snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

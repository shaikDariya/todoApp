import { render, screen } from "@testing-library/react";
import { TodoStateContext } from "@/context/todo";
import { TodoState } from "@/types/todo";

import TodoList from ".";

const renderTodoList = (state: TodoState) =>
  render(
    <TodoStateContext.Provider value={state}>
      <TodoList />
    </TodoStateContext.Provider>
  );

test("it should show loading skelton.", () => {
  const { container } = renderTodoList({ isLoading: true, todos: [] });
  expect(container.getElementsByClassName("MuiSkeleton-root").length).toBe(3);
});

test("it should show todo list items.", () => {
  renderTodoList({
    isLoading: false,
    todos: [
      {
        id: 1,
        description: "Todo 1",
        complete: false,
      },
    ],
  });
  const text = screen.getByText("Todo 1");
  expect(text).toBeInTheDocument();
});

test("it should checked the completed todo.", () => {
  const { container } = renderTodoList({
    isLoading: false,
    todos: [
      {
        id: 1,
        description: "Todo 1",
        complete: true,
      },
    ],
  });
  expect(container.getElementsByClassName("MuiCheckbox-root Mui-checked").length).toBe(1);
});

test("item list should show have delete icon.", () => {
  const { getByTestId } = renderTodoList({
    isLoading: false,
    todos: [
      {
        id: 1,
        description: "Todo 1",
        complete: true,
      },
    ],
  });
  expect(getByTestId("DeleteIcon")).toBeInTheDocument();
});

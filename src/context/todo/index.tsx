import React, { createContext, useContext, useMemo, useReducer } from "react";
import { Todo, TodoAction, TodoState } from "@/types/todo";

import { addTodo, fetchTodos, updateTodo, deleteTodo } from "./actions";
import todoReducer, { initalState } from "./reducer";

type TodoProviderType = {
  children: React.ReactElement;
};

/**
 * Todo State Context Provider.
 */
export const TodoStateContext = createContext<TodoState>(initalState);

/**
 * Todo Dispatch Context Provider.
 */
export const TodoDispatchContext = createContext({} as React.Dispatch<TodoAction>);

/**
 * TodoProvider Wrapper for useContext of state & dispatch actions.
 * @param children Todo Root Componet.
 *
 */

const TodoProvider = ({ children }: TodoProviderType) => {
  const [state, dispatch] = useReducer(todoReducer, initalState);
  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={state}>
        {/* This children can able to access both providers inside it. */}
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
};

/**
 * useTodos as hook in componets to get the access the state of Todo
 * @returns Todo State.
 */
const useTodos = () => useContext(TodoStateContext);

/**
 * useTodoDispatch returns all available dispatch actions.
 * @returns
 */
const useTodoDispatch = () => {
  const dispatch = useContext(TodoDispatchContext);
  const memoizedDispatch = useMemo(() => {
    return {
      fetchTodos: () => fetchTodos()(dispatch),
      addTodo: (a: Omit<Todo, "id">, sucessCallback: () => void) => addTodo(a, sucessCallback)(dispatch),
      updateTodo: (item: Todo) => updateTodo(item)(dispatch),
      deleteTodo: (id: number) => deleteTodo(id)(dispatch),
    };
  }, [dispatch]);
  return memoizedDispatch;
};

export { TodoProvider, useTodos, useTodoDispatch };

import produce from "immer";
import { ActionTypes, Todo } from "@/types/todo";

export const initalState = {
  todos: [],
  isLoading: false,
};

const sortTodo = (arr: Todo[]) => {
  arr.sort((a, b) => {
    if (a.complete === b.complete) {
      return a.id > b.id ? -1 : 1;
    }
    if (a.complete > b.complete) {
      return 1;
    }
    return -1;
  });
  return arr;
};

const todoReducer = produce((draft, action) => {
  switch (action.type) {
    case ActionTypes.ISLOADING:
      draft.isLoading = !draft.isLoading;
      break;
    case ActionTypes.LIST:
      draft.todos = sortTodo(action.payload.slice());
      draft.isLoading = false;
      break;
    case ActionTypes.UPDATE:
      draft.todos.forEach((item: Todo) => {
        if (item.id === action.payload.id) {
          item.complete = action.payload.complete;
        }
      });
      draft.todos = sortTodo(draft.todos.slice());
      break;
    case ActionTypes.DELETE:
      draft.todos = sortTodo(draft.todos.filter(({ id }: Todo) => id !== action.payload));
      break;
    default:
      return draft;
  }
});

export default todoReducer;

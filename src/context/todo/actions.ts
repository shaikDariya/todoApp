import { Dispatch } from "react";
import { toast } from "react-toastify";
import { ActionTypes, Todo, TodoAction, TodoDeleteAction, TodoListAction, TodoLoadingAction, TodoUpdateAction } from "@/types/todo";
import { addTodoApi, listTodo, removeTodoById, updateTodoApi } from "@/services/todo";

const setLoading = (isLoading = false): TodoLoadingAction => ({
  type: ActionTypes.ISLOADING,
  payload: isLoading,
});

export const fetchTodos = () => async (dispatch: Dispatch<TodoListAction | TodoLoadingAction>) => {
  dispatch(setLoading(true));
  try {
    const { tasks } = await listTodo();
    dispatch({
      type: ActionTypes.LIST,
      payload: tasks,
    });
  } catch {
    dispatch(setLoading(false));
    toast.error("Cannot Fetch Todos!");
  }
};

export const addTodo = (item: Omit<Todo, "id">, sucessCallback: () => void) => async (dispatch: Dispatch<TodoAction>) => {
  dispatch(setLoading(true));
  try {
    await addTodoApi(item);
    sucessCallback();
    fetchTodos()(dispatch);
    toast.success("Todo item Added Successfully!", {
      toastId: "addTodo",
    });
  } catch {
    dispatch(setLoading(false));
    toast.error("Cannot Add Todo item!", {
      toastId: "addTodoErr",
    });
  }
};

export const updateTodo = (item: Todo) => async (dispatch: Dispatch<TodoUpdateAction>) => {
  try {
    await updateTodoApi(item);
    dispatch({
      type: ActionTypes.UPDATE,
      payload: item,
    });
    toast.success("Todo Item updated sucessfully!", {
      toastId: "updateTodo",
    });
  } catch {
    toast.error("Cannot update Todo item!", {
      toastId: "updateTodoErr",
    });
  }
};

export const deleteTodo = (id: number) => async (dispatch: Dispatch<TodoDeleteAction>) => {
  try {
    await removeTodoById(id);
    dispatch({
      type: ActionTypes.DELETE,
      payload: id,
    });
    toast.success("Todo item Deleted Successfully!", {
      toastId: "deleteTodo",
    });
  } catch {
    toast.error("Cannot Delete Todo item!", {
      toastId: "deleteTodoErr",
    });
  }
};

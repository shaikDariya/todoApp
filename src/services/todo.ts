import { AddTodoType, Todo } from "../types/todo";
import axios from ".";
import urls from "../config/urls";

export const listTodo = async (): Promise<{ tasks: Todo[] }> => {
  const response = await axios.get(urls.todo.list);
  return response.data;
};

export const addTodoApi = async (task: AddTodoType): Promise<string> => {
  const response = await axios.post(urls.todo.create, { task });
  return response.data;
};

export const updateTodoApi = async (task: Todo): Promise<string> => {
  const response = await axios.put(urls.todo.update(task.id), { task });
  return response.data;
};

export const removeTodoById = async (id: number): Promise<string> => {
  const response = await axios.delete(urls.todo.delete(id));
  return response.data;
};

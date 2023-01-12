export type Todo = {
  id: number;
  description: string;
  complete: boolean;
};

export type AddTodoType = Omit<Todo, "id">;

export type TodoState = {
  isLoading: boolean;
  todos: Todo[];
};

export enum ActionTypes {
  ISLOADING = "ISLOADING",
  LIST = "LIST",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type TodoListAction = {
  type: ActionTypes.LIST;
  payload: Todo[];
};

export type TodoCreateAction = {
  type: ActionTypes.CREATE;
  payload: Todo[];
};

export type TodoUpdateAction = {
  type: ActionTypes.UPDATE;
  payload: Todo;
};

export type TodoDeleteAction = {
  type: ActionTypes.DELETE;
  payload: number;
};

export type TodoLoadingAction = {
  type: ActionTypes.ISLOADING;
  payload?: boolean;
};

export type TodoAction = TodoListAction | TodoCreateAction | TodoUpdateAction | TodoDeleteAction | TodoLoadingAction;

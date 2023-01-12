import { useEffect } from "react";
import { Typography, Grid } from "@mui/material";

import { useTodoDispatch } from "@/context/todo";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

const Todo = () => {
  const { fetchTodos } = useTodoDispatch();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <Grid sx={{ my: 1 }} container direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h4" sx={{ mb: 1 }}>
        Todo List
      </Typography>
      <AddTodo />
      <TodoList />
    </Grid>
  );
};

export default Todo;

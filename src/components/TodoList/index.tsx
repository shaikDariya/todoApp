import React from "react";
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, Skeleton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VirtualList from "rc-virtual-list";

import { useTodoDispatch, useTodos } from "@/context/todo";

const TodoList = () => {
  const { todos, isLoading } = useTodos();
  const { updateTodo, deleteTodo } = useTodoDispatch();
  const height = Math.abs(window.innerHeight - 120);

  if (isLoading) {
    return (
      <Grid container direction="column" sx={{ mt: 4 }}>
        <Skeleton variant="rounded" sx={{ mb: 2, height: 50 }} />
        <Skeleton variant="rounded" sx={{ mb: 2, height: 50 }} />
        <Skeleton variant="rounded" sx={{ mb: 2, height: 50 }} />
      </Grid>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    const type = (e.target as HTMLElement)?.getAttribute("data-action-type");
    const value = +((e.target as HTMLElement)?.getAttribute("data-action-value") || "");
    switch (type) {
      case "status":
        const item = todos.find((i) => i.id === value);
        item && updateTodo({ ...item, complete: !item.complete });
        break;
      case "delete":
        deleteTodo(value);
        break;
      default:
    }
  };

  return (
    <VirtualList style={{ width: "100%" }} data={todos} height={height} itemKey="id" itemHeight={50} onClick={handleClick}>
      {(task) => (
        <ListItem
          sx={{ my: 1, borderRadius: 4, bgcolor: "background.paper" }}
          secondaryAction={
            <IconButton edge="end" data-action-type="delete" data-action-value={task.id}>
              <DeleteIcon style={{ pointerEvents: "none" }} />
            </IconButton>
          }
        >
          <ListItemIcon sx={{ cursor: "pointer" }} data-action-type="status" data-action-value={task.id}>
            <Checkbox checked={task.complete} style={{ pointerEvents: "none" }} />
          </ListItemIcon>
          <ListItemText primary={task.description} sx={{ textDecoration: task.complete ? "line-through" : "" }} />
        </ListItem>
      )}
    </VirtualList>
  );
};

export default TodoList;

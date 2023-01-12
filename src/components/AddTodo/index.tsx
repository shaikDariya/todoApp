import { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import { TextField, Grid, Button } from "@mui/material";

import { useTodoDispatch, useTodos } from "@/context/todo";

const AddTodo = () => {
  const [text, setText] = useState<string>("");
  const { isLoading } = useTodos();
  const { addTodo } = useTodoDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target?.value);
  };

  const hanldeSave = () => {
    addTodo(
      {
        description: text,
        complete: false,
      },
      // Clear Text After Todo is Saved Sucessfully.
      () => setText("")
    );
  };

  return (
    <Grid container direction="row" wrap="nowrap" alignItems="center" columnSpacing={2} sx={{ mb: 2 }}>
      <Grid item container>
        <TextField
          sx={{ width: "100%", bgcolor: "background.paper" }}
          label="Add New Todo"
          variant="outlined"
          value={text}
          onChange={handleTextChange}
        />
      </Grid>
      <Grid item xs="auto">
        <Button variant="contained" color="success" startIcon={<AddCircle />} disabled={!text || isLoading} onClick={hanldeSave}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodo;

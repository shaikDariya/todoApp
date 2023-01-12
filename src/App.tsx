import { ToastContainer } from "react-toastify";
import { CssBaseline, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Todo from "@/pages/Todo";
import { TodoProvider } from "@/context/todo";

import "react-toastify/dist/ReactToastify.css";
import "./app.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#e8eaed",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ bgcolor: "secondary.main" }}>
        <TodoProvider>
          <Todo />
        </TodoProvider>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;

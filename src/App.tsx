import { useState, FC, ChangeEvent, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { ITodo } from "./interfaces";

const App: FC = () => {

  const [todo, setTodo] = useState<string>(""); // new todo
  const [todos, setTodos] = useState<ITodo[]>([]); // list of todos
  const [error, setError] = useState<string>(""); // error message

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // when a key is pressed in the new todo input
    if (event.target.name === "todo") {
      setTodo(event.target.value); // send value to todo
    }
  };

  const addTodo = (): void => {
    // after add button is clicked
    setError(""); // clear errors
    if (todo) { // if there's a todo, proceed
      const newTodo = {
        todoName: todo,
      };
      setTodos([...todos, newTodo]); // add new todo to the end of the todo list
      let toStorage = JSON.stringify([...todos, newTodo]); // set up same data for local storage
      localStorage.setItem("todos", toStorage); // add to storage
      setTodo(""); // clear the todo
    } else { // no todo
      setError("You must enter a todo."); // display error message
    }
  };

  const completeTodo = (todoNameToDelete: string): void => {
    // click on the trash, remove the todo with at matching name
    let toStorage = todos.filter((todo) => {
      return todo.todoName !== todoNameToDelete;
    });
    setTodos(toStorage); // set local and browser data
    localStorage.setItem("todos", JSON.stringify(toStorage));
  };

  useEffect(() => { // get todos from local storage
    setTodos(JSON.parse(localStorage.getItem("todos") || ""));
  }, []); // only fire once on load

  return (
    <div className="container">
      <header>
        <h1>Browser Todo List</h1>
        <p>
          A Todo List with React, Typescript, and Browser Storage. View the code
          on <a href="https://github.com/gruman/browser-storage-todo">GitHub</a>.
        </p>
      </header>
      {error ? <div className="error">{error}</div> : ""}
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Type new Todo"
          name="todo"
          value={todo}
          onChange={handleChange}
        />
      </div>
      <input type="button" onClick={addTodo} value="Add Todo" />
      <div className="todoList">
        {todos.map((todo: ITodo, key: number) => {
          return <Todo key={key} todo={todo} completeTodo={completeTodo} />;
        })}
      </div>
    </div>
  );
};

export default App;

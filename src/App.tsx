/*
Typescript based on https://github.com/Egnoel/React-TypeScript-Todo
*/

import { useState, FC, ChangeEvent, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { ITodo } from "./interfaces";
const App: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "todo") {
      setTodo(event.target.value);
    }
  };

  const addTodo = (): void => {
    setError("");
    if (todo) {
      const newTodo = {
        todoName: todo,
      };
      setTodos([...todos, newTodo]);
      let toStorage = JSON.stringify([...todos, newTodo]);
      localStorage.setItem("todos", toStorage);
      setTodo("");
    } else {
      setError("You must enter a todo.");
    }
  };

  const completeTodo = (todoNameToDelete: string): void => {
    setTodos(
      todos.filter((todo) => {
        return todo.todoName !== todoNameToDelete;
      })
    );
    
    let toStorage = todos.filter((todo) => {
      return todo.todoName !== todoNameToDelete;
    });
    localStorage.setItem("todos", JSON.stringify(toStorage));
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos") || ""));
  }, []); // only fire once

  return (
    <div className="container">
      <header>
        <h1>Browser Todo List</h1>
        <p>
          A Todo List with React, Typescript, and Browser Storage. View the code
          on <a href="">GitHub</a>.
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

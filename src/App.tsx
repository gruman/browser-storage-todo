/*
Typescript based on https://github.com/Egnoel/React-TypeScript-Todo
*/

import { useState, FC, ChangeEvent, useEffect } from "react";
import "./App.css";
import TodoTask from "./components/TodoTask";
import { ITask } from "./interfaces";
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<ITask[]>([]);
  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    }
  };

  const addTask = (): void => {
    setError("");
    if (task) {
      const newTask = {
        taskName: task,
      };
      setTodos([...todos, newTask]);
      let toStorage = JSON.stringify([...todos, newTask]);
      localStorage.setItem("todos", toStorage);
      setTask("");
    } else {
      setError("You must enter a todo.");
    }
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodos(
      todos.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

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
          name="task"
          value={task}
          onChange={handleChange}
        />
      </div>
      <input type="button" onClick={addTask} value="Add Todo" />
      <div className="todoList">
        {todos.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;

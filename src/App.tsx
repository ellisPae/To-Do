import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import "./App.css";
import { Todo } from "./types/Todo";

const App: FC = () => {
  // State: array of todo items
  const [todos, setTodos] = useState<Todo[]>([]);

  // State: track the text input
  const [inputValue, setInputValue] = useState<string>("");

  // Handler for the input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // Handler for adding a new todo
  const handleAddTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue(""); // Clear the input
  };

  // Handler to toggle completion of a todo
  const handleToggleComplete = (id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handler to delete a todo
  const handleDeleteTodo = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>My To Do</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <table style={{ marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Task</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Completed
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {index + 1}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                }}
              >
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

import React, { useState, useEffect, useContext } from "react";
import TodosContext from "../context";
import axios from "axios";
import uuidv4 from "uuid/v4";

export default function TodoForm() {
  const [todoInput, setTodoInput] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodoInput(currentTodo.text);
    } else {
      setTodoInput("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (currentTodo.text) {
      const response = await axios.patch(`http://localhost:3777/todos/${currentTodo.id}`, {
        text: todoInput
      })
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      const response = await axios.post(`http://localhost:3777/todos`, {
        id: uuidv4(),
        text: todoInput,
        complete: false
      });
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodoInput("");
  };

  return (
    <div>
      <form className="flex justify-center p-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-black border-solid border-2"
          onChange={e => setTodoInput(e.target.value)}
          value={todoInput}
        />
      </form>
    </div>
  );
}

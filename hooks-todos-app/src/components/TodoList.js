import React, { useContext } from "react";
import TodosContext from "../context";
import axios from "axios";

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing to do!";
  return (
    <div className="container mx-auto mx-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li
            className="flex items-center bg-orange-dark border-black my-2 py-4 shadow"
            key={todo.id}
          >
            <span
              onDoubleClick={async () => {
                const response = await axios.patch(
                  `http://localhost:3777/todos/${todo.id}`,
                  {
                    complete: !todo.complete
                  }
                );
                dispatch({ type: "TOGGLE_TODO", payload: response.data });
              }}
              className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                "line-through text-grey-darkest"}`}
            >
              {todo.text}
            </span>

            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <img
                className="h-6"
                src="https://icon.now.sh/edit/0050c5"
                alt="edit icon"
              />
            </button>

            <button>
              <img
                onClick={async () => {
                  await axios.delete(`http://localhost:3777/todos/${todo.id}`);
                  dispatch({ type: "REMOVE_TODO", payload: todo });
                }}
                className="h-6"
                src="https://icon.now.sh/delete/8b0000"
                alt="delete icon"
              />
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

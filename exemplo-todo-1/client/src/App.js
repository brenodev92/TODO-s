import React from "react";
import './App.css';

import { useQuery, useMutation } from "@apollo/react-hooks";
import { READ_TODOS, CREATE_TODO, REMOVE_TODO, UPDATE_TODO } from "./queries";

const App = () => {
  let input;
  const { data, loading, error } = useQuery(READ_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  function onSubmit(e) {
    e.preventDefault();
    if(input.value === "") return

    createTodo({ variables: { text: input.value } });
    input.value = "";

    window.location.reload();
  }

  return (
    <div className="app">
      <h3>Criar um novo TODO</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Digite o TODO"
          ref={(node) => {
            input = node;
          }}
        />
        <button className="btn btn-primary px-5 my-2" type="submit">
          Adicionar
        </button>
      </form>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id} className="w-100">
            <span className={todo.completed ? "done" : "pending"}>
              {todo.text}
            </span>
            <button
              className="btn btn-sm btn-danger rounded-circle float-right"
              onClick={() => {
                deleteTodo({ variables: { id: todo.id } });
                window.location.reload();
              }}
            >
              X
            </button>
            <button
              className={`btn btn-sm float-right ${
                todo.completed ? "btn-success" : "btn-info"
              }`}
              onClick={() => {
                updateTodo({ variables: { id: todo.id } });
                window.location.reload();
              }}
            >
              {todo.completed ? (
                <span>Completed</span>
              ) : (
                <span>Not completed</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

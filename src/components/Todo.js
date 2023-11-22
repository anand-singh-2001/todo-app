import React, { useEffect, useState } from "react";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditForm from "./EditForm";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const fetchData = async () => {
    const data = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1/todos"
    );

    const result = data.data;

    const dummyData = result.map((data) => ({
      id: data.id,
      task: data.title,
      complete: data.completed,
      isEditing: false,
    }));
    console.log(dummyData);
    setTodos(dummyData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = (value) => {
    setTodos([
      ...todos,
      { id: todos.length, task: value, complete: false, isEditing: false },
    ]);

    console.log(todos);
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
    console.log("edited");
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="todoWrapper">
      <h1>TODO</h1>
      <Form addTodo={addTodo} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
        }}>
        <button
          onClick={() => setShowAll(true)}
          style={{
            padding: "0 10px",
            margin: "5px",
            cursor: "pointer",
            borderRadius: "3px",
          }}>
          All
        </button>
        <button
          onClick={() => setShowAll(false)}
          style={{
            padding: "0 10px",
            margin: "5px",
            cursor: "pointer",
            borderRadius: "3px",
          }}>
          Completed
        </button>
      </div>

      <div>
        {showAll
          ? todos.map((todo, id) =>
              todo.isEditing ? (
                <EditForm editTask={editTask} task={todo} />
              ) : (
                <div className="todo" key={id}>
                  <p
                    className={`${todo.complete ? "complete" : "incomplete"}`}
                    onClick={() => toggleComplete(todo.id)}>
                    {todo.task}
                  </p>
                  <div>
                    <FontAwesomeIcon
                      className="edit-icon"
                      icon={faPenToSquare}
                      onClick={() => editTodo(todo.id)}
                    />
                    <FontAwesomeIcon
                      className="delete-icon "
                      icon={faTrash}
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </div>
                </div>
              )
            )
          : todos
              .filter((todo) => todo.complete === true)
              .map((todo, id) =>
                todo.isEditing ? (
                  <EditForm editTask={editTask} task={todo} />
                ) : (
                  <div className="todo" key={id}>
                    <p
                      className={`${todo.complete ? "complete" : "incomplete"}`}
                      onClick={() => toggleComplete(todo.id)}>
                      {todo.task}
                    </p>
                    <div>
                      <FontAwesomeIcon
                        className="edit-icon"
                        icon={faPenToSquare}
                        onClick={() => editTodo(todo.id)}
                      />
                      <FontAwesomeIcon
                        className="delete-icon "
                        icon={faTrash}
                        onClick={() => deleteTodo(todo.id)}
                      />
                    </div>
                  </div>
                )
              )}
      </div>
    </div>
  );
};

export default Todo;

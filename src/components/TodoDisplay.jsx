import React from "react";

const TodoDisplay = ({
  todo,
  editTodo,
  toggleStatus,
  deleteTodo,
  taskStatus,
  setTaskStatus,
}) => {
  return (
    <div>
      <div key={todo.id} className="todo-card">
        <h3>Name:{todo.name}</h3>
        <h4>Description:{todo.description}</h4>
        <p>
          Status: <span onClick={() => editTodo(todo.id)}>{todo.status}</span>
        </p>
        <br />
        <button className="toggle" onClick={() => toggleStatus(todo.id)}>Toggle Status</button>
        <br />
        <br/>
        <button className="Ed" id="edit" onClick={() => editTodo(todo.id)}>Edit</button>
        <button className="Ed"  id="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoDisplay;

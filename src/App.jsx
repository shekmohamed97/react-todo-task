import React, { useState } from 'react';
import TodoDisplay from './components/TodoDisplay';
import './styles/TodoTask.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('not completed');
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Function to add a todo
  const addTodo = (e) => {
    e.preventDefault();
    if (editId !== null) {
      // Editing existing todo
      const updatedTodos = todos.map(todo => {
        if (todo.id === editId) {
          return { ...todo, name: taskName, description: taskDescription, status: taskStatus };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditId(null);
    } else {
      // Adding new todo
      const todo = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        status: taskStatus
      };
      setTodos([...todos, todo]);
    }
    setTaskName('');
    setTaskDescription('');
    setTaskStatus('not completed');
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to toggle todo status
  const toggleStatus = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: todo.status === 'not completed' ? 'completed' : 'not completed' };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to edit a todo
  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setTaskName(todoToEdit.name);
    setTaskDescription(todoToEdit.description);
    setTaskStatus(todoToEdit.status);
    setEditId(id);
  };

  // Function to filter todos
  const filterTodos = () => {
    if (filterStatus === 'completed') {
      return todos.filter(todo => todo.status === 'completed');
    } else if (filterStatus === 'not completed') {
      return todos.filter(todo => todo.status === 'not completed');
    } else {
      return todos;
    }
  };

  return (
    <div>
     <h1>My Todo Task</h1>
      {/* Todo Form */}
      <br />
      <hr />
      <br />
      <form onSubmit={addTodo}>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Todo Name' required />
        <br />
        <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder='Todo Description' required />
        <br />
        <select id='options' value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}  >
          <option className='options3' value="not completed">Not Completed</option>
          <option className='options3' value="completed">Completed</option>
        </select>
        <br />
        <br />
        <br />
        <button id='addTodo' type="submit">{editId !== null ? ' Update Todo' : 'AddTodo' }</button>
      </form>
       <hr />
      {/* Filter Buttons */}
      <select className='options2'>
        <option  onClick={() => setFilterStatus('completed')}>Completed</option>
        <option  onClick={() => setFilterStatus('not completed')}>Not Completed</option>
        <option  onClick={() => setFilterStatus('all')}>All</option>
      </select>
       <h2>My Todos</h2>
      {/* Todo List */}
      {filterTodos().map(todo => (
        
         <TodoDisplay  todo={todo}
                       editTodo={editTodo} 
                       toggleStatus={toggleStatus} 
                       deleteTodo={deleteTodo} 
         />
        

      ))}
    </div>
  );
}

export default TodoApp;

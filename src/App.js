import './App.css';
import { React, useState, useEffect } from 'react';

import axios from 'axios'; // "axios" is a library that makes it easier to make HTTP requests, such as GET, POST, PUT, and DELETE requests
import EditTodo from './components/Todo';
import List from './components/List';

import { MdAdd } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const baseUrl = 'http://localhost:8000/todos';
const secondaryUrl = 'http://localhost:8000';


function TodoList() { // Declaring a function called TodoList with no parameters as input
  const [todos, setTodos] = useState([]); // Creates a list to store multiple todos
  const [inputValue, setInputValue] = useState(''); // Creates a variable to store the new list item

  const [editId, setEditId] = useState(null);
 
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setTodos(response.data);
    });
  }, []);

  if (!todos) return null;
  
  function handleChange(e) { // This function is triggered when the user clicks the "Add Todo" button
    setInputValue(e.target.value); // This keeps track of what the user is typing in the input box
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (Array.isArray(todos) ? todos.some(todo => todo.name.toLowerCase() === inputValue.trim().toLowerCase()): null) {
      alert('This already exists in your list');
      return;
    };

    const newTodo = {
      id: todos.length + 1,
      name: inputValue.trim(),
      completed: false,
    }

    axios.post(baseUrl, newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setInputValue('');
      });
  }

  if (!todos) return "No post!";

  const handleDelete = (id) => {
    const newTodos = [...todos].filter(todo => todo.id !== id); // Creates a new array of todos where the todo with the matching id is removed

    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        setTodos(newTodos);
      });
  }

  const handleUpdate = (id, name) => {
    const newTodos = [...todos].map(todo => todo.id === id ? { ...todo, name: name } : todo); // Creates a new array of todos where the todo with the matching id has its name updated

    axios.put(`${secondaryUrl}/${id}`, { name: name }) // Sends a PUT request to update the todo on the server
      .then(() => {
        setTodos(newTodos); // This updates the todos list with the new todos
      });
      setEditId(null); // Exits the edit mode, therefore returning to its original state
  }

  const handleComplete = (id) => {
    const newTodos = [...todos].map(todo => todo.id === id ? { ...todo, completed: true } : todo);

    axios.put(`${secondaryUrl}/${id}`, { completed: true })
      .then(() => {
        setTodos(newTodos);
      });
  };

  // const moveCompletedTodo = (id, name) => {
  //   const newTodos = [...todos].map(todo => todo.id === id ? { ...todo, name: name, completed: true } : todo);
  //   axios.put(`${secondaryUrl}/${id}`, { name: name, completed: true })
  //     .then(() => {
  //       setTodos(newTodos);
  //     });
  // }

  const incomplete = todos.filter(todo => {
    if (todo.completed === false) {
      return true;
    } else {
      return false;
    }
  })

  return ( // The return statement stops the function and sends back whatever is inside the return statement
    <div>
      <h1>To do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button><MdAdd /></button>
      </form>
      <h5>Incompleted</h5>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={todo.completed ? {textDecoration: "line-through"} : {}}>
            {editId === todo.id ? (
              <EditTodo todo={todo} onSave={handleUpdate} onCancel={() => setEditId(null)} />
            ) : (
              <>
                {todo.name}
                <button onClick={() => setEditId(todo.id)}><MdEdit /></button>
                <button onClick={() => handleDelete(todo.id)}><FaTrash /></button>
                <button onClick={() => handleComplete(todo.id)}><FcCheckmark /></button>
              </>
            )}
          </li>
        ))}
      </ul>
      <List todos={todos} />
    </div>
  );
}

export default TodoList;
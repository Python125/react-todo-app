import './App.css';
import { React, useState, useEffect } from 'react';
/*
  "React" is a library that helps you build user interfaces
  "useState" is a React tool that helps your component remember information even after it updates
  "useEffect" is a React tool that lets you perform "side effects" in your components - side effects are operations that happen "on the side" (e.g. fetching data from an API)
*/
import axios from 'axios'; // "axios" is a library that makes it easier to make HTTP requests, such as GET, POST, PUT, and DELETE requests
import EditTodo from './components/Todo';
// import List from './components/List'

import { MdAdd } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const baseUrl = 'http://localhost:8000/todos'; // This is the URL where your API is running
const secondaryUrl = 'http://localhost:8000';


function TodoList() { // Declaring a function called TodoList with no parameters as input
// In React, "TodoList" is a component
  const [todos, setTodos] = useState([]); // Creates a list to store multiple todos
  /*
    "todos" is a variable that will store the list of todos - like a box that holds todos
    "setTodos" is a function that lets you update what's stored in "todos"
    "useState([])" creates a new memory space that starts with an empty array
  */
  const [inputValue, setInputValue] = useState(''); // Creates a variable to store the new list item
  /*
    "inputValue" is a variable that will store the new todo name
    "setInputValue" is a function that lets you update what's stored in "inputValue"
    "useState('')" creates a new memory space that starts with an empty string
  */
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

    const newUser = {
      id: todos.length + 1,
      name: inputValue.trim(),
    }

    axios.post(baseUrl, newUser)
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

    axios.put(`${secondaryUrl}/${id}`, {completed: true})
      .then(() => {
        setTodos(newTodos);
      });
  };

  return ( // The return statement stops the function and sends back whatever is inside the return statement
    <div> {/* The div tags define a section in the HTML (JSX) */}
      <h1>Todo List</h1> {/* The h tags (in this case, h1) define HTML headings */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button><MdAdd /></button> {/* The button tag is used to trigger an action */}
      </form>
      <ul> {/* The ul tags define an unordered list of items */}
        {todos.map((todo) => (
          <li key={todo.id} style={todo.completed ? {textDecoration: "line-through"} : {}}>
            {editId === todo.id ? (
              <EditTodo todo={todo} onSave={handleUpdate} onCancel={() => setEditId(null)} />
            ) : (
              <>
                {todo.name} {/* The todo.name is the name of the todo */}
                <button onClick={() => setEditId(todo.id)}><MdEdit /></button>
                <button onClick={() => handleDelete(todo.id)}><FaTrash /></button>
                <button onClick={() => handleComplete(todo.id)}><FcCheckmark /></button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
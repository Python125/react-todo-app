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

  const handleDelete = (id) => { // Declares a function and takes an id as input
    const newTodos = [...todos].filter(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return false; // If the id exists, the item is removed
      } else {
        return true; // If the id does not exist, the item is not removed
      }
    });

    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        setTodos(newTodos);
      });
  }

  const handleUpdate = (id, name) => { // Declares a function and takes an id and name as input
    const newTodos = [...todos].map(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return { ...todo, name: name }; // If the id exists, the item is updated to the new name
      } else {
        return todo; // If the id does not exist, the item is not updated
      }
    })

    axios.put(`${secondaryUrl}/${id}`, { name: name })
      .then(() => {
        setTodos(newTodos); // Updates the todos list with the new values
      });
      setEditId(null);
  }

  const handleComplete = (id) => { // Declares a function and takes an id as input
    const newTodos = [...todos].map(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return { ...todo, completed: true }; // If the id exists, the todo's value is updated to true
      } else {
        return todo; // If the id does not exist, the todo's value is returned
      }
    })

    axios.put(`${secondaryUrl}/${id}`, { completed: true })
      .then(() => {
        setTodos(newTodos); // Updates the todos list with the new values
      });
  };

  const incomplete = todos.filter(todo => { // Creates a new array, goes through each item in the array
    if (todo.completed === false) { // Checks to see if the todo's value is false
      return true; // If the todo's value is false, the item is returned
    } else {
      return false; // If the todo's value is true, the item is not returned
    }
  })

  const handleUndo = (id) => { // Declares a function and takes an id as input
    const newTodos = [...todos].map(todo => { // Creates a new array, goes through each item in the array
      if (todo.id === id) { // Checks to see if the id exists in the array
        return { ...todo, completed: false }; // If the id exists, the todo's value is updated to false
      } else {
        return todo; // If the id does not exist, the todo's value is returned
      }
    })
    
    axios.put(`${secondaryUrl}/${id}`, { completed: false })
      .then(() => {
        setTodos(newTodos); // Updates the todos list with the new values
      });
  }

  return ( // The return statement stops the function and sends back whatever is inside the return statement
    <div>
      <h1>To do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button><MdAdd /></button>
      </form>
      <h5>Incompleted</h5>
      <ul>
        {incomplete.map((todo) => (
          <li key={todo.id}>
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
      <List todos={todos} handleDelete={handleDelete} handleUndo={handleUndo} />
    </div>
  );
}

export default TodoList;
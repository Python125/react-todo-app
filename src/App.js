// import logo from './logo.svg';
import './App.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setTodos(response.data);
    });
  }, []);

  if (!todos) return null;
  
  function handleChange(e) {
    setInputValue(e.target.value);
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
      age: 20,
    }

    axios.post(baseUrl, newUser)
      .then((response) => {
        setTodos([...todos, response.data]);
    });

    setInputValue('');
  }

  if (!todos) return "No post!";

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button>Add Todo</button>
      </form>
      <ul>
        {Array.isArray(todos) ? todos.map((todo, index) => (
          <li key={index}>
            {todo.name}
            <button onClick={() => handleDelete(index)}>Delete</button> 
          </li>
        )) : null}
      </ul>
    </div>
  );
}

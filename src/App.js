// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function TodoList () {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (todos.some(todo => todo.toLowerCase() === inputValue.trim().toLowerCase())) {
      alert('This already exists in your list');
      return;
    }

    setTodos([...todos, inputValue.trim()]);
    setInputValue('');
  }

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
        {todos.map((todo, index) => (
          <li key={index}>{todo}
            <button onClick={() => handleDelete(index)}>Delete</button> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
import React, { useState } from 'react';

function EditTodo({ todo, onSave, onCancel }) {
    const [editValue, setEditValue] = useState(todo.name);
  
    const handleEditChange = (e) => {
      setEditValue(e.target.value); // This updates the input field whenever the user types in it
    };
  
    const handleEditSubmit = (e) => { // This is the function that is called when the user clicks the save button
      e.preventDefault(); // Prevents the page from reloading
      if (!editValue.trim()) return; // This makes sure that their are characters in the input field
      onSave(todo.id, editValue); // This saves the edited todo
    };
  
    return (
      <form onSubmit={handleEditSubmit}>
        <input type="text" value={editValue} onChange={handleEditChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    );
  }
  
  export default EditTodo;
import React, { useState } from 'react';

function EditTodo({ todo, onSave, onCancel }) {
    const [editValue, setEditValue] = useState(todo.name);
  
    const handleEditChange = (e) => {
      setEditValue(e.target.value);
    };
  
    const handleEditSubmit = (e) => {
      e.preventDefault();
      if (!editValue.trim()) return;
      onSave(todo.id, editValue); // Saves the edited todo
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
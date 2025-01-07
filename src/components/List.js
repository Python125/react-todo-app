import React from 'react';
import { FcUndo } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";

// Take in the array of todos by name and add it to the completed list
// In the todos array, you need to filter out the todo list items that are complete by using a conditional statement

function List(props) { // props.todos
    const completed = props.todos.filter(todo => todo.completed);

    //const handleUndo = (id) => {}

    return (
        <div>
            <h5>Completed</h5>
            <ul>
                {completed.map(complete => {
                    return <li>{complete.name}
                                <button><FcUndo /></button>
                                <button onClick={() => props.handleDelete(complete.id)}><FaTrash /></button>
                            </li>
                })}
            </ul>
        </div>
    )
}

export default List;
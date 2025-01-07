import React from 'react';
import { FcUndo } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";

function List(props) {
    const completed = props.todos.filter(todo => todo.completed);

    return (
        <div>
            <h5>Completed</h5>
            <ul>
                {completed.map(complete => {
                    return <li>{complete.name}
                                <button onClick={() => props.handleUndo(complete.id)}><FcUndo /></button>
                                <button onClick={() => props.handleDelete(complete.id)}><FaTrash /></button>
                            </li>
                })}
            </ul>
        </div>
    )
}

export default List;
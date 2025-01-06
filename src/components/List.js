import React, { useState } from 'react';
// import { FaTrash } from "react-icons/fa";

// Take in the array of todos by name and add it to the completed list
// In the todos array, you need to filter out the todo list items that are complete by using a conditional statement

function List(props) { // props.todos
    const completed = props.todos.filter(todo => todo.completed);

    // console.log(completed);

    return (
        <div>
            <h5>Completed</h5>
            <ul>
                {completed.map(complete => {
                    return <li>{complete}</li>
                })}
            </ul>
        </div>
    )
}

export default List;
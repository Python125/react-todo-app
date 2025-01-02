import React, { useState } from 'react';
import TodoList from '../App';

export default function List({todo, completed}) {
    const [completedList, setCompletedList] = useState(todo.id);

    // const handleCompletedList = (id) => {}

    return (
        <div>
        <TodoList />
            <h5>Completed</h5>
            <ul>
                <li></li>
            </ul>
        </div>
    )
}
import React, { useState } from 'react';

function List({todo, completed, uncompleted}) {
    // const [list, setList] = useState(todo.id);

    const completedList = (id) => {}

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

export default List;
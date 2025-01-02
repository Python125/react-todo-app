import React, { useState } from 'react';

function List({todo, completed}) {
    const [completedList, setcompletedList] = useState('');

    return (
        <div>
            <h5>Completed</h5>
            <ul>
                <li></li>
            </ul>
        </div>
    )
}

export default List;
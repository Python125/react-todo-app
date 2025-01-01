import React, { useState } from 'react';

function List({todo, completed, uncompleted}) {
    const [list, setList] = useState([]);


    return (
        todo ? completed (
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        ) : uncompleted (
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        )
    )
}

export default List;
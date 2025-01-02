import React, { useState } from 'react';

function List({todo, completed, uncompleted}) {
    // const [list, setList] = useState(todo.id);

    const completedList = (id) => {}

    return (
        todo ? uncompleted () : completed ()
    )
}

export default List;
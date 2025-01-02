import React, { useState } from 'react';

function List({todos, completed, uncompleted}) {
    // const [list, setList] = useState(todo.id);

    const completedList = (id) => {}

    async function moveCompletedTodo() {
        const completedTodo = {
            id: todos.length + 1,
            name: inputValue.trim(),
        }

        axios.post(secondaryUrl, completedTodo)
            .then((response) => {
                setTodos([...todos, response.data]);
                setInputValue('');
        })
    }

    return (
        todos ? uncompleted () : completed ()
    )
}

export default List;
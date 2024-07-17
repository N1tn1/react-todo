import React from 'react';

function TodoListItem({todo})
{
    return (
        <li>{todo && todo.title}</li>
    );
}
export default TodoListItem;
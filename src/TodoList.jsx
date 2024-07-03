import React from 'react';
import TodoListItem from './TodoListItem';

let todoList = [
  {
    id: 1,
    title: 'Group Discussion'
  },
  {
    id: 2,
    title: 'Complete Assignment'
  },
  {
    id: 3,
    title: 'Presentation'
  }
];
function TodoList()
{
    return (
    <>
        <ul>
        {
          todoList.map(todo => (<TodoListItem key={todo.id} todo={todo} />))
        }
      </ul>
    </>
    );
}
export default TodoList;
import React from 'react';

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
          todoList.map(lists => (<li key={lists.id}> {lists.title} </li>))
        }
      </ul>
    </>
    );
}
export default TodoList;
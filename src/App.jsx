import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let todoList;
todoList = [
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
function App() 
{
  return 
  (
    <div>
      <h1> Todo List</h1>
      <ul>
        {
          todoList.map(lists => (<li key={lists.id}> {lists.title} </li>))
        }
      </ul>
    </div>
  )
}
export default App;

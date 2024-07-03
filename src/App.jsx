import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [newTodo, setNewTodo] = useState('');
  return (
      <div>
        <h1> Todo List </h1>
        <AddTodoForm onAddTodo={setNewTodo}/>
        < TodoList />
        <p> New Todo: {newTodo} </p>
        
        
      </div>
  )
}

export default App

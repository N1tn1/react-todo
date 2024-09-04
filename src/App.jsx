import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(()=> {
    const savedTodos = localStorage.getItem('savedTodoList');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    const url = 'https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}'
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}',
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Error: ${response.status}')
      }
      const data = await response.json()
      console.log(data)
      const todos = data.records.map(record=> ({
        id: record.id,
        title: record.fields.title,
      }))

      console.log(todos)
      setTodoList(todos)

    } catch (error) {
      console.error('Fetch Error:', error.message)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  
  }

  useEffect(()=>{
    fetchData()
  }, []);
  return [todoList, setTodoList, isLoading, error];
}

function App() {
  const [todoList, setTodoList, isLoading, error] = useSemiPersistentState();

  const addTodo = (newTodo) =>{
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  };
  
  const removeTodo  = (id) => {
    setTodoList((prevTodos)=> prevTodos.filter((todo)=> todo.id!==id));
  }

  if (isLoading) return <div> Loading... </div>
  if (error) return <div> Error: {error.message} </div>

  return (
      <>
        <h1> Todo List </h1>
        <AddTodoForm onAddTodo = {addTodo}/>
        <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
      </>
  )
}

export default App;

import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(()=> {
    const savedTodos = localStorage.getItem('savedTodoList')
    return savedTodos ? JSON.parse(savedTodos) : []
  });

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      const todos = data.records.map(record=> ({
        id: record.id,
        title: record.fields.title,
      }))

      console.log(todos)
      setTodoList(todos)
      localStorage.setItem('savedTodoList', JSON.stringify(todos))

    } catch (error) {
      console.error('Fetch Error:', error.message)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  
  }

  const addTodo = async (title) => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          title: title
        }
      })
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()

      const newTodo = {
        id: data.id,
        title: data.fields.title
      }
      setTodoList(prevTodos => [...prevTodos, newTodo])
      localStorage.setItem('savedTodoList', JSON.stringify([...todoList, newTodo]))

    } catch (error) {
      console.error('Add Error:', error.message)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  
  }

  useEffect(()=>{
    fetchData()
  }, []);
  return [todoList, addTodo, isLoading, error];
}

function App() {
  const [todoList, addTodo, setTodoList, isLoading, error] = useSemiPersistentState()
  
  const removeTodo  = async (id) => {
    setTodoList((prevTodos)=> prevTodos.filter((todo)=> todo.id!==id))
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

export default App

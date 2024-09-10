import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList')) || []
          }
        });
      }, 2000);
    })
    .then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Failed to fetch todo list:', error);
      setIsLoading(false);
    });
  }, []);

  const addTodo = (newTodo) =>{
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  };
  
  const removeTodo  = (id) => {
    setTodoList((prevTodos)=> prevTodos.filter((todo)=> todo.id!==id));
  };

  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;

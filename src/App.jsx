import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(()=> {
    const savedTodos = localStorage.getItem('savedTodoList');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(()=>{
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];

}
function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) =>{
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  };
  
  return (
      <>
        <h1> Todo List </h1>
        <AddTodoForm onAddTodo = {addTodo}/>
        <TodoList todoList={todoList}/>
      </>
  )
}

export default App;

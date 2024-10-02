import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map(record => ({
        id: record.id,
        title: record.fields.title,
        isCompleted: record.fields.isCompleted || false,
      }));
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = async (newTodo) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        }
      })
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setTodoList((prevTodos) => [...prevTodos, { id: data.id, title: newTodo.title, isCompleted: false }]);
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  return { todoList, addTodo, isLoading, error, setTodoList };
};

function App() {
  const { todoList, addTodo, isLoading, error, setTodoList } = useSemiPersistentState();
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedTodoList = [...todoList].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (sortOrder === 'asc') {
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    } else {
      return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
    }
  });

  const removeTodo = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  const toggleTodo = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>ToDo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              <button onClick={toggleSortOrder} style={{ display: 'flex', alignItems: 'center' }}>
                <i className={`fas fa-sort-${sortOrder === 'asc' ? 'down' : 'up'}`}></i>
                <span style={{ marginLeft: '5px' }}>Sort {sortOrder === 'asc' ? '' : ''}</span>
              </button>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={sortedTodoList} onRemoveTodo={removeTodo} onToggleTodo={toggleTodo} />
              )}
              {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
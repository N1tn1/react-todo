import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onRemoveTodo, onToggleTodo }) => {
  const completedTodos = todoList.filter(todo => todo.isCompleted);
  const activeTodos = todoList.filter(todo => !todo.isCompleted);

  return (
    <>
      {todoList.length === 0 ? (
        <p style={{ fontStyle: 'italic' }}>No Todos Available. Add some tasks to get started!</p>
      ) : (
        <>
          <h2>Active Todos</h2>
          <ul className="todo-list"> {
            activeTodos.map(todo => (
              <TodoListItem 
                key={todo.id} 
                todo={todo} 
                onRemoveTodo={onRemoveTodo} 
                onToggleTodo={onToggleTodo}
              />
            )
          )}
          </ul>
          
          <h2>Completed Todos</h2>
          <ul className="todo-list"> {
            completedTodos.map(todo => (
              <TodoListItem 
                key={todo.id} 
                todo={todo} 
                onRemoveTodo={onRemoveTodo} 
                onToggleTodo={onToggleTodo}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default TodoList;
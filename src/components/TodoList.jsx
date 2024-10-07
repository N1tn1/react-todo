import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

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
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
};
export default TodoList;
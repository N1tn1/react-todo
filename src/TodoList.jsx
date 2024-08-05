import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({todoList, onRemoveTodo}) => {
    return (
    <>
      <ul>
        {
          todoList.length === 0 ? (
            <p style = {{ fontStyle: 'italic'}}> No Todos Available. Add some tasks to get started! </p>
          ) : (
            todoList.map(todo => (
              <TodoListItem 
                  key={todo.id} 
                  todo={todo} 
                  onRemoveTodo = {onRemoveTodo}
              />
            ))
          )
        }
      </ul>
    </>
  );
}
export default TodoList;
import React from 'react';
import style from './TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo, onToggleTodo }) => {
    return (
        <li className={style.ListItem}>
            <div className={style.todoContent}>
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => onToggleTodo(todo.id)}
                />
                <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                    {todo.title}
                </span>
            </div>
            <button className={style.removeButton} onClick={() => onRemoveTodo(todo.id)}><i className="fas fa-trash"></i></button>
        </li>
    );
};
export default TodoListItem;
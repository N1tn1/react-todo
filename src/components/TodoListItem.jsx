import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';

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
TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
};
export default TodoListItem;
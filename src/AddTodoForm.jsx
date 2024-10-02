import React, { useState, useRef } from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');
    const inputRef = useRef(null);

    const handleTitleChange = (event) => {
        setTodoTitle(event.target.value);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({ title: todoTitle });
        setTodoTitle('');
    };

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
                Title
            </InputWithLabel>
            
            <button type="submit"> Add </button>
        </form>
    );
};

export default AddTodoForm;
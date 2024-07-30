import React, {useState} from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({onAddTodo}) =>{
    const [todoTitle, setTodoTitle] = useState('');
    
    const handleTitleChange = (event) =>{
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) =>{
        event.preventDefault();
        if (todoTitle.trim() !== '') {
            onAddTodo({title: todoTitle, id: Date.now()});
            setTodoTitle('');
        }
    };
    return(
        <>
            <form onSubmit={handleAddTodo}>
                <InputWithLabel
                    id="todo-title"
                    value={todoTitle}
                    onChange={handleTitleChange}
                > Title </InputWithLabel>
                <button type = "submit"> Add </button>
            </form>
        </>
    )

}
export default AddTodoForm;
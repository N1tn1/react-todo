import React, {useState} from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({onAddTodo}) =>{
    const [todoTitle, setTodoTitle] = useState('');
    const [error, setError] = useState('');
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
        setError('');
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (todoTitle.trim() === '') 
        {
            setError('Error: Todo must not be empty');
        }
        else
        {
            onAddTodo({title: todoTitle, id: Date.now()});
            setTodoTitle('');
            setError('');
        }
    };
    return(
        <>
            <form onSubmit={handleAddTodo}>
                <InputWithLabel
                    id="todo-title"
                    name="todo-title"
                    value={todoTitle}
                    onChange={handleTitleChange}
                > Title </InputWithLabel>
                <button type = "submit"> Add </button>
                <p style={{color:'red'}}> {error} </p>
            </form>
        </>
    )

}
export default AddTodoForm;
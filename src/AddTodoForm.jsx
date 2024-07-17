import React, {useState} from 'react';

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
                <label for = "todoTitle"> Title </label>
                <input type = "text" id = "todoTitle" name = "title" value = {todoTitle} onChange = {handleTitleChange}/>
                <button type = "button" onClick = {handleAddTodo}> Add </button>
            </form>
        </>
    )

}
export default AddTodoForm;
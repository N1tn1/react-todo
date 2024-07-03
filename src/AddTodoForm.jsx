import React from 'react';

function AddTodoForm({onAddTodo})
{
    function handleAddTodo(event)
    {
        event.preventDefault();
        const todoTitle = event.target.elements['title'].value;
        console.log(todoTitle);
        event.target.elements['title'].value = '';
        onAddTodo(todoTitle);
    }
    return(
        <>
            <form onSubmit={handleAddTodo}>
                <label for = "todoTitle"> Title </label>
                <input type = "text" id = "todoTitle" name = "title"></input>
                <button type = "submit" id = "submit"> Add </button>
            </form>
        </>
    )

}
export default AddTodoForm;
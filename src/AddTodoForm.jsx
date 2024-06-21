import React from 'react';

function AddTodoForm()
{
    return(
        <>
            <form>
                <label for = "todoTitle"> Title </label>
                <input type = "text" id = "todoTitle"></input>
                <button type = "button" id = "submit"> Add </button>
            </form>
        </>
    )

}
export default AddTodoForm;
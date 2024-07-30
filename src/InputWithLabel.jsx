import React, {useRef, useEffect} from 'react';

const InputWithLabel = ({id, name, children, value, onChange}) =>{
    const inputRef = useRef(null);
    useEffect(()=> {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <>
            <label htmlFor = {id}> {children} </label>
            <input type = "text" id = {id} name = {name} value = {value} onChange = {onChange} ref={inputRef}/>
        </>
    )
}

export default InputWithLabel;
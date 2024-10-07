import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ children, value, onChange }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label>
                {children}
                <input 
                    type="text" 
                    value={value} 
                    onChange={onChange} 
                    ref={inputRef}
                />
            </label>
        </>
    );
};

export default InputWithLabel;
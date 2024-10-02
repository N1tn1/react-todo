import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
};

export default InputWithLabel;
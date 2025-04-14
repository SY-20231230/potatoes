import React from 'react';

const Toggle = ({ label, isOn, onclick }) => {
    return (
        <button
            onClick={onclick}
            style={{
                backgroundColor: isOn ? '#4CAF50' : '#ccc',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: '0.3s'
            }}
        >
            {label}
        </button>
    );
};

export default Toggle;

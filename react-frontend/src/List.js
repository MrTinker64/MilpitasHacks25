import React, { useState } from 'react';
import axios from 'axios';

const List = () => {
    const [items, setItems] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/endpoint/itemform', { items });
    };

    const formStyle = {
        maxWidth: '400px',
        margin: '40px auto',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        background: '#fff',
        fontFamily: 'sans-serif'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '12px',
        fontWeight: 'bold',
        fontSize: '1.1em'
    };

    const inputStyle = {
        width: '90%',
        padding: '10px',
        marginBottom: '18px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1em'
    };

    const buttonStyle = {
        padding: '10px 24px',
        borderRadius: '6px',
        border: 'none',
        background: '#1976d2',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1em',
        cursor: 'pointer'
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <label style={labelStyle}>
                Enter items you own (separated by commas):
                <input
                    style={inputStyle}
                    type="text"
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    placeholder="e.g. laptop, phone, headphones"
                />
            </label>
            <button style={buttonStyle} type="submit">
                Submit
            </button>
        </form>
    );
};

export default List;
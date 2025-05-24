import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemInput = () => {
    const [item, setItem] = useState("");

    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/endpoint/itemForm', item)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input 
                type="text" 
                value={item}
                onChange={(e) => setItem(e.target.value)}
                />
            </label>
            <input type="submit" />
        </form>
    )
}

const List = () => {
    return (
        <div>
            <h1>React with Python</h1>
            <p>{data}</p>
        </div>
    );
};
export default List;

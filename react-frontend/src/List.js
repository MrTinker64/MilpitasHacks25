import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = () => {
    const [items, setItems] = useState("");
    const handleSubmit = () =>{
        axios.post('http//localhost:5000/endpoint/itemForm', this.state.items);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Items You Own, Seperated by Commas:
                <input 
                type="text" 
                value=""
                onChange={(e) => setItems(e.target.value)}
                />
            </label>
            <input type="submit" />
        </form>
    );
};
export default List;

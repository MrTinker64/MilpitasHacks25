import React, { useState, useEffect } from 'react';
import axios from 'axios';

itemInput = () => {
    [item, setItem] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return
}

const List = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/data') // Flask
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>React with Python</h1>
            <p>{data}</p>
        </div>
    );
};
export default List;

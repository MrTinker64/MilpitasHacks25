import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
    const [data, setData] = useState({"message": '', "name": ''});

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/data') // Flask
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>React with Python</h1>
            <p>{data.message[0]}</p>
            <p>{data.message[1]}</p>
            <p>{data.message[2]}</p>
            <p>{data.name}</p>
        </div>
    );
};
export default App;

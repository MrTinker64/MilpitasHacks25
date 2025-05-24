import React, { useState, useEffect } from 'react';
import List from "./List.js"
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
            <List/>
        </div>
    );
};
export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormattedList from './FormattedList';

const App = () => {
    const [data, setData] = useState({"message": '', "name": ''});

    const LLMoutput = "Water\nFood\nPhone\nFlashlight\nFirst Aid Kit";

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
            <h1>Place holder website name</h1>
            <h2>Emergency Kit:</h2>
            <FormattedList inputString={LLMoutput} />
        </div>
    );
};
export default App;

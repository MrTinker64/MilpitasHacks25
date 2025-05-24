import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './OutputList';
import Reminder from './Reminder';

const App = () => {
    const [data, setData] = useState({"message": '', "name": ''});

    const LLMoutput = [
        {
          "item_name": "Water",
          "description": "Bottled water for drinking and sanitation",
          "quantity": "1 gallon per person per day for at least 3 days",
          "expiration": "Check expiration date on bottles, typically 1-2 years"
        },
        {
          "item_name": "Non-perishable Food",
          "description": "Canned goods, energy bars, and other non-perishable food items",
          "quantity": "At least a 3-day supply per person",
          "expiration": "Check expiration dates regularly, typically 6-12 months"
        },
        {
          "item_name": "First Aid Kit",
          "description": "Basic medical supplies including bandages, antiseptic, and medications",
          "quantity": "1 comprehensive kit per household",
          "expiration": "Check medications and supplies every 6 months"
        }
      ];

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
            <ItemList items={LLMoutput} />
            <Reminder items={LLMoutput} />
        </div>
    );
};
export default App;

import React, { useState, useEffect } from 'react';
import List from "./List"
import Map from './Map';
import axios from 'axios';
import ItemList from './OutputList';

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
            <h1
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#1976d2',
                    fontWeight: '800',
                    fontSize: '2.8em',
                    letterSpacing: '2px',
                    textAlign: 'start',
                    marginTop: '32px',
                    marginBottom: '12px',
                    marginLeft: '32px',
                    textShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
                }}
            >
                Emergency Essentials Hub
            </h1>
            <h2 style={{
                textAlign: 'center',
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600',
                marginBottom: '28px'
            }}>
                Emergency Kit:
            </h2>
            {/* <img src="ASSETS/hackathon_logo.png" alt="error"></img> */}
            <h4
                 style={{
                    textAlign: 'end',
                    marginLeft: '50px',
                    marginRight: '50px',
                    borderBlock: 'solid',
                    borderBlockWidth: '3px',
                    borderBlockColor: 'lightblue'
                 }} 
                 > 
                 Roughly 70% of Americans don't have an emergency kit in case of a natural disaster, make yourself one of the 30% with this website! Add items to your list, set expiration reminders via Google reminders, and locate nearby shelters!
                 </h4>
            <List />
            <ItemList items={LLMoutput} />
            <Map />
        </div>
    );
};
export default App;

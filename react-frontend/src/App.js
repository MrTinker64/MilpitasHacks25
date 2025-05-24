import React, { useState, useEffect } from 'react';
import List from "./List"
import Map from './Map';
import axios from 'axios';
import GenerateKit from './Generate';

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
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #232526 0%, #ff512f 100%)',
                backgroundAttachment: 'fixed',
                paddingBottom: '40px'
            }}
        >
            <div style={{
                background: 'repeating-linear-gradient(135deg, #222 0 20px, #ffcc00 20px 40px)',
                padding: '24px 0 12px 0',
                marginBottom: '24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
            }}>
                <h1
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        color: '#fff',
                        fontWeight: '900',
                        fontSize: '3em',
                        letterSpacing: '2px',
                        textAlign: 'center',
                        margin: 0,
                        textShadow: '0 4px 16px #ff512f, 0 2px 8px #232526'
                    }}
                >
                    ⚠️ Emergency Essentials Hub ⚠️
                </h1>
            </div>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                background: 'rgba(255,255,255,0.92)',
                borderRadius: '18px',
                boxShadow: '0 4px 32px rgba(255,81,47,0.12)',
                padding: '32px 24px 24px 24px'
            }}>
                <GenerateKit />
                <Map />
                <h4
                    style={{
                        textAlign: 'end',
                        marginLeft: '50px',
                        marginRight: '50px',
                        borderBlock: 'solid',
                        borderBlockWidth: '3px',
                        borderBlockColor: '#ff512f',
                        background: 'rgba(255,204,0,0.10)',
                        color: '#232526',
                        borderRadius: '8px',
                        padding: '12px 18px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(255,81,47,0.08)'
                    }}
                >
                    🚨 Roughly 70% of Americans don't have an emergency kit in case of a natural disaster. Make yourself one of the 30% with this website! Add items to your list, set expiration reminders via Google reminders, and locate nearby shelters!
                </h4>
                <List />
            </div>
        </div>
    );
};
export default App;

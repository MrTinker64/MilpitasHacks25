import React, { useState, useEffect } from 'react';
import ItemList from './OutputList';
import Reminder from './Reminder';
import axios from 'axios';

const GenerateKit = () => {
  const [showKit, setShowKit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [emergencyKit, setEmergencyKit] = useState([
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
  ]);

  useEffect(() => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                  (position) => {
                      setLocation({
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                      });
                  },
                  () => {
                      alert('Unable to retrieve your location.');
                  }
              );
          } else {
              alert('Geolocation is not supported by your browser.');
          }
      }, []);

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      // Call your AI endpoint with the location
      const response = await axios.post('http://localhost:5000/api/generate-kit', {
        latitude: location.lat,
        longitude: location.lng
      });
  
      // Update the emergency kit with the AI's response
      setEmergencyKit(response || []);
      setShowKit(true);
      
    } catch (error) {
      console.error('Error generating kit:', error);
      // Fallback to default kit if there's an error
      setShowKit(true);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = {
    display: 'block',
    margin: '40px auto',
    padding: '14px 32px',
    fontSize: '1.1em',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#1976d2',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#1565c0',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)'
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)'
    },
    ':disabled': {
      backgroundColor: '#90caf9',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)'
    }
  };

  if (!showKit) {
    return (
      <div style={{ textAlign: 'center', margin: '60px 0' }}>
        <button
          onClick={handleGenerateClick}
          disabled={isLoading}
          style={{
            ...buttonStyle,
            ...(isLoading ? buttonStyle[':disabled'] : {})
          }}
        >
          {isLoading ? 'Generating...' : 'Generate Emergency Kit'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            color: '#1976d2',
            marginBottom: '24px',
            textAlign: 'center',
            fontSize: '1.8em'
          }}>
            Your Personalized Emergency Kit
          </h2>
          <ItemList items={emergencyKit} />
        </div>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            color: '#333',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '1.4em'
          }}>
            Set Up Restock Reminders
          </h3>
          <Reminder items={emergencyKit} />
        </div>
      </div>
    </div>
  );
};

export default GenerateKit;
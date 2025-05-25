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
      "expiration": "Check expiration date on bottles, typically 1-2 years",
      "amazon_link": "https://www.amazon.com/bottled-water/s?k=bottled+water"
    },
    {
      "item_name": "Non-perishable Food",
      "description": "Canned goods, energy bars, and other non-perishable food items",
      "quantity": "At least a 3-day supply per person",
      "expiration": "Check expiration dates regularly, typically 6-12 months",
      "amazon_link": "https://www.amazon.com/non-perishable-food/s?k=non+perishable+food"
    },
    {
      "item_name": "First Aid Kit",
      "description": "Basic medical supplies including bandages, antiseptic, and medications",
      "quantity": "1 comprehensive kit per household",
      "expiration": "Check medications and supplies every 6 months",
      "amazon_link": "https://www.amazon.com/first-aid-kit/s?k=first+aid+kit&i=hpc"
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
    if (!location) {
      alert('Please enable location services and try again');
      return;
    }
    
    setIsLoading(true);
    try {
        console.log('Making API call with location:', location);
        const response = await axios.get('http://127.0.0.1:5000/api/generate', {
          params: {
            latitude: location.lat,  
            longitude: location.lng   
          }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        console.log('API Response:', response.data);
    
        if (response.data && Array.isArray(response.data)) {
          setEmergencyKit(response.data);
        } else {
          console.warn('Unexpected response format:', response.data);
        }
        setShowKit(true);
      } catch (error) {
        console.error('Error generating kit:', error);
        setShowKit(true);
      } finally {
        setIsLoading(false);
      }
  };

  const buttonStyle = {
    display: 'block',
    margin: '40px auto',
    padding: '16px 36px',
    fontSize: '1.15em',
    fontWeight: '700',
    color: '#fff',
    background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 6px 24px rgba(255,81,47,0.18), 0 2px 8px rgba(221,36,118,0.10)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
    outline: 'none',
    ':hover': {
      background: 'linear-gradient(90deg, #ff512f 20%, #ff6e7f 100%)',
      transform: 'translateY(-3px) scale(1.04)',
      boxShadow: '0 10px 32px rgba(255,81,47,0.22), 0 4px 16px rgba(221,36,118,0.14)'
    },
    ':active': {
      background: 'linear-gradient(90deg, #dd2476 0%, #ff512f 100%)',
      transform: 'translateY(0) scale(1)',
      boxShadow: '0 2px 8px rgba(255,81,47,0.15)'
    },
    ':disabled': {
      background: '#ffb3a7',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: '0 2px 8px rgba(255,81,47,0.10)'
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
            color: '#ff512f', // match button's main red color
            background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
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
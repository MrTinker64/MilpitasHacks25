import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { GOOGLE_CLIENT_ID } from './secrets';

const Reminder = ({ items = [] }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSettingReminders, setIsSettingReminders] = useState(false);
  const [status, setStatus] = useState('');
  const [isGettingToken, setIsGettingToken] = useState(false);

  // Handle successful Google sign-in
  const handleSuccess = async (credentialResponse) => {
    try {
      // Get user info from ID token
      const userObject = jwtDecode(credentialResponse.credential);
      setUser(userObject);
      setStatus('Getting calendar access...');
      setIsGettingToken(true);
      
      // Store the credential response for user info
      localStorage.setItem('google_credential', credentialResponse.credential);
      
      // Get access token for Google Calendar API
      const authInstance = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar',
        callback: (tokenResponse) => {
          setIsGettingToken(false);
          if (tokenResponse && tokenResponse.access_token) {
            localStorage.setItem('google_access_token', tokenResponse.access_token);
            setIsSignedIn(true);
            setStatus('Successfully signed in with calendar access!');
          } else if (tokenResponse.error) {
            console.error('Token error:', tokenResponse.error);
            setStatus('Failed to get calendar access. Please try again.');
          }
        },
      });
      authInstance.requestAccessToken();
      
    } catch (error) {
      console.error('Error handling sign in:', error);
      setStatus('Error during sign in. Please try again.');
      setIsGettingToken(false);
    }
  };

  // Handle Google sign-in error
  const handleError = () => {
    console.error('Login Failed');
    setStatus('Login failed. Please try again.');
  };

  // Handle sign out
  const handleSignOut = () => {
    googleLogout();
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_credential');
    setUser(null);
    setIsSignedIn(false);
    setStatus('Signed out successfully.');
  };

  // Function to create calendar events
  const createReminders = async () => {
    if (!isSignedIn) {
      setStatus('Please sign in first.');
      return;
    }
  
    setIsSettingReminders(true);
    setStatus('Setting up reminders...');
  
    try {
      const token = localStorage.getItem('google_access_token');
      if (!token) {
        throw new Error('No access token found. Please sign in again.');
      }
  
      for (const item of items) {
        if (item.expiration.includes('N/A')) {
          continue;
        }
        
        const reminderDate = calculateReminderDate(item.expiration);
        
        const event = {
          summary: `Restock: ${item.item_name}`,
          description: `Item: ${item.item_name}\n${item.description}\n\nQuantity: ${item.quantity}\n\nOriginal expiration note: ${item.expiration}`,
          start: {
            dateTime: reminderDate.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: new Date(reminderDate.getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 60 },
            ],
          },
        };
  
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });
  
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('google_access_token');
          setIsSignedIn(false);
          throw new Error('Session expired. Please sign in again.');
        }
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to create event for ${item.item_name}: ${errorData.error?.message || 'Unknown error'}`);
        }
      }
  
      setStatus('Successfully set up all reminders in your Google Calendar!');
    } catch (error) {
      console.error('Error creating reminders:', error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsSettingReminders(false);
    }
  };

  // Helper function to calculate reminder date based on expiration info
  const calculateReminderDate = (expirationText) => {
    const today = new Date();
    
    if (expirationText.includes('6')) {
      return new Date(today.setMonth(today.getMonth() + 6));
    } else if (expirationText.includes('1')) {
      return new Date(today.setFullYear(today.getFullYear() + 1));
    } else if (expirationText.includes('2')) {
      return new Date(today.setFullYear(today.getFullYear() + 2));
    } else if (expirationText.includes('3')) {
      return new Date(today.setFullYear(today.getFullYear() + 3));
    } else if (expirationText.includes('4')) {
      return new Date(today.setFullYear(today.getFullYear() + 4));
    } else if (expirationText.includes('5')) {
      return new Date(today.setFullYear(today.getFullYear() + 5));
    }
    
    return new Date(today.setMonth(today.getMonth() + 1));
  };

  return (
    <div style={styles.container}>
      <h2>Set Up Restock Reminders</h2>
      
      {!isSignedIn && !isGettingToken ? (
        <div style={styles.authContainer}>
          <p>Sign in with Google to set up restock reminders:</p>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
        </div>
      ) : isGettingToken ? (
        <div style={styles.authContainer}>
          <p>Getting calendar access permissions...</p>
        </div>
      ) : (
        <div>
          <div style={styles.userInfo}>
            <p>Signed in as: {user?.email}</p>
            <button 
              onClick={handleSignOut} 
              style={styles.signOutButton}
            >
              Sign out
            </button>
          </div>
          
          <div style={styles.reminderControls}>
            <button 
              onClick={createReminders} 
              disabled={isSettingReminders || items.length === 0}
              style={styles.setRemindersButton}
            >
              {isSettingReminders ? 'Setting Up...' : 'Set Up All Reminders'}
            </button>
            
            {items.length === 0 && (
              <p style={styles.warning}>No items available to set reminders for.</p>
            )}
          </div>
        </div>
      )}
      
      {status && <p style={styles.status}>{status}</p>}
      
      <div style={styles.reminderList}>
        <h3>Upcoming Reminders:</h3>
        <ul>
          {items.map((item, index) => {
            if (item.expiration.includes('N/A')) {
              return null;
            }
            const reminderDate = calculateReminderDate(item.expiration);
            return (
              <li key={index} style={styles.reminderItem}>
                <strong>{item.item_name}:</strong> {reminderDate.toLocaleDateString()}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  authContainer: {
    textAlign: 'center',
    margin: '20px 0',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  signOutButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#d32f2f',
    },
  },
  reminderControls: {
    margin: '25px 0',
    textAlign: 'center',
  },
  setRemindersButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    margin: '10px 0',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#388e3c',
    },
    ':disabled': {
      backgroundColor: '#a5d6a7',
      cursor: 'not-allowed',
    },
  },
  status: {
    margin: '15px 0',
    padding: '12px',
    backgroundColor: '#e8f5e9',
    borderRadius: '6px',
    color: '#2e7d32',
    textAlign: 'center',
    fontSize: '15px',
  },
  reminderList: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  reminderItem: {
    margin: '10px 0',
    padding: '12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    listStyleType: 'none',
    fontSize: '15px',
  },
  warning: {
    color: '#f44336',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default Reminder;
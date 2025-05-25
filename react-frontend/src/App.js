import React from 'react';
import List from "./List"
import Map from './Map';
import GenerateKit from './Generate';
import hackathonLogo from './ASSETS/hackathon_logo.png';

const App = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #232526 0%, #ff512f 100%)',
                backgroundAttachment: 'fixed',
                paddingBottom: '200px' // Increased from 40px to 120px for more space at the bottom
            }}
        >
            <div style={{
                background: 'repeating-linear-gradient(135deg, #222 0 20px, #ffcc00 20px 40px)',
                padding: '24px 0 12px 0',
                marginBottom: '24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                position: 'relative'
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
                <img
                    src={hackathonLogo}
                    alt="Hackathon Logo"
                    style={{
                        position: 'absolute',
                        bottom: '5px',
                        left: '32px',
                        width: '90px',
                        height: 'auto',
                        filter: 'drop-shadow(0 2px 8px #ff512f88)',
                        borderRadius: '12px',
                        padding: '6px',
                        background: 'none'
                    }}
                />
            </div>
            <h4
                style={{
                    textAlign: 'center',
                    marginLeft: '50px',
                    marginRight: '50px',
                    borderBlock: 'solid',
                    borderBlockWidth: '3px',
                    borderBlockColor: 'rgb(255, 251, 0)',
                    background: 'rgba(0, 0, 0, 0.82)',
                    color: 'rgb(255, 255, 255)',
                    borderRadius: '8px',
                    padding: '12px 18px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(255,81,47,0.08)',
                    textShadow: '0 0px 8px rgb(255, 179, 47), 0 2px 8px #232526'
                }}
            >
                🚨 Roughly 70% of Americans don't have an emergency kit in case of a natural disaster. Make yourself one of the 30% with this website! Add items to your list, set expiration reminders via Google reminders, and locate nearby shelters!
            </h4>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                background: 'rgba(255,255,255,0.92)',
                borderRadius: '18px',
                boxShadow: '0 4px 32px rgba(255,81,47,0.12)',
                padding: '32px 24px 24px 24px',
                minHeight: 'calc(100vh - 180px)' // Ensures the content area is tall enough for the map and shelter list
            }}>
                <GenerateKit />
                <Map />
            </div>
        </div>
    );
};

export default App;

import React, { useEffect, useState } from 'react';

const Map = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    alert('Unable to retrieve your location.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <div style={{ width: '100%', height: '400px', margin: '32px auto', maxWidth: '600px' }}>
            {location ? (
                <iframe
                    title="User Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '12px' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01}%2C${location.lat-0.01}%2C${location.lng+0.01}%2C${location.lat+0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                />
            ) : (
                <p style={{ textAlign: 'center', color: '#888' }}>Loading map...</p>
            )}
        </div>
    );
};

export default Map;
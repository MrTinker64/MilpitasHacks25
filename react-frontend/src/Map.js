import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Example shelters
const shelters = [
    { name: "Milpitas Community Center", lat: 37.4323, lng: -121.8996 },
    { name: "Milpitas Sports Center", lat: 37.4329, lng: -121.9072 },
    { name: "Milpitas Library", lat: 37.4321, lng: -121.9067 }
];

const Map = () => {
    const [location, setLocation] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    axios.get('http://localhost:5000/api/hospitals', {
                        params: { lat: position.coords.latitude, long: position.coords.longitude }
                    })
                        .then(response => {
                            setHospitals(response.data || []);
                        })
                        .catch(error => {
                            console.error('Error fetching hospital data:', error);
                        });
                },
                () => {
                    alert('Unable to retrieve your location.');
                    axios.get('http://localhost:5000/api/hospitals')
                        .then(response => {
                            setHospitals(response.data || []);
                        })
                        .catch(error => {
                            console.error('Error fetching hospital data:', error);
                        });
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
            axios.get('http://localhost:5000/api/hospitals')
                .then(response => {
                    setHospitals(response.data || []);
                })
                .catch(error => {
                    console.error('Error fetching hospital data:', error);
                });
        }
    }, []);

    // Center map on user, or first shelter, or fallback
    const center = location
        ? [location.lat, location.lng]
        : [shelters[0].lat, shelters[0].lng];

    return (
        <div style={{ width: '100%', height: '420px', margin: '32px auto', maxWidth: '600px' }}>
            <MapContainer center={center} zoom={14} style={{ height: '400px', width: '100%', borderRadius: '12px' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && (
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>
                            <b>Your Location</b>
                        </Popup>
                    </Marker>
                )}
                {hospitals.map((hospital, idx) => (
                    <Marker key={`hospital-${idx}`} position={[hospital.latitude, hospital.longitude]}>
                        <Popup>
                            <b>{hospital.name}</b>
                        </Popup>
                    </Marker>
                ))}
                {shelters.map((shelter, idx) => (
                    <Marker key={`shelter-${idx}`} position={[shelter.lat, shelter.lng]}>
                        <Popup>
                            <b>{shelter.name}</b>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <b>Emergency Shelters:</b>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {shelters.map((shelter, idx) => (
                        <li key={idx}>
                            <span role="img" aria-label="shelter">🏢</span> {shelter.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Map;
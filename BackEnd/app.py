from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import send_from_directory
from geopy.geocoders import Nominatim
import requests
import json
import time

geolocator = Nominatim(user_agent="app") # Replace "your_app_name" with a descriptive name for your application

us_states = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
    'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
    'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
    'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
    'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN',
    'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE',
    'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC',
    'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR',
    'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA',
    'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
}

app = Flask(__name__)
CORS(app)

items = []


@app.route('/')
def serve():
    return send_from_directory('react-frontend/build', 'index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": ["Hello", "from", "Python!"], "name": "NAME!"})

@app.route('/endpoint/itemform', methods=['POST'])
def handle_data():
    data = request.get_json()
    items.append(data)
    print('Received data:', data)
    return jsonify({'message': 'Data received successfully'}), 200

@app.route('/api/geocode', methods=['GET'])
def geocode():
    print("hi")
    lat = request.args.get('lat')
    long = request.args.get('long')

    location = None
    hospitals = None
    try:
        location = geolocator.reverse(f"{lat},{long}")
        state = us_states.get(location.raw['address'].get('state', ''))
        hospitals = requests.get('https://www.communitybenefitinsight.org/api/get_hospitals.php?state=' + state)
    except Exception as e:
        print("Error getting hospitals:", e)
        return jsonify({'error': 'Could not get hospitals'}), 500

    # Extract hospital address fields
    data = hospitals.json()
    street_address = data.get('street_address', [])
    city = data.get('city', [])
    zip_code = data.get('zip_code', [])
    state_list = data.get('state', [])
    names = data.get('name', [])

    addresses = []
    for i in range(len(street_address)):
        # Only add if all fields are present
        if street_address[i] and city[i] and state_list[i] and zip_code[i]:
            addresses.append({
                'address': f"{street_address[i]}, {city[i]}, {state_list[i]}, {zip_code[i]}",
                'name': names[i] if i < len(names) else "Unknown"
            })

    lats = []
    longs = []
    names_out = []
    for entry in addresses:
        try:
            print("Geocoding:", entry['address'])
            loc = geolocator.geocode(entry['address'])
            if loc:
                lats.append(loc.latitude)
                longs.append(loc.longitude)
                names_out.append(entry['name'])
            else:
                print("Failed to geocode:", entry['address'])
            time.sleep(1)  # Respect Nominatim rate limit
        except Exception as e:
            print(f"Error geocoding address {entry['address']}: {e}")

    return jsonify({
        'hospitals': names_out,
        'hospitals_lat': lats,
        'hospitals_long': longs
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
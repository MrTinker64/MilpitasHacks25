from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import send_from_directory
from geopy.geocoders import Nominatim
import requests
import time
import geopandas as gpd
from shapely.geometry import Point

import sys
import os

# Add the project root directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Now you can import from AI package
from AI.ai import call_gemini
states = gpd.read_file("react-frontend/src/ASSETS/gz_2010_us_040_00_500k.json")

def get_state(longitude, latitude):
    point = Point(longitude, latitude)
    for index, state in states.iterrows():
        if state['geometry'].contains(point):
            return state['name']
    return None

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
    print("hi")
    return jsonify({"message": ["Hello", "from", "Python!"], "name": "NAME!"})

@app.route('/endpoint/itemform', methods=['POST'])
def handle_data():
    data = request.get_json()
    items.append(data)
    print('Received data:', data)
    return jsonify({'message': 'Data received successfully'}), 200

@app.route('/api/geocode', methods=['GET'])
def geocode():
    # print("hi")
    lat = request.args.get('lat')
    long = request.args.get('long')

    location = None
    hospitals = None
    #state = us_states.get(get_state(long, lat))
    #try:
    hospitals = requests.get('https://www.communitybenefitinsight.org/api/get_hospitals.php?state=CA&limit=100')
    #except Exception as e:
      #  print("Error getting hospitals:", e)
      #  return jsonify({'error': 'Could not get hospitals'}), 500

    # Extract hospital address fields
    data = hospitals.json()
    # print(data)
    street_address = []
    city = []
    zip_code = []
    state_list = []
    names = []
    
    for hospital in data:
        street_address.append(hospital['street_address'])
        city.append(hospital['city'])
        zip_code.append(hospital['zip_code'])
        state_list.append(hospital['state'])
        names.append(hospital['name'])

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
    # for entry in addresses:
    #     try:
    #         # print("Geocoding:", entry['address'])
    #         loc = geolocator.geocode(entry['address'])
    #         if loc:
    #             lats.append(loc.latitude)
    #             longs.append(loc.longitude)
    #             names_out.append(entry['name'])
    #         else:
    #             print("Failed to geocode:", entry['address'])
    #         time.sleep(1)  # Respect Nominatim rate limit
    #     except Exception as e:
    #         return jsonify({'error': str(e)}), 500
    #         # print(f"Error geocoding address {entry['address']}: {e}")

    return jsonify({
        'hospitals': names_out,
        'latitude': lats,
        'longitude': longs
    })

@app.route('/api/generate', methods=['GET'])
def generate():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    if not latitude or not longitude:
        return jsonify({'error': 'Latitude and longitude are required'}), 400
        
    prompt = f"Put together a list of supplies for an emergency kit, in preparation for a local natural disaster (based on the user's location of {latitude}, {longitude}). Respond as json with item name, description, quantity, and expiration. For expiration, responses should be as quantitative as possible: a specific amount of time, not range (if applicable) is ideal. If an entry consists of multiple items with different expiration dates, state the most recent one. Also, if applicable, provide amazon search links where each item can be obtained."
    
    try:
        result = call_gemini(prompt)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
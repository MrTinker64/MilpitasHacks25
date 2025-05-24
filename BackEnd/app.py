from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import send_from_directory

app = Flask(__name__)
CORS(app)

items = []

@app.route('/')
def serve():
    return send_from_directory('react-frontend/build', 'index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": ["Hello", "from", "Python!"], "name": "NAME!"})

@app.route('/endpoint/itemForm', methods=['POST'])
def handle_data():
    data = request.get_json()
    items.append(data)
    print('Received data:', data)
    return jsonify({'message': 'Data received successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
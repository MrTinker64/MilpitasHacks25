from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import send_from_directory

@app.route('/')
def serve():
    return send_from_directory('react-frontend/build', 'index.html')

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Python!"})

if __name__ == '__main__':
    app.run(debug=True)
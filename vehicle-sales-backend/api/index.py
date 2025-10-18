from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = "vehicle_sales"

try:
    client = MongoClient(MONGODB_URL)
    db = client[DATABASE_NAME]
except Exception as e:
    print(f"Database connection error: {e}")
    db = None

@app.route('/')
def root():
    return {"message": "Vehicle Sales API is running"}

@app.route('/api/health')
def health_check():
    return {"status": "healthy"}

@app.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    if not db:
        return jsonify({"error": "Database not connected"}), 500
    
    try:
        vehicles = list(db.vehicles.find().limit(50))
        result = []
        for vehicle in vehicles:
            result.append({
                "id": str(vehicle["_id"]),
                "make": vehicle.get("make", ""),
                "model": vehicle.get("model", ""),
                "year": vehicle.get("year", 0),
                "price": vehicle.get("price", 0),
                "mileage": vehicle.get("mileage", 0),
                "type": vehicle.get("type", ""),
                "images": vehicle.get("images", [])
            })
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    if not db:
        return jsonify({"error": "Database not connected"}), 500
    
    try:
        data = request.get_json()
        data["created_at"] = datetime.now()
        result = db.contacts.insert_one(data)
        return jsonify({"message": "Contact message submitted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
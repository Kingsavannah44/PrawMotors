from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "vehicle_sales")

client = MongoClient(MONGODB_URL)
db = client[DATABASE_NAME]

def vehicle_helper(vehicle):
    return {
        "id": str(vehicle["_id"]),
        "make": vehicle["make"],
        "model": vehicle["model"],
        "year": vehicle["year"],
        "price": vehicle["price"],
        "mileage": vehicle["mileage"],
        "type": vehicle["type"],
        "transmission": vehicle.get("transmission", "Automatic"),
        "fuel_type": vehicle.get("fuel_type", "Gasoline"),
        "exterior_color": vehicle.get("exterior_color", ""),
        "interior_color": vehicle.get("interior_color", ""),
        "vin": vehicle.get("vin", ""),
        "description": vehicle.get("description", ""),
        "features": vehicle.get("features", []),
        "images": vehicle.get("images", []),
        "dealer_name": vehicle.get("dealer_name", ""),
        "dealer_phone": vehicle.get("dealer_phone", ""),
        "dealer_address": vehicle.get("dealer_address", ""),
        "created_at": vehicle.get("created_at")
    }

@app.route('/')
def root():
    return {"message": "Vehicle Sales API is running"}

@app.route('/api/health')
def health_check():
    return {"status": "healthy"}

@app.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    query = {}
    
    # Filters
    make = request.args.get('make')
    vehicle_type = request.args.get('type')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    sort_by = request.args.get('sort_by', 'price')
    
    if make:
        query["$or"] = [
            {"make": {"$regex": make, "$options": "i"}},
            {"model": {"$regex": make, "$options": "i"}}
        ]
    
    if vehicle_type:
        query["type"] = vehicle_type
    
    if min_price:
        query["price"] = {"$gte": float(min_price)}
    
    if max_price:
        if "price" in query:
            query["price"]["$lte"] = float(max_price)
        else:
            query["price"] = {"$lte": float(max_price)}
    
    # Sorting
    sort_field = "price"
    sort_order = 1
    
    if sort_by == "price-high":
        sort_order = -1
    elif sort_by == "year-new":
        sort_field = "year"
        sort_order = -1
    elif sort_by == "mileage-low":
        sort_field = "mileage"
    
    vehicles = list(db.vehicles.find(query).sort(sort_field, sort_order).limit(100))
    return jsonify([vehicle_helper(vehicle) for vehicle in vehicles])

@app.route('/api/vehicles/<vehicle_id>', methods=['GET'])
def get_vehicle(vehicle_id):
    if not ObjectId.is_valid(vehicle_id):
        return jsonify({"error": "Invalid vehicle ID"}), 400
    
    vehicle = db.vehicles.find_one({"_id": ObjectId(vehicle_id)})
    if vehicle:
        return jsonify(vehicle_helper(vehicle))
    return jsonify({"error": "Vehicle not found"}), 404

@app.route('/api/vehicles', methods=['POST'])
def add_vehicle():
    data = request.get_json()
    data["created_at"] = datetime.now()
    result = db.vehicles.insert_one(data)
    new_vehicle = db.vehicles.find_one({"_id": result.inserted_id})
    return jsonify(vehicle_helper(new_vehicle))

@app.route('/api/vehicles/<vehicle_id>', methods=['DELETE'])
def delete_vehicle(vehicle_id):
    if not ObjectId.is_valid(vehicle_id):
        return jsonify({"error": "Invalid vehicle ID"}), 400
    
    result = db.vehicles.delete_one({"_id": ObjectId(vehicle_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Vehicle deleted successfully"})
    return jsonify({"error": "Vehicle not found"}), 404

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        print("Contact endpoint hit")
        data = request.get_json()
        print(f"Data received: {data}")
        data["created_at"] = datetime.now()
        result = db.contacts.insert_one(data)
        return jsonify({"message": "Contact message submitted successfully", "id": str(result.inserted_id)})
    except Exception as e:
        print(f"Error in contact: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/sell-car', methods=['POST'])
def submit_sell_request():
    data = request.get_json()
    data["created_at"] = datetime.now()
    result = db.sell_requests.insert_one(data)
    return jsonify({"message": "Sell car request submitted successfully", "id": str(result.inserted_id)})

@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = list(db.contacts.find().sort("created_at", -1).limit(50))
    for message in messages:
        message["_id"] = str(message["_id"])
    return jsonify(messages)

if __name__ == '__main__':
    port = int(os.getenv("PORT", 10000))
    app.run(host='0.0.0.0', port=port, debug=False)
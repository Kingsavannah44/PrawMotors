from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from models.vehicle import Vehicle, VehicleCreate
from app.database import vehicles_collection
from bson import ObjectId
import json

router = APIRouter()

def vehicle_helper(vehicle) -> dict:
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

@router.get("/", response_model=List[dict])
async def get_vehicles(
    make: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    sort_by: Optional[str] = Query("price")
):
    query = {}
    
    if make:
        query["$or"] = [
            {"make": {"$regex": make, "$options": "i"}},
            {"model": {"$regex": make, "$options": "i"}}
        ]
    
    if type:
        query["type"] = type
    
    if min_price is not None:
        query["price"] = {"$gte": min_price}
    
    if max_price is not None:
        if "price" in query:
            query["price"]["$lte"] = max_price
        else:
            query["price"] = {"$lte": max_price}
    
    sort_field = "price"
    sort_order = 1
    
    if sort_by == "price-high":
        sort_order = -1
    elif sort_by == "year-new":
        sort_field = "year"
        sort_order = -1
    elif sort_by == "mileage-low":
        sort_field = "mileage"
    
    vehicles = await vehicles_collection.find(query).sort(sort_field, sort_order).to_list(100)
    return [vehicle_helper(vehicle) for vehicle in vehicles]

@router.get("/{vehicle_id}")
async def get_vehicle(vehicle_id: str):
    if not ObjectId.is_valid(vehicle_id):
        raise HTTPException(status_code=400, detail="Invalid vehicle ID")
    
    vehicle = await vehicles_collection.find_one({"_id": ObjectId(vehicle_id)})
    if vehicle:
        return vehicle_helper(vehicle)
    raise HTTPException(status_code=404, detail="Vehicle not found")

@router.post("/", response_model=dict)
async def create_vehicle(vehicle: VehicleCreate):
    vehicle_dict = vehicle.dict()
    result = await vehicles_collection.insert_one(vehicle_dict)
    new_vehicle = await vehicles_collection.find_one({"_id": result.inserted_id})
    return vehicle_helper(new_vehicle)
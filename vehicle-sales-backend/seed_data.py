import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "vehicle_sales")

async def seed_vehicles():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    vehicles_collection = db.get_collection("vehicles")
    
    # Clear existing data
    await vehicles_collection.delete_many({})
    
    sample_vehicles = [
        {
            "make": "Toyota",
            "model": "Camry",
            "year": 2023,
            "price": 28500,
            "mileage": 15000,
            "type": "Sedan",
            "transmission": "Automatic",
            "fuel_type": "Gasoline",
            "exterior_color": "Pearl White",
            "interior_color": "Black Leather",
            "vin": "1HGBH41JXMN109186",
            "description": "This pristine 2023 Toyota Camry offers exceptional reliability and comfort.",
            "features": ["Backup Camera", "Bluetooth", "Cruise Control", "Keyless Entry"],
            "images": ["https://via.placeholder.com/600x400?text=Toyota+Camry+Front"],
            "dealer_name": "Premium Auto Sales",
            "dealer_phone": "(555) 123-4567",
            "dealer_address": "123 Auto Lane, Car City, CC 12345",
            "created_at": datetime.now()
        },
        {
            "make": "Honda",
            "model": "Civic",
            "year": 2023,
            "price": 24500,
            "mileage": 12000,
            "type": "Sedan",
            "transmission": "Automatic",
            "fuel_type": "Gasoline",
            "exterior_color": "Sonic Gray",
            "interior_color": "Black Cloth",
            "vin": "2HGFC2F59MH123456",
            "description": "Fuel-efficient and reliable Honda Civic with modern features.",
            "features": ["Apple CarPlay", "Honda Sensing", "LED Headlights", "Sunroof"],
            "images": ["https://via.placeholder.com/600x400?text=Honda+Civic+Front"],
            "dealer_name": "City Honda",
            "dealer_phone": "(555) 234-5678",
            "dealer_address": "456 Honda Way, Auto Town, AT 67890",
            "created_at": datetime.now()
        },
        {
            "make": "BMW",
            "model": "X5",
            "year": 2022,
            "price": 65000,
            "mileage": 8000,
            "type": "SUV",
            "transmission": "Automatic",
            "fuel_type": "Gasoline",
            "exterior_color": "Alpine White",
            "interior_color": "Black Leather",
            "vin": "5UXCR6C0XN9123456",
            "description": "Luxury SUV with premium features and performance.",
            "features": ["Navigation", "Panoramic Sunroof", "Heated Seats", "Premium Sound"],
            "images": ["https://via.placeholder.com/600x400?text=BMW+X5+Front"],
            "dealer_name": "Luxury Motors",
            "dealer_phone": "(555) 345-6789",
            "dealer_address": "789 Luxury Blvd, Premium City, PC 11111",
            "created_at": datetime.now()
        },
        {
            "make": "Ford",
            "model": "F-150",
            "year": 2023,
            "price": 45000,
            "mileage": 5000,
            "type": "Truck",
            "transmission": "Automatic",
            "fuel_type": "Gasoline",
            "exterior_color": "Oxford White",
            "interior_color": "Black Vinyl",
            "vin": "1FTFW1E51N1234567",
            "description": "America's best-selling truck with capability and comfort.",
            "features": ["Towing Package", "4WD", "Bed Liner", "Work Lights"],
            "images": ["https://via.placeholder.com/600x400?text=Ford+F150+Front"],
            "dealer_name": "Truck World",
            "dealer_phone": "(555) 456-7890",
            "dealer_address": "321 Truck Ave, Work City, WC 22222",
            "created_at": datetime.now()
        },
        {
            "make": "Tesla",
            "model": "Model 3",
            "year": 2023,
            "price": 42000,
            "mileage": 3000,
            "type": "Electric",
            "transmission": "Automatic",
            "fuel_type": "Electric",
            "exterior_color": "Midnight Silver",
            "interior_color": "White Interior",
            "vin": "5YJ3E1EA1N1234567",
            "description": "Electric vehicle with autopilot and cutting-edge technology.",
            "features": ["Autopilot", "Supercharging", "Premium Audio", "Glass Roof"],
            "images": ["https://via.placeholder.com/600x400?text=Tesla+Model+3+Front"],
            "dealer_name": "Electric Auto",
            "dealer_phone": "(555) 567-8901",
            "dealer_address": "654 Electric St, Future City, FC 33333",
            "created_at": datetime.now()
        },
        {
            "make": "Audi",
            "model": "A4",
            "year": 2022,
            "price": 38000,
            "mileage": 18000,
            "type": "Sedan",
            "transmission": "Automatic",
            "fuel_type": "Gasoline",
            "exterior_color": "Brilliant Black",
            "interior_color": "Beige Leather",
            "vin": "WAUENAF41N1234567",
            "description": "German engineering with luxury and performance.",
            "features": ["Quattro AWD", "Virtual Cockpit", "Bang & Olufsen", "Adaptive Cruise"],
            "images": ["https://via.placeholder.com/600x400?text=Audi+A4+Front"],
            "dealer_name": "German Auto House",
            "dealer_phone": "(555) 678-9012",
            "dealer_address": "987 German Way, Precision City, PC 44444",
            "created_at": datetime.now()
        }
    ]
    
    result = await vehicles_collection.insert_many(sample_vehicles)
    print(f"Inserted {len(result.inserted_ids)} vehicles")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_vehicles())
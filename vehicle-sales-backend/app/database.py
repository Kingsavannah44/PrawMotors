from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "vehicle_sales")

client = AsyncIOMotorClient(MONGODB_URL)
database = client[DATABASE_NAME]

# Collections
vehicles_collection = database.get_collection("vehicles")
contacts_collection = database.get_collection("contacts")
sell_requests_collection = database.get_collection("sell_requests")

def get_database():
    return database
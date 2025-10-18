from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Vehicle(BaseModel):
    make: str
    model: str
    year: int
    price: float
    mileage: int
    type: str
    transmission: str = "Automatic"
    fuel_type: str = "Gasoline"
    exterior_color: str
    interior_color: str
    vin: str
    description: str
    features: List[str] = []
    images: List[str] = []
    dealer_name: str
    dealer_phone: str
    dealer_address: str

class VehicleCreate(BaseModel):
    make: str
    model: str
    year: int
    price: float
    mileage: int
    type: str
    transmission: str = "Automatic"
    fuel_type: str = "Gasoline"
    exterior_color: str
    interior_color: str
    vin: str
    description: str
    features: List[str] = []
    images: List[str] = []
    dealer_name: str
    dealer_phone: str
    dealer_address: str

class ContactMessage(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str

class SellCarRequest(BaseModel):
    make: str
    model: str
    year: int
    mileage: int
    price: float
    condition: str
    description: str
    contact: str
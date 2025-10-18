from fastapi import APIRouter, HTTPException
from models.vehicle import ContactMessage, SellCarRequest
from app.database import contacts_collection, sell_requests_collection
from datetime import datetime

router = APIRouter()

@router.post("/contact")
async def submit_contact(contact: ContactMessage):
    contact_dict = contact.dict()
    contact_dict["created_at"] = datetime.now()
    result = await contacts_collection.insert_one(contact_dict)
    return {"message": "Contact message submitted successfully", "id": str(result.inserted_id)}

@router.post("/sell-car")
async def submit_sell_request(sell_request: SellCarRequest):
    sell_dict = sell_request.dict()
    sell_dict["created_at"] = datetime.now()
    result = await sell_requests_collection.insert_one(sell_dict)
    return {"message": "Sell car request submitted successfully", "id": str(result.inserted_id)}
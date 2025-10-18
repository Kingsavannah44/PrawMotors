from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.vehicles import router as vehicles_router
from routes.contact import router as contact_router
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Vehicle Sales API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(vehicles_router, prefix="/api/vehicles", tags=["vehicles"])
app.include_router(contact_router, prefix="/api", tags=["contact"])

@app.get("/")
async def root():
    return {"message": "Vehicle Sales API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
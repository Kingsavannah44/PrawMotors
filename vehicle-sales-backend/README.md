# Vehicle Sales Backend API

Python FastAPI backend with MongoDB for the Vehicle Sales application.

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Install MongoDB
- Download and install MongoDB Community Server
- Start MongoDB service

### 3. Environment Setup
- Copy `.env` file and update MongoDB connection if needed
- Default: `mongodb://localhost:27017`

### 4. Seed Database
```bash
python seed_data.py
```

### 5. Run Server
```bash
python main.py
```

Server runs on: http://localhost:8000

## API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles with filters
- `GET /api/vehicles/{id}` - Get vehicle by ID
- `POST /api/vehicles` - Create new vehicle

### Contact
- `POST /api/contact` - Submit contact message
- `POST /api/sell-car` - Submit sell car request

### Query Parameters for /api/vehicles:
- `make` - Filter by make/model
- `type` - Filter by vehicle type
- `min_price` - Minimum price
- `max_price` - Maximum price
- `sort_by` - Sort by: price, price-high, year-new, mileage-low

## API Documentation
Visit: http://localhost:8000/docs
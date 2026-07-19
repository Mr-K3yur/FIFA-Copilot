from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from pydantic import BaseModel
from services.gemini_service import gemini_service
import random
import json

router = APIRouter()

class AIRecommendationRequest(BaseModel):
    stadium_data: dict
    focus_area: str

class AIRecommendationResponse(BaseModel):
    recommendation: str

class CrowdAnalysisPayload(BaseModel):
    gateA: str
    gateB: str
    foodCourt: str
    parking: str
    weather: str
    matchTime: str

class NavigationPayload(BaseModel):
    current_location: str
    destination: str
    crowd_data: str
    accessibility_mode: bool

class EmergencyPayload(BaseModel):
    emergency_type: str
    location: str

class TransportPayload(BaseModel):
    location: str
    destination: str

@router.post("/recommendation", response_model=AIRecommendationResponse)
def get_ai_recommendation(request: AIRecommendationRequest, db: Session = Depends(get_db)):
    """
    Get an AI recommendation based on stadium data and focus area.
    """
    prompt = f"As a stadium operations expert, analyze the following stadium data for the focus area: '{request.focus_area}'.\n\nStadium Data: {request.stadium_data}\n\nProvide actionable recommendations."
    
    # We use chat here as a generic fallback for recommendations
    recommendation = gemini_service.chat(prompt)
    
    return AIRecommendationResponse(recommendation=recommendation)

@router.post("/crowd-analysis")
def perform_crowd_analysis(payload: CrowdAnalysisPayload):
    """
    Perform deep crowd analysis and return structured JSON recommendations.
    """
    stadium_data = payload.model_dump()
    result_json = gemini_service.crowd_analysis(stadium_data)
    
    # The result_json is already a JSON string from Gemini (via response_schema)
    # We parse it to dict to return a proper JSON response through FastAPI
    import json
    try:
        return json.loads(result_json)
    except json.JSONDecodeError:
        # Fallback if Gemini somehow didn't return valid JSON despite the schema
        return {"error": "Invalid JSON returned from AI", "raw": result_json}

@router.post("/navigation")
def get_navigation(payload: NavigationPayload):
    """
    Get AI-powered turn-by-turn navigation with crowd and accessibility awareness.
    """
    result_json = gemini_service.navigation(
        current_location=payload.current_location,
        destination=payload.destination,
        crowd_data=payload.crowd_data,
        accessibility_mode=payload.accessibility_mode
    )
    
    import json
    try:
        return json.loads(result_json)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON returned from AI", "raw": result_json}

@router.post("/emergency")
def get_emergency_protocol(payload: EmergencyPayload):
    """
    Get immediate AI emergency protocols and instructions.
    """
    result_json = gemini_service.emergency(
        emergency_type=payload.emergency_type,
        location=payload.location
    )
    
    import json
    try:
        return json.loads(result_json)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON returned from AI", "raw": result_json}

@router.post("/transport")
def get_transport_recommendations(payload: TransportPayload):
    """
    Get AI transport recommendations based on location and destination.
    """
    result_json = gemini_service.transport(
        location=payload.location,
        destination=payload.destination
    )
    
    import json
    try:
        return json.loads(result_json)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON returned from AI", "raw": result_json}

@router.get("/stadium/live")
def get_live_stadium_data():
    """
    Mock stadium API returning randomized live metrics.
    Frontend can poll this every 5 seconds.
    """
    return {
        "gate_occupancy": {
            "Gate A": random.randint(20, 100),
            "Gate B": random.randint(20, 100),
            "Gate C": random.randint(10, 80),
            "Gate VIP": random.randint(5, 40)
        },
        "parking": {
            "Lot A (General)": random.randint(50, 100),
            "Lot B (General)": random.randint(40, 95),
            "Lot C (Transit)": random.randint(10, 60),
            "VIP Lot": random.randint(80, 100)
        },
        "weather": random.choice(["Clear", "Light Rain", "Cloudy", "Sunny", "Overcast", "Heavy Rain"]),
        "food_court": {
            "North Concourse": f"{random.randint(5, 45)} mins",
            "South Concourse": f"{random.randint(5, 30)} mins",
            "East Concourse": f"{random.randint(10, 60)} mins",
            "West Concourse": f"{random.randint(5, 20)} mins"
        },
        "medical_requests": random.randint(0, 8),
        "alerts": random.sample([
            "None",
            "Spill in Sector E2",
            "Lost child reported near Gate A",
            "Escalator 4 out of service",
            "Congestion forming at North Concessions",
            "Gate B scanners offline temporarily"
        ], k=random.randint(1, 2))
    }

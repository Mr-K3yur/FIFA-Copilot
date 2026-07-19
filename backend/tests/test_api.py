import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "Welcome to FIFA Stadium AI Copilot"}

def test_stadium_live_endpoint():
    response = client.get("/api/stadium/live")
    assert response.status_code == 200
    data = response.json()
    
    # Assert expected keys exist
    assert "gate_occupancy" in data
    assert "parking" in data
    assert "weather" in data
    assert "food_court" in data
    assert "medical_requests" in data
    assert "alerts" in data
    
    # Check types
    assert isinstance(data["gate_occupancy"]["Gate A"], int)
    assert isinstance(data["weather"], str)

import pytest
from unittest.mock import patch, MagicMock
from services.gemini_service import GeminiService

class MockResponse:
    def __init__(self, text):
        self.text = text

@pytest.fixture
def mock_genai_client():
    with patch("services.gemini_service.genai.Client") as mock_client:
        mock_instance = MagicMock()
        mock_client.return_value = mock_instance
        yield mock_instance

def test_chat_function_success(mock_genai_client):
    # Setup mock response
    mock_genai_client.models.generate_content.return_value = MockResponse("Hello Fan!")
    
    # Initialize service with mock API key in environment
    with patch("services.gemini_service.settings.GEMINI_API_KEY", "mock-key"):
        service = GeminiService()
        
        response = service.chat("Hi")
        
        assert response == "Hello Fan!"
        mock_genai_client.models.generate_content.assert_called_once()

def test_crowd_analysis_mocked(mock_genai_client):
    mock_json = '{"risk_level": "Low", "summary": "All good.", "recommendations": [], "volunteer_deployment": "N/A", "alternate_routes": "N/A"}'
    mock_genai_client.models.generate_content.return_value = MockResponse(mock_json)
    
    with patch("services.gemini_service.settings.GEMINI_API_KEY", "mock-key"):
        service = GeminiService()
        stadium_data = {"Gate A": 50}
        
        response = service.crowd_analysis(stadium_data)
        
        assert "risk_level" in response
        assert "All good." in response

import logging
from typing import List, Dict, Optional, Any
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from core.config import settings

logger = logging.getLogger(__name__)

class CrowdAnalysisResult(BaseModel):
    risk_level: str = Field(description="Risk level: Low, Medium, High, or Critical")
    summary: str = Field(description="Executive summary of the situation")
    recommendations: list[str] = Field(description="Actionable recommendations to resolve bottlenecks")
    volunteer_deployment: str = Field(description="Specific instructions on where and how to deploy volunteers")
    alternate_routes: str = Field(description="Recommended alternate routes for fans to avoid congestion")

class NavigationResult(BaseModel):
    walking_route: str = Field(description="Step-by-step walking route instructions")
    estimated_time: str = Field(description="Estimated time to reach destination")
    crowd_conditions: str = Field(description="Summary of crowd density along the route")
    alternative_route: str = Field(description="An alternative route just in case")
    friendly_explanation: str = Field(description="A warm, conversational explanation welcoming the fan")

class EmergencyResult(BaseModel):
    priority: str = Field(description="Priority level: LOW, MEDIUM, HIGH, CRITICAL")
    instructions: list[str] = Field(description="Step-by-step immediate actions to take")
    nearest_help: str = Field(description="Location of the nearest medical or security personnel based on user location")
    emergency_contacts: list[str] = Field(description="Relevant phone numbers or radio channels")
    summary: str = Field(description="Short AI summary of the situation and response protocol")

class TransportResult(BaseModel):
    parking: str = Field(description="Parking recommendations and availability")
    metro: str = Field(description="Metro or subway recommendations")
    bus: str = Field(description="Bus route recommendations")
    walking: str = Field(description="Walking directions or advice")
    ride_share: str = Field(description="Ride share pick-up locations and wait times")
    traffic: str = Field(description="Current traffic conditions around the stadium")
    estimated_time: str = Field(description="Estimated travel time for recommended modes")
    environmental_impact: str = Field(description="Brief assessment of the carbon footprint of the chosen options")

class GeminiService:
    def __init__(self):
        """
        Initialize the Gemini client using the new google-genai SDK.
        Reads API key from the environment (via settings).
        """
        self.api_key = settings.GEMINI_API_KEY
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
            self.model_name = 'gemini-2.5-flash'
            logger.info("Gemini Service initialized successfully.")
        else:
            self.client = None
            logger.warning("GEMINI_API_KEY is not set. AI features will be disabled.")

    def _generate(self, prompt: str, system_instruction: str = "") -> str:
        """Helper to call generate_content with safety blocks and instructions."""
        if not self.client:
            return "AI service is offline. Please check your API key configuration."
        
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.4,
            )
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config,
            )
            return response.text
        except Exception as e:
            logger.error(f"Error calling Gemini API: {str(e)}")
            return f"Error generating response: {str(e)}"

    def chat(self, message: str, history: Optional[List[Dict[str, str]]] = None) -> str:
        """
        General conversational chat for the Fan Copilot.
        History should be a list of dicts with 'role' and 'text'.
        """
        system_instruction = (
            "You are the official FIFA 2026 Stadium AI Copilot. "
            "You are helpful, concise, and enthusiastic about football. "
            "Assist fans with stadium navigation, food, and rules."
        )
        
        context = ""
        if history:
            for msg in history[-4:]:
                role = "User" if msg.get("role") == "user" else "Copilot"
                context += f"{role}: {msg.get('text')}\n"
        
        prompt = f"{context}\nUser: {message}\nCopilot:" if context else message
        
        return self._generate(prompt, system_instruction=system_instruction)

    def crowd_analysis(self, stadium_data: Dict[str, Any]) -> str:
        """
        Analyze live stadium data to provide crowd management insights, returning JSON.
        """
        system_instruction = (
            "You are an expert stadium operations AI for the FIFA World Cup. "
            "Analyze the provided live stadium data (gates, food court, parking, weather, match time) "
            "and provide a structured risk assessment and operational plan."
        )
        
        prompt = f"Live Stadium Data:\n{stadium_data}\n\nPerform crowd analysis."
        
        if not self.client:
            return '{"error": "AI service offline"}'
            
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.2,
                response_mime_type="application/json",
                response_schema=CrowdAnalysisResult,
            )
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config,
            )
            return response.text
        except Exception as e:
            logger.error(f"Error in crowd_analysis: {str(e)}")
            return '{"error": "Failed to generate analysis"}'

    def navigation(self, current_location: str, destination: str, crowd_data: str, accessibility_mode: bool) -> str:
        """
        Provide turn-by-turn navigation within the stadium returning structured JSON.
        """
        system_instruction = (
            "You are a helpful wayfinding assistant for a massive World Cup stadium. "
            "Provide optimal navigation taking into account current crowd conditions. "
            "If accessibility mode is true, prioritize elevators and ramps over stairs."
        )
        
        prompt = (
            f"Current Location: {current_location}\n"
            f"Destination: {destination}\n"
            f"Live Crowd Data: {crowd_data}\n"
            f"Accessibility Mode: {accessibility_mode}\n\n"
            "Provide the optimal route."
        )
        
        if not self.client:
            return '{"error": "AI service offline"}'
            
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3,
                response_mime_type="application/json",
                response_schema=NavigationResult,
            )
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config,
            )
            return response.text
        except Exception as e:
            logger.error(f"Error in navigation: {str(e)}")
            return '{"error": "Failed to generate navigation"}'

    def transport(self, location: str, destination: str) -> str:
        """
        Provide transport recommendations based on fan location returning structured JSON.
        """
        system_instruction = (
            "You are a transit AI for a major World Cup stadium. Based on the user's current location and destination, "
            "recommend the best transport options. Provide details on parking, metro, bus, walking, rideshare, "
            "traffic, estimated times, and environmental impact."
        )
        
        prompt = f"I am currently at: {location}. I need to go to: {destination}. How should I get there?"
        
        if not self.client:
             return '{"error": "AI service offline"}'
             
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3,
                response_mime_type="application/json",
                response_schema=TransportResult,
            )
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config,
            )
            return response.text
        except Exception as e:
            logger.error(f"Error in transport: {str(e)}")
            return '{"error": "Failed to generate transport recommendations"}'

    def emergency(self, emergency_type: str, location: str) -> str:
        """
        Generate immediate protocol responses for emergencies returning structured JSON.
        """
        system_instruction = (
            "CRITICAL: You are an emergency response AI. "
            "Provide immediate, step-by-step instructions for the given emergency. "
            "Keep it highly concise, clear, and calm. Prioritize life safety."
        )
        
        prompt = f"EMERGENCY TYPE: {emergency_type}\nLOCATION: {location}\n\nProvide the immediate emergency protocol."
        
        if not self.client:
             return '{"error": "SYSTEM OFFLINE. CONTACT NEAREST SECURITY GUARD IMMEDIATELY."}'
             
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.1, 
                response_mime_type="application/json",
                response_schema=EmergencyResult,
            )
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config,
            )
            return response.text
        except Exception as e:
            logger.error(f"Error in emergency protocol: {str(e)}")
            return '{"error": "ERROR CALLING EMERGENCY PROTOCOL. DISPATCHING RADIO TEAM."}'

# Singleton instance
gemini_service = GeminiService()

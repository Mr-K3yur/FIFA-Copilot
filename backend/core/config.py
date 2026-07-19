from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    # API Keys
    GEMINI_API_KEY: str = ""
    
    # Frontend URL for CORS
    FRONTEND_URL: str = "http://localhost:5173"
    
    # Database URL
    DATABASE_URL: str = "sqlite:///./stadium.db"
    
    # Use config dict to load from .env file in the root
    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding='utf-8',
        extra="ignore"
    )

settings = Settings()

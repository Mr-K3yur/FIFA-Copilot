from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from api.routes import router as api_router
from db.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FIFA Stadium AI Copilot API",
    description="API for the FIFA World Cup 2026 Stadium Operations",
    version="1.0.0",
)

# Configure CORS
origins = [
    settings.FRONTEND_URL,
    "http://localhost:5173", # Vite default
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "FIFA Stadium AI Copilot API is running"}

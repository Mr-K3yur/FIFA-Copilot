from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# By default, SQLite allows only one thread to communicate with it, assuming that each thread would handle an independent request.
# This is to prevent sharing the connection by accident. Since FastAPI can use multiple threads, we add connect_args={"check_same_thread": False}.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for FastAPI to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Expense Tracker API"
    environment: str = "development"

settings = Settings()

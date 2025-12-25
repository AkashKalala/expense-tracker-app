from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router

from app.db.session import engine
from app.db.base import Base
from app.models import expense
from app.api.auth import router as auth_router
from app.api.expenses import router as expense_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Expense Tracker API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(expense_router)

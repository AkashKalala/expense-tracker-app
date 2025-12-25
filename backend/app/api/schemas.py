from pydantic import BaseModel
from datetime import date
from typing import Optional

class ExpenseCreate(BaseModel):
    expense_date: date
    category: str
    amount: float
    sub_category: Optional[str] = None
    description: Optional[str] = None
    payment_mode: Optional[str] = None

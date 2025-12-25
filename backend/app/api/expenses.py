from fastapi import APIRouter, Depends
from typing import Optional
from sqlalchemy.orm import Session
from datetime import date

from app.db.deps import get_db
from app.models.expense import Expense
from app.api.schemas import ExpenseCreate

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("")
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):
    new_expense = Expense(
        date=expense.expense_date,
        category=expense.category,
        sub_category=expense.sub_category,
        description=expense.description,
        amount=expense.amount,
        payment_mode=expense.payment_mode
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


@router.get("")
def list_expenses(
    category: Optional[str] = None,
    payment_mode: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Expense)

    if category:
        query = query.filter(Expense.category == category)

    if payment_mode:
        query = query.filter(Expense.payment_mode == payment_mode)

    return query.all()

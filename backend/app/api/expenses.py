from fastapi import APIRouter, Depends
from typing import Optional
from sqlalchemy.orm import Session
from datetime import date
from fastapi import HTTPException


from app.db.deps import get_db
from app.models.expense import Expense
from app.api.schemas import ExpenseCreate
from app.api.deps import get_current_user
from app.models.user import User



router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("")
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_expense = Expense(
        date=expense.expense_date,
        category=expense.category,
        sub_category=expense.sub_category,
        description=expense.description,
        amount=expense.amount,
        payment_mode=expense.payment_mode,
        user_id=current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense



@router.get("")
def list_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Expense)
        .filter(Expense.user_id == current_user.id)
        .all()
    )


@router.put("/{expense_id}")
def update_expense(
    expense_id: int,
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    if db_expense.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")


    db_expense.date = expense.expense_date
    db_expense.category = expense.category
    db_expense.amount = expense.amount
    db_expense.sub_category = expense.sub_category
    db_expense.description = expense.description
    db_expense.payment_mode = expense.payment_mode

    db.commit()
    db.refresh(db_expense)

    return db_expense

@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    if db_expense.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")


    db.delete(db_expense)
    db.commit()

    return {"message": "Expense deleted successfully"}

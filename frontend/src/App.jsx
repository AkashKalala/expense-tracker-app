import { useEffect, useState } from "react";
import { getExpenses, createExpense } from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data);
  }

  async function handleAddExpense() {
    await createExpense({
      expense_date: "2025-01-10",
      category: "Food",
      amount: 150,
      sub_category: "Swiggy",
      description: "Lunch",
      payment_mode: "UPI",
    });

    loadExpenses();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Expense Tracker</h1>

      <button onClick={handleAddExpense}>
        Add Sample Expense
      </button>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.date} – {exp.category} – ₹{exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

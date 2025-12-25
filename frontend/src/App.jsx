import { useEffect, useState } from "react";
import { getExpenses, createExpense } from "./services/api";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data);
  }

  async function addExpense(expense) {
    await createExpense(expense);
    loadExpenses();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Expense Tracker</h1>

      <ExpenseForm onAdd={addExpense} />

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

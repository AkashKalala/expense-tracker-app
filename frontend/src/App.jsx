import { useEffect, useState } from "react";
import { getExpenses, createExpense } from "./services/api";
import ExpenseForm from "./components/ExpenseForm";
import { deleteExpense } from "./services/api";


function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");


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
      <h1 className="text-4xl font-extrabold text-purple-600 bg-yellow-200 p-4">
        Expense Tracker
      </h1>

      <ExpenseForm onAdd={addExpense} />

      <ul className="space-y-2">
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <div>
              <div className="font-medium">
                ₹{exp.amount} — {exp.category}
              </div>
              <div className="text-sm text-gray-600">
                {exp.date} · {exp.sub_category}
              </div>
            </div>

            {editingId === exp.id ? (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="border rounded p-1 w-24"
                />
                <button
                  className="text-green-600"
                  onClick={async () => {
                    await updateExpense(exp.id, {
                      expense_date: exp.date,
                      category: exp.category,
                      amount: Number(editAmount),
                      sub_category: exp.sub_category,
                      description: exp.description,
                      payment_mode: exp.payment_mode,
                    });
                    setEditingId(null);
                    loadExpenses();
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setEditingId(exp.id);
                    setEditAmount(exp.amount);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={async () => {
                    await deleteExpense(exp.id);
                    loadExpenses();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>


    </div>
  );
}

export default App;

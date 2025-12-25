import { useEffect, useState } from "react";
import { getExpenses, createExpense, deleteExpense, updateExpense } from "./services/api";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [authMode, setAuthMode] = useState("login");



  useEffect(() => {
    if (isAuthenticated) {
      loadExpenses();
    }
  }, [isAuthenticated]);

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data);
  }

  async function addExpense(expense) {
    await createExpense(expense);
    loadExpenses();
  }

  if (!isAuthenticated) {
    return authMode === "login" ? (
      <Login
        onLogin={() => setIsAuthenticated(true)}
        onSwitchToRegister={() => setAuthMode("register")}
      />
    ) : (
      <Register
        onSwitchToLogin={() => setAuthMode("login")}
      />
    );
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }


  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

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

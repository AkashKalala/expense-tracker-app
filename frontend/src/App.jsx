import { useEffect, useState } from "react";
import { getExpenses, createExpense, deleteExpense } from "./services/api";
import Login from "./components/Login";
import Register from "./components/Register";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    if (isAuthenticated) {
      loadExpenses();
    }
  }, [isAuthenticated]);

  async function loadExpenses() {
    setLoading(true);
    try {
      const data = await getExpenses();
      setExpenses(data);
    } finally {
      setLoading(false);
    }
  }

  async function addExpense(expense) {
    await createExpense(expense);
    loadExpenses();
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAuthMode("login");
  }

  if (!isAuthenticated) {
    return authMode === "login" ? (
      <Login
        onLogin={() => setIsAuthenticated(true)}
        onSwitchToRegister={() => setAuthMode("register")}
      />
    ) : (
      <Register onSwitchToLogin={() => setAuthMode("login")} />
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <button onClick={handleLogout} className="text-red-600 text-sm hover:underline">
          Logout
        </button>
      </div>

      <ExpenseForm onAdd={addExpense} />

      {loading && <p className="text-gray-500 text-sm mt-4">Loading expenses...</p>}

      {!loading && expenses.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No expenses yet. Add your first one 👇
        </p>
      )}

      <ul className="space-y-2 mt-4">
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

            <button
              className="text-red-500 text-sm"
              onClick={async () => {
                await deleteExpense(exp.id);
                loadExpenses();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

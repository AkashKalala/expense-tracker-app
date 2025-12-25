const BASE_URL = "http://127.0.0.1:8000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Registration failed");
  }

  return res.json();
}

export async function getExpenses() {
  const res = await fetch(`${BASE_URL}/expenses`, {
    headers: authHeaders(),
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
    return [];
  }

  return res.json();
}

export async function createExpense(expense) {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(expense),
  });

  return res.json();
}

export async function deleteExpense(id) {
  await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

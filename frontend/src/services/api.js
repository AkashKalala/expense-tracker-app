const BASE_URL = "http://127.0.0.1:8000";

export async function getExpenses() {
  const response = await fetch(`${BASE_URL}/expenses`);
  return response.json();
}

export async function createExpense(expense) {
  const response = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  return response.json();
}

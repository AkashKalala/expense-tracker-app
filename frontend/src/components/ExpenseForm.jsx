import { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    expense_date: "",
    category: "",
    amount: "",
    sub_category: "",
    description: "",
    payment_mode: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onAdd({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      expense_date: "",
      category: "",
      amount: "",
      sub_category: "",
      description: "",
      payment_mode: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add Expense</h3>

      <input
        type="date"
        name="expense_date"
        value={formData.expense_date}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="sub_category"
        placeholder="Sub-category"
        value={formData.sub_category}
        onChange={handleChange}
      />

      <input
        type="text"
        name="payment_mode"
        placeholder="Payment Mode"
        value={formData.payment_mode}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default ExpenseForm;

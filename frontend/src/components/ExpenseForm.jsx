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
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow rounded p-4 mb-6 space-y-3"
  >
    <h3 className="text-lg font-semibold">Add Expense</h3>

    <div className="grid grid-cols-2 gap-3">
      <input
        type="date"
        name="expense_date"
        value={formData.expense_date}
        onChange={handleChange}
        required
        className="border rounded p-2"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="border rounded p-2"
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        className="border rounded p-2"
      />

      <input
        type="text"
        name="payment_mode"
        placeholder="Payment Mode"
        value={formData.payment_mode}
        onChange={handleChange}
        className="border rounded p-2"
      />
    </div>

    <input
      type="text"
      name="sub_category"
      placeholder="Sub-category"
      value={formData.sub_category}
      onChange={handleChange}
      className="border rounded p-2 w-full"
    />

    <input
      type="text"
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      className="border rounded p-2 w-full"
    />

    <button
      type="submit"
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
    >
      Add Expense
    </button>
  </form>
);

}

export default ExpenseForm;

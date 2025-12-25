import { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAdd({
      amount: Number(amount),
      category,
      sub_category: subCategory,
      expense_date: date,
      payment_mode: "cash",
      description: "",
    });

    setAmount("");
    setCategory("");
    setSubCategory("");
    setDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        placeholder="Category"
        className="border p-2 w-full"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        placeholder="Sub Category"
        className="border p-2 w-full"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;

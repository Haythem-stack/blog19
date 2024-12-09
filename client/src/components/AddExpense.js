import React, { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [form, setForm] = useState({ amount: "", category: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/expenses", form).then(() => {
      alert("Expense added");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="text-xl bg-blue-800">
      <input name="amount" placeholder="Amount" onChange={handleChange} className="rounded-xl" />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;

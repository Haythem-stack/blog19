import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses")
      .then((response) => {
        const data = response.data;

        // Log to debug data
        console.log("Fetched Data:", data);

        // Update expenses state
        setExpenses(data);

        // Calculate total amount
        const totalAmount = data.reduce((acc, expense) => acc + (expense.amount || 0), 0);

        // Log total amount to ensure it's correct
        console.log("Calculated Total Amount:", totalAmount);

        // Update total state
        setTotal(totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []); 
  useEffect(() => {
    const totalAmount = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
    setTotal(totalAmount);
  }, [expenses]);
 
  console.log("Expenses:", expenses);
  console.log("Total Sum:", total);

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:5000/api/expenses/${id}`).then(() => {
      setExpenses(expenses.filter((expense) => expense._id !== id));
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>
      <h1>Your total Amount is: {total}</h1>
      {expenses.length > 0 ? (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
            >
              <div>
                <p className="font-semibold text-lg">{expense.category}</p>
                <p className="text-sm text-gray-500">
                  ${expense.amount} - {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => deleteExpense(expense._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No expenses found. Start adding some!</p>
      )}
      <div className="mt-6">
        <Link
          to="/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Add Expense
        </Link>
      </div>
    </div>
  );
};

export default ExpenseList;

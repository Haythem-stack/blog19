
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExpenseList from "./components/ExpenseList.js";
import AddExpense from "./components/AddExpense.js";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white p-4 shadow">
          <h1 className="text-center text-xl font-bold">Expense Tracker</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<ExpenseList />} />
            <Route path="/add" element={<AddExpense />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

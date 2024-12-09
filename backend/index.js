import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
const router = express.Router();
import Expense from './models/Expense.js'
import path from 'path'

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://haythemasidi:2UofBUwvpV40zwDq@cluster0.fik77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=blog")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.post("/api/expenses", async (req, res) => {
    const expense = new Expense(req.body);
    try {
      const savedExpense = await expense.save();
      res.status(201).json(savedExpense);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get("/api/expenses", async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.delete("/api/expenses/:id", async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.id);
      res.json({ message: "Expense deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

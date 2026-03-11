require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/lessons", require("./routes/lessonRoutes"));
app.use("/sessions", require("./routes/sessionRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/llm", require("./routes/llmRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
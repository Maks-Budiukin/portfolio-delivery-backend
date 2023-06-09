const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const authRouter = require("./routes/api/auth");
const ordersRouter = require("./routes/api/orders");
const shopsRouter = require("./routes/api/shops");
const productsRouter = require("./routes/api/products");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/shops", shopsRouter);
app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

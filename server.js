import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categooryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import cors from "cors";

//confugure env
dotenv.config();

// database config
connectDB();

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categooryRoute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome root API",
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

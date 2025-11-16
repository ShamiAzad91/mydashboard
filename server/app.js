// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cors from "cors";

dotenv.config();
const app = express();


// Connect MongoDB
connectDB();


// Enable CORS
app.use(cors());
 // Debug middleware (add this before routes)
// app.use((req, res, next) => {
//   console.log("Headers:", req.headers["content-type"]);
//   console.log("Body:", req.body);
//   next();
// });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//my routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/product",productRoutes)



// Test route
app.get("/", (req, res) => {
  res.send("MongoDB Connection Successful!");
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server is up and running at port ${PORT}`);
    
})
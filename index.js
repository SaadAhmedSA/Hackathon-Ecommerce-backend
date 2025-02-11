import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"
import connectDB from "./src/db/connection.js";
import router from "./src/routes/router.js";
import cookieParser from "cookie-parser";



const app = express();
const PORT = process.env.PORT || 5000
const allowedOrigins = [
  "https://zara-s-client.vercel.app",
  "http://localhost:3000", // For local development
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Important for cookies
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Ecommerce App!");
});
 
app.use("/api/v1", router)


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });

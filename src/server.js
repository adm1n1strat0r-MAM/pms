import express from "express";
import { PORT } from "./config/config.js";
import "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import stockRoute from "./routes/stock.route.js";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/stock", stockRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  console.log(`Server is sunning at port no ${PORT}`);
});

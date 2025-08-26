import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.router.js";
import cors from "cors";

app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Restaurant Restful API hbrhb");
});
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/auth", authRouter);
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});

import db from "./models/index.js";
const role = db.Role;

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

db.sequelize.sync({ force: true }).then(() => {
  initRole();
  console.log("Drop Sync");
});

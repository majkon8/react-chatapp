import express from "express";
import bodyParser from "body-parser";
const userRoutes = require("./routes/user.routes");
import "./mongoose";

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use("/users", userRoutes);

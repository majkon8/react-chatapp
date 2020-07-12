import express from "express";
import bodyParser from "body-parser";
import path from "path";
const userRoutes = require("./routes/user.routes");
import "./mongoose";

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use("/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
require("./mongoose");
var userRoutes = require("./routes/user.routes");
var app = express_1.default();
var port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});
app.use("/users", userRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client", "build")));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}

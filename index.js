"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
require("./mongoose");
var cors_1 = __importDefault(require("cors"));
require("dotenv").config();
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default({ credentials: true, origin: "http://localhost:3001" }));
var userRoutes = require("./routes/user.routes");
var conversationRoutes = require("./routes/conversation.routes");
var messagesRoutes = require("./routes/message.routes");
var fileRoutes = require("./routes/file.routes");
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messagesRoutes);
app.use("/files", fileRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client", "build")));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
var server = http_1.default.createServer(app);
exports.io = require("socket.io")(server);
require("./socket");
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Server is listening on port " + port);
});

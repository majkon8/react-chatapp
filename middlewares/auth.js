"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAuth = exports.tokenAuthSocket = void 0;
var user_model_1 = require("../models/user.model");
var jsonwebtoken_1 = require("jsonwebtoken");
var secretKey = user_model_1.User.getJWTSecret();
function tokenAuthSocket(socket, next) {
    try {
        var accessToken = socket.handshake.query.accessToken;
        jsonwebtoken_1.verify(accessToken, secretKey, function (error, decodedToken) {
            if (error)
                throw new Error(error);
            else {
                socket.user = decodedToken;
                next();
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
exports.tokenAuthSocket = tokenAuthSocket;
function tokenAuth(req, res, next) {
    var accessToken = req.get("x-access-token");
    if (!accessToken)
        return res.status(401).json({ error: "Unauthorized user" });
    jsonwebtoken_1.verify(accessToken, secretKey, function (error, decodedToken) {
        if (error)
            return res.status(401).json(error);
        req.user = decodedToken;
        next();
    });
}
exports.tokenAuth = tokenAuth;

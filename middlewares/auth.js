"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAuthSocket = void 0;
var user_model_1 = require("../models/user.model");
var jsonwebtoken_1 = require("jsonwebtoken");
function tokenAuthSocket(socket, next) {
    try {
        var accessToken = socket.handshake.query.accessToken;
        var secretKey = user_model_1.User.getJWTSecret();
        jsonwebtoken_1.verify(accessToken, secretKey, function (error, decodedToken) {
            if (error)
                throw new Error(error);
            else {
                socket.userId = decodedToken._id;
                next();
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
exports.tokenAuthSocket = tokenAuthSocket;

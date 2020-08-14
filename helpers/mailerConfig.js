"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var google = require("googleapis").google;
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2("394253008834-vbi64sr39onfv5gnolcpjibg5mv4h3gd.apps.googleusercontent.com", // ClientID
"C9erMfqtobWCu28MdIXEutSc", // Client Secret
"https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: "1//04q7hvBT8OMJICgYIARAAGAQSNwF-L9Ir9PMa8PR9MezqTbWD6k6RnMuSnvuFzFCvT_gDoChGAH6wcUNeJ1th_NozcTOuc5Zs0Ik",
});
var accessToken = oauth2Client.getAccessToken();
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "majkonserver@gmail.com",
        clientId: "394253008834-vbi64sr39onfv5gnolcpjibg5mv4h3gd.apps.googleusercontent.com",
        clientSecret: "C9erMfqtobWCu28MdIXEutSc",
        refreshToken: "1//04q7hvBT8OMJICgYIARAAGAQSNwF-L9Ir9PMa8PR9MezqTbWD6k6RnMuSnvuFzFCvT_gDoChGAH6wcUNeJ1th_NozcTOuc5Zs0Ik",
        accessToken: accessToken,
    },
});

import nodeMailer from "nodemailer";
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "394253008834-vbi64sr39onfv5gnolcpjibg5mv4h3gd.apps.googleusercontent.com", // ClientID
  "C9erMfqtobWCu28MdIXEutSc", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04q7hvBT8OMJICgYIARAAGAQSNwF-L9Ir9PMa8PR9MezqTbWD6k6RnMuSnvuFzFCvT_gDoChGAH6wcUNeJ1th_NozcTOuc5Zs0Ik",
});
const accessToken = oauth2Client.getAccessToken();

export const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "majkonserver@gmail.com",
    clientId:
      "394253008834-vbi64sr39onfv5gnolcpjibg5mv4h3gd.apps.googleusercontent.com",
    clientSecret: "C9erMfqtobWCu28MdIXEutSc",
    refreshToken:
      "1//04q7hvBT8OMJICgYIARAAGAQSNwF-L9Ir9PMa8PR9MezqTbWD6k6RnMuSnvuFzFCvT_gDoChGAH6wcUNeJ1th_NozcTOuc5Zs0Ik",
    accessToken: accessToken,
  },
});

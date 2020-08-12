import axios from "axios";
import { IUserData, IResetPasswordData } from "../redux/actions/userActions";

export default {
  searchForUsersByUsername: async (username: string) =>
    await axios.get(`/users/search/${username}`),

  getAllConversations: async () => await axios.get("/conversations"),

  getMessages: async (conversationId: string, count: number | undefined) =>
    await axios.get(`/messages/${conversationId}/${count}`),

  getAuthenticatedUser: async () =>
    await axios.get("/users", {
      headers: { "x-refresh-token": localStorage.getItem("refreshToken") },
    }),

  signup: async (userData: IUserData) => await axios.post("/users", userData),

  confirmAccount: async (token: string) =>
    await axios.get(`/users/confirm/${token}`),

  login: async (userData: IUserData) =>
    await axios.post("/users/login", userData),

  forgotPassword: async (email: string) =>
    await axios.post("/users/forgot", { email }),

  resetPassword: async (data: IResetPasswordData) =>
    await axios.post("/users/reset", data),

  externalLogin: async (userData: IUserData) =>
    await axios.post("/users/login/external", userData),

  uploadFile: async (formData: FormData) =>
    await axios.post("/files", formData),

  deleteFile: async (fileKey: string) =>
    await axios.delete("/files", { data: { key: fileKey } }),
};

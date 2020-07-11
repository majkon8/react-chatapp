import React from "react";
import { motion } from "framer-motion";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import { pageVariants, pageTransition } from "../login/login";

export default function Login() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="login-page-container"
    >
      <ResetPasswordForm />
    </motion.div>
  );
}

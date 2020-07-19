import React from "react";
import { motion } from "framer-motion";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import { pageVariants, pageTransition } from "../login/login";

export default function Login({ match }: any) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="login-page-container"
    >
      <ResetPasswordForm token={match.params.token} />
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import "./login.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

export const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: "100vw",
    scale: 1.2,
  },
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

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
      <LoginForm />
    </motion.div>
  );
}

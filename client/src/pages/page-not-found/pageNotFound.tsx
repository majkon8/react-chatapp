import React from "react";
import "./pageNotFound.scss";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
// Assets
import pageNotFoundAnimation from "../../assets/pageNotFoundAnimation.json";

export default function notFound() {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      y: "100vh",
    },
    in: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    out: {
      opacity: 0,
      x: "100vw",
      y: "-100vh",
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-not-found-container"
    >
      <Lottie
        style={{ position: "relative" }}
        width="100%"
        options={{
          loop: false,
          autoplay: true,
          animationData: pageNotFoundAnimation,
          rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
        }}
        isClickToPauseDisabled={true}
      />
    </motion.div>
  );
}

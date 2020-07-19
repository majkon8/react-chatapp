import React from "react";
import "./pageNotFound.scss";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../home/home";
// Assets
import pageNotFoundAnimation from "../../assets/pageNotFoundAnimation.json";

export default function notFound() {
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
